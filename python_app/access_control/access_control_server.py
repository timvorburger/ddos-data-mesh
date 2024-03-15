from flask import Flask, request, jsonify
from subprocess import CalledProcessError
import rules_service
import user_service
import admin_service

app = Flask(__name__)

from flask import render_template

@app.route('/api/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Expect a JSON body with the POST request
        if request.is_json:
            data = request.get_json()
            return user_service.create_user(data)
        else:
            return jsonify({"error": "Missing JSON in request body."}), 400
    else:
        return render_template('access_control/register_user.html')
        
@app.route('/api/users', methods=['GET','POST'])
def invoke_user():
    if request.method == 'POST': 
        data = request.get_json()
        try: 
            return rules_service.invoke_user(data)
        except CalledProcessError as e:
            return jsonify(error=str(e)), 500
    else: 
        users = user_service.get_users()
        roles = admin_service.get_roles()
        domains = admin_service.get_domains()
        return render_template('access_control/invoke_user.html', users=users['users'], roles=roles['roles'], teams=domains['domain_teams'])

@app.route('/api/users/<userId>', methods=['PUT', 'DELETE', 'GET'])
def manage_user(userId):
    data = request.get_json()
    if request.method == 'PUT':
        try:
            return rules_service.manage_user(data)
        except CalledProcessError as e: 
            return jsonify(error=str(e)), 500
    
    elif request.method == 'DELETE':
        try:
            rules_service.revoke_user(data)
            user_service.delete_user(data)
        except CalledProcessError as e: 
            return jsonify(error=str(e)), 500
        return jsonify({"message": "User revoked and deleted successfully"}), 200
    
@app.route('/api/roles', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_role():
    if request.method == 'POST':
        data = request.get_json()
        return admin_service.create_role(data)
    elif request.method == 'DELETE':
        data = request.get_json()
        return admin_service.delete_role(data)
    elif request.method == 'PUT':
        data = request.get_json()
        return admin_service.manage_role(data)
    else:
        return render_template('access_control/create_role.html')
    
@app.route('/api/sessions/<sessionId>', methods=['DELETE'])
def end_session(sessionId):
    return rules_service.end_session(sessionId)

print(app.url_map)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)