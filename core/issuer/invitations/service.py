import requests
from utils.settings import BASE_URL_ISSUER, BASE_URL_RECEIVER
import qrcode
import json


def create_invitation():
    _url = "connections/create-invitation"

    headers = {"content-type": "application/json"}
    query_params = {
        "alias": "first-connection",
        "multi_use": "false",
    }
    req = requests.post(
        url=BASE_URL_ISSUER + _url, headers=headers, params=query_params
    )
    resp = req.json()
    connection_id = resp["connection_id"]
    invitation = resp["invitation"]
    invitation_url = resp["invitation_url"]
    
    return invitation

def receive_invitation(invitation):
    _url = "connections/receive-invitation"
    headers = {"content-type": "application/json"}
    query_params = {
        "alias": "first-connection-received"
    }
    req = requests.post(url=BASE_URL_RECEIVER + _url, headers=headers, params=query_params, data=json.dumps(invitation))
    print(json.dumps(req.json(), indent=2))
    resp = req.json()
    return resp["connection_id"]

def accept_invitation(conn_id):
    _url = f"connections/{conn_id}/accept-invitation"
    query_params = {
        "my_endpoint": BASE_URL_RECEIVER,
        "my_label": "Connection established"
    }
    req = requests.post(url=BASE_URL_RECEIVER + _url, params=query_params)
    print(json.dumps(req.json(), indent=2))
