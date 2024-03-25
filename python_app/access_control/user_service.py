import subprocess
import uuid
import utilities
import os
from flask import jsonify
ACL_JSON_PATH = 'access_control/ACL.json'

def create_user(data):
    if 'user' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid data. Must contain username and password.'}), 400

    user_id = str(uuid.uuid4())

    # Run the htpasswd command to create the Trino user
    try:
        subprocess.run(['htpasswd', '-Bb', '-C', '10', '/user-database/password.db', data['user'], data['password']], check=True)
    except subprocess.CalledProcessError:
        return jsonify({'error': 'Failed to create Trino user.'}), 500
    
    acl_entry = {
        'userId': user_id,
        'username': data['user'],
        'team': '',
        'role': ''
    }

    try:
        acl_data = utilities.read_json_file(ACL_JSON_PATH)
        acl_data.append(acl_entry)
        utilities.write_json_file(ACL_JSON_PATH, acl_data)  
    except IOError:
        return jsonify({'error': 'Failed to write ACL entry.'}), 500
    
    return jsonify({'message': 'User created successfully.', 'userId': user_id}), 200

def delete_user(data):
    if 'user' not in data:
        return jsonify({'error': 'Invalid data. Must contain username.'}), 400

    # Run the htpasswd command to delete the Trino user
    try:
        subprocess.run(['htpasswd', '-D', '/user-database/password.db', data['user']], check=True)
    except subprocess.CalledProcessError:
        return jsonify({'error': 'Failed to delete Trino user.'}), 500
    
    try:
        acl_data = utilities.read_json_file(ACL_JSON_PATH)
        acl_data = [entry for entry in acl_data if entry['username'] != data['user']]
        utilities.write_json_file(ACL_JSON_PATH, acl_data)
    except IOError:
        return jsonify({'error': 'Failed to delete ACL entry.'}), 500
    
    return jsonify({'message': 'User deleted successfully.'}), 200    

def get_users(): 
    with open('/user-database/password.db', 'r') as f:
            lines = f.readlines()
    users = [line.split(':')[0] for line in lines]
    return {'users': users}

def get_user(userId):
    try:
        acl_data = utilities.read_json_file(ACL_JSON_PATH)
        user_entry = next((entry for entry in acl_data if entry['userId'] == userId), None)
        if user_entry:
            return jsonify(user_entry), 200
        else:
            return jsonify({'error': 'User not found.'}), 404
    except IOError:
        return jsonify({'error': 'Failed to read ACL file.'}), 500
    