import argparse
import json

RULES_JSON_PATH='/access-control-rules/rules.json'
PERMISSION_ASSIGNMENT_JSON_PATH='/access-control-rules/role-permission-assignment.json'


def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
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

    # For each role in the input data
    for role in roles:
        # Find the corresponding role in the role permissions
        role_permission = next((item for item in role_permissions['roles'] if item["role"] == role), None)

        # If the role is found
        if role_permission:
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

    print(f"Updated rules data:\n{json.dumps(rules_data, indent=4)}\n")

    # Write the updated rules back to the rules.json file
    write_json_file(RULES_JSON_PATH, rules_data)

def manage_user(input_data, rules_data, role_permissions):
    # Extract user from input data
    user = input_data['user']

    # Remove all existing rules for the user
    rules_data['catalogs'] = [rule for rule in rules_data['catalogs'] if rule['user'] != user]
    print(f"Removed existing rules for user: {user}\n")

    # Invoke the invoke_user() function to create new rules for the user
    invoke_user(input_data, rules_data, role_permissions)

def revoke_user(input_data, rules_data, role_permissions):
    # Extract user from input data
    user = input_data['user']

    # Remove all rules for the user
    rules_data['catalogs'] = [rule for rule in rules_data['catalogs'] if 'user' in rule and rule['user'] != user]
    print(f"Revoked all rules for user: {user}\n")

    # Write the updated rules back to the rules.json file
    write_json_file(RULES_JSON_PATH, rules_data)

# get the input and rules files
parser = argparse.ArgumentParser(description='Manage access control')

parser.add_argument('action', type=str, help='The action to perform')
parser.add_argument('user', type=str, help='The user to perform the action on')
parser.add_argument('role', type=str, nargs='*', help='The role(s) for the user')

args = parser.parse_args()

input_data = {
    'action': args.action,
    'user': args.user,
    'role': args.role
}

rules_data = read_json_file(RULES_JSON_PATH)
role_permissions = read_json_file(PERMISSION_ASSIGNMENT_JSON_PATH)

actions = {
    'invoke_user': invoke_user,
    'manage_user': manage_user,
    'revoke_user': revoke_user
}

action_func = actions.get(input_data['action'])
if action_func:
    action_func(input_data, rules_data, role_permissions)
else:
    print(f"Action {input_data['action']} is not recognized.")
