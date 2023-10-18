from issuer.invitations.service import create_invitation, receive_invitation, accept_invitation
if __name__ == '__main__':
    inv = create_invitation()
    # print(inv)
    conn_id_receiver = receive_invitation(inv)
    accept_invitation(conn_id_receiver)
