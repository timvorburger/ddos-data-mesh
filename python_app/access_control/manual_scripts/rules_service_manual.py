import json
import os
INPUT_JSON_PATH='/python_app/input.json'
RULES_JSON_PATH='/access-control-rules/rules.json'
PERMISSION_ASSIGNMENT_JSON_PATH='/access-control-rules/role-permission-assignment.json'

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            print(f"Data from {file_path}:\n{json.dumps(data, indent=4)}\n")
            return data
    except Exception as e:
        print(f"Error reading JSON file: {file_path}\n{e}\n")
        return None

def write_json_file(file_path, data):
    try:
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
            print(f"Data written to {file_path}\n")
    except Exception as e:
        print(f"Error writing to JSON file: {file_path}\n{e}\n")

def invoke_user(input_data, rules_data, role_permissions):
    user = input_data['user']
    roles = input_data['role']

    for role in roles:
        role_permission = next((item for item in role_permissions['roles'] if item["role"] == role), None)

        if role_permission:
            # Create rule for each catalog and corresponding permission
            for catalog, permission in zip(role_permission['catalogs'], role_permission['allow']):
                new_rule = {
                    'user': user,
                    'catalog': catalog,
                    'allow': permission
                }

                print(f"New rule created:\n{json.dumps(new_rule, indent=4)}\n")

                rules_data['catalogs'].append(new_rule)

    print(f"Updated rules data:\n{json.dumps(rules_data, indent=4)}\n")

    write_json_file(RULES_JSON_PATH, rules_data)

def manage_user(input_data, rules_data, role_permissions):
    user = input_data['user']

    # Remove all rules for the user
    rules_data['catalogs'] = [rule for rule in rules_data['catalogs'] if rule['user'] != user]
    print(f"Removed existing rules for user: {user}\n")

    # Invoke new rules for the user
    invoke_user(input_data, rules_data, role_permissions)

def revoke_user(input_data, rules_data, role_permissions):
    user = input_data['user']

    # Remove all rules for the user
    rules_data['catalogs'] = [rule for rule in rules_data['catalogs'] if rule['user'] != user]
    print(f"Revoked all rules for user: {user}\n")

    write_json_file('/access-control-rules/rules.json', rules_data)


input_data = read_json_file(INPUT_JSON_PATH)
rules_data = read_json_file(RULES_JSON_PATH)
role_permissions = read_json_file(PERMISSION_ASSIGNMENT_JSON_PATH)

actions = {
    'invoke_user': invoke_user,
    'manage_user': manage_user,
    'revoke_user': revoke_user
}

if input_data is not None:
    action_func = actions.get(input_data['action'])
    if action_func:
        action_func(input_data, rules_data, role_permissions)
    else:
        print(f"Action {input_data['action']} is not recognized.")
else:
    print("input_data is None")