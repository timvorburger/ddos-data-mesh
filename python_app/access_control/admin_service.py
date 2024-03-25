import json
import os
import utilities
import rules_service
import threading

ROLES_JSON_PATH = 'access_control/roles.json'
DOMAINS_JSON_PATH = 'access_control/domains.json'
CATALOGS_JSON_PATH = 'access_control/catalogs.json'
ROLES_PERMISSION_ASSIGNMENT = '/access-control-rules/role-permission-assignment.json'
ACL_JSON_PATH = "access_control/ACL.json"

def create_role(input_data): 
    if not all(key in input_data for key in ('role', 'team', 'catalogs', 'allow')):
        return jsonify({'error': 'Invalid data. Must contain user, role, and team.'}), 400

    role = input_data['role']
    team = input_data['team']
    catalogs = input_data['catalogs']
    allow = input_data['allow']

    role_permissions = utilities.read_json_file(ROLES_PERMISSION_ASSIGNMENT)
    roles = utilities.read_json_file(ROLES_JSON_PATH)

    for role_permission in role_permissions['roles']:
        if role_permission['role'] == input_data['role'] and role_permission['team'] == input_data['team']:
            return {'error': 'Role and team combination already exists.'}, 400

    # Create a new role permission
    new_role_permission = {
        'role': role,
        'team': team,
        'catalogs': catalogs,
        'allow': allow
    }

    role_permissions['roles'].append(new_role_permission)
    utilities.write_json_file(ROLES_PERMISSION_ASSIGNMENT, role_permissions)

    #update the roles.json file
    if not role in roles['roles']:
        roles['roles'].append(role)
        utilities.write_json_file(ROLES_JSON_PATH, roles)
    
    return {'message': 'Role permission created successfully.'}, 200

# Lock to prevent race conditions in manage role
lock = threading.Lock() 

def manage_role(input_data):    
    if not all(key in input_data for key in ('role', 'team', 'catalogs', 'allow')):
        return jsonify({'error': 'Invalid data. Must contain role, team, catalogs, and allow.'}), 400

    role = input_data['role']
    team = input_data['team']
    catalogs = input_data['catalogs']
    allow = input_data['allow']

    role_permissions = utilities.read_json_file(ROLES_PERMISSION_ASSIGNMENT)
    
    # Find the role with the specified team and role
    for role_permission in role_permissions['roles']:
        if role_permission['role'] == role and role_permission['team'] == team:
            acl = utilities.read_json_file(ACL_JSON_PATH)
            
            # Find all users with the role that is being changed
            users = [user for user in acl if user['role'] == role and user['team'] == team]
            print(f'users from acl: {users}')

            # Update the role's catalogs and permissions
            role_permission['catalogs'] = catalogs
            role_permission['allow'] = allow
            
            with lock: 
                utilities.write_json_file(ROLES_PERMISSION_ASSIGNMENT, role_permissions)
                
            # Update user's access rights based on the new permissions for the role
            for user in users:
                data = {
                    'user': user['username'],
                    'role': [role],
                    'team': team
                }
                print(f'this should be the data passed to manage_user(data) {data}')
                rules_service.manage_user(data)

            return {'message': 'Role updated successfully.'}, 200

    return {'error': 'Role and team combination not found.'}, 404

def delete_role(input_data): 
    if not all(key in input_data for key in ('role', 'team')):
        return jsonify({'error': 'Invalid data. Must contain role and team.'}), 400

    role = input_data['role']
    team = input_data['team']

    role_permissions = utilities.read_json_file(ROLES_PERMISSION_ASSIGNMENT)
    
    # Find the role with the specified team and role
    for i, role_permission in enumerate(role_permissions['roles']):
        if role_permission['role'] == role and role_permission['team'] == team:
            # Remove the role from the list of roles
            del role_permissions['roles'][i]
            utilities.write_json_file(ROLES_PERMISSION_ASSIGNMENT, role_permissions)
            
            # Overwrite the role for all users with the role in the acl.json file
            acl = utilities.read_json_file(ACL_JSON_PATH)
            for user in acl:
                if user['role'] == role and user['team'] == team:
                    user['role'] = ''
            utilities.write_json_file(ACL_JSON_PATH, acl)
            
            return {'message': 'Role deleted successfully.'}, 200

    return {'error': 'Role and team combination not found.'}, 404

def get_roles():
    return utilities.read_json_file(ROLES_JSON_PATH)

def create_domain(input_data): 
    domain = input_data['domain']
    domains = utilities.read_json_file(DOMAINS_JSON_PATH)
    
    for existing_domain in domains['domains']:
        if existing_domain['domain'] == domain:
            return {'error': 'Domain already exists.'}, 400
    
    new_domain = {
        'domain': domain
    }
    domains['domains'].append(new_domain)
    utilities.write_json_file(DOMAINS_JSON_PATH, domains)
    
    return {'message': 'Domain created successfully.'}, 200

def delete_domain(input_data): 
    domain = input_data['domain']
    domains = utilities.read_json_file(DOMAINS_JSON_PATH)
    
    for i, existing_domain in enumerate(domains['domains']):
        if existing_domain['domain'] == domain:
            del domains['domains'][i]
            utilities.write_json_file(DOMAINS_JSON_PATH, domains)
            return {'message': 'Domain deleted successfully.'}, 200
    return {'error': 'Domain not found.'}, 404

def get_domains(): 
    return utilities.read_json_file(DOMAINS_JSON_PATH)  

def get_catalogs(): 
    return utilities.read_json_file(CATALOGS_JSON_PATH)  