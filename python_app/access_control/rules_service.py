import json
from flask import jsonify
import os
import utilities
RULES_JSON_PATH='/access-control-rules/rules.json'
PERMISSION_ASSIGNMENT_JSON_PATH='/access-control-rules/role-permission-assignment.json'
ACL_JSON_PATH = "access_control/ACL.json"

def invoke_user(input_data):
    # Check if the required fields are present in the input data
    if not all(key in input_data for key in ('user', 'role', 'team')):
        return jsonify({'error': 'Invalid data. Must contain user, role, and team.'}), 400

    user = input_data['user']
    roles = input_data['role']
    team = input_data['team']

    # Check if the user exists in the password.db file
    with open('/user-database/password.db', 'r') as f:
        if user not in [line.split(':')[0] for line in f.read().splitlines()]:
            return jsonify({'error': 'User does not exist.'}), 404
    try:
        rules_data = utilities.read_json_file(RULES_JSON_PATH)
        role_permissions = utilities.read_json_file(PERMISSION_ASSIGNMENT_JSON_PATH)
        acl = utilities.read_json_file(ACL_JSON_PATH)
    except Exception as e:
        return jsonify({'error': 'Failed to read JSON file.', 'details': str(e)}), 500

    # For each role in the input data
    for role in roles:
        # Find the corresponding role and team in the role permissions
        role_permission = next((item for item in role_permissions['roles'] if item["role"] == role and item["team"] == team), None)

        # If the role and team are not found
        if not role_permission:
            return jsonify({'error': f'Role {role} or team {team} not found.'}), 404

        # For each catalog and corresponding permission in the role's catalogs and permissions
        for catalog, permission in zip(role_permission['catalogs'], role_permission['allow']):
            # Create a new rule
            new_rule = {
                'user': user,
                'catalog': catalog,
                'allow': permission
            }

            print(f"New rule created:\n{json.dumps(new_rule, indent=4)}\n")

            # Append the new rule to the catalogs list
            rules_data['catalogs'].append(new_rule)

            try:
                utilities.write_json_file(RULES_JSON_PATH, rules_data)
            except Exception as e:
                return jsonify({'error': 'Failed to write to JSON file.', 'details': str(e)}), 500

    # Get the existing ACL entry for the user
    acl_entry = next((entry for entry in acl if entry["username"] == user), None)

    # If the user entry exists, update the role and team
    if acl_entry:
        acl_entry["role"] = role
        acl_entry["team"] = team
    else:
        # Create a new ACL entry
        new_acl_entry = {
        "userId": user,
        "username": user,
        "team": team,
        "role": role
        }
        acl.append(new_acl_entry)
    
    try:
        # Write the updated user back to the file
        utilities.write_json_file(ACL_JSON_PATH, acl)
    except Exception as e:
        return jsonify({'error': 'Failed to write to JSON file.', 'details': str(e)}), 500

    print(f"Updated rules data:\n{json.dumps(rules_data, indent=4)}\n")

    return jsonify({"message": "User invoked successfully"}), 200

def manage_user(input_data):
    # Check if the required fields are present in the input data
    if 'user' not in input_data:
        return jsonify({'error': 'Invalid data. Must contain user.'}), 400

    user = input_data['user']

    # Check if the user exists in the password.db file
    with open('/user-database/password.db', 'r') as f:
        if user not in [line.split(':')[0] for line in f.read().splitlines()]:
            return jsonify({'error': 'User does not exist.'}), 404
        
    try:
        rules_data = utilities.read_json_file(RULES_JSON_PATH)
    except Exception as e:
        return jsonify({'error': 'Failed to read JSON file.', 'details': str(e)}), 500

    # Remove all existing rules for the user
    rules_data['catalogs'] = [rule for rule in rules_data['catalogs'] if rule['user'] != user]
    print(f"Removed existing rules for user: {user}\n")

     # Write the updated rules_data back to the file
    try:
        utilities.write_json_file(RULES_JSON_PATH, rules_data)
    except Exception as e:
        return jsonify({'error': 'Failed to write to JSON file.', 'details': str(e)}), 500

    # Invoke the invoke_user() function to create new rules for the user
    response, status_code = invoke_user(input_data)
    if status_code != 200:
        return response, status_code

    return jsonify({"message": "Users access rights amended successfully"}), 200    

def revoke_user(input_data):
    # Check if the required fields are present in the input data
    if 'user' not in input_data:
        return jsonify({'error': 'Invalid data. Must contain user.'}), 400

    user = input_data['user']

    try:
        rules_data = utilities.read_json_file(RULES_JSON_PATH)
    except Exception as e:
        return jsonify({'error': 'Failed to read JSON file.', 'details': str(e)}), 500

    # Remove all rules for the user
    rules_data['catalogs'] = [rule for rule in rules_data['catalogs'] if rule['user'] != user]
    print(f"Revoked all rules for user: {user}\n")

    # Write the updated rules back to the rules.json file
    try:
        utilities.write_json_file(RULES_JSON_PATH, rules_data)
    except Exception as e:
        return jsonify({'error': 'Failed to write to JSON file.', 'details': str(e)}), 500

    return jsonify({"message": "Users access rights revoked successfully"}), 200