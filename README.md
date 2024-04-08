# Onboarding of a CSIRT in a DDoS Data Mesh Network

Welcome to the GitHub repository containing the access control solution developed as part of the bachelor's thesis titled "Onboarding of a CSIRT in a DDoS Data Mesh Network". This project is at the heart of efforts to secure collaborative defense systems against DDoS attacks by enhancing a data mesh network's security.

This project builds upon existing work about data discovery in a DDoS data mesh network which can be accessed through this [repository](https://github.com/tportmann-uzh/ddos-data-mesh-network). The data mesh implemented in this work enables sharing DDoS fingerprints across domains, thereby facilitating a collective and resilient defense mechanism. The pivotal objective of this work is to implement an access control system that streamlines the onboarding process of new CSIRTs, by providing a solution to manage users permissions within the data mesh, ensuring the integrity and confidentiality of the contained data.

|                       |                                                                                   |
| --------------------- | --------------------------------------------------------------------------------- |
| Student               | Tim Vorburger                                                                     |
| Supervisor            | Dr. Bruno Rodrigues                                                               |
| Supervisor            | Katherine O. E. Müller                                                            |
| Responsible Professor | Prof. Dr. Burkhard Stiller                                                        |
| Contents              | Repository for prototype that has been developed as part of the Bachelor's Thesis |

![Access Control System Component Diagramm](assets/python-app-component-diagramm.svg)

## Functionality Overview

#### 1. Secure Communication
- The prototype implements HTTPS to ensure encrypted communication between clients and the Trino coordinator, currently using a self-signed certificate.
- It utilizes a shared secret for secure internal communication between Trino nodes.

#### 2. Authentication
- Password file authentication is employed as the initial step towards securing the Trino cluster, providing basic user authentication.

#### 3. Role-Based Access Control (RBAC)
- A custom RBAC model is designed to manage user permissions within the data mesh effectively. The system, by default, supports the following roles, with distinct access privileges:
  - **Developer (DEV)**
  - **Analyst (AN)**
  - **Incident Manager (IM)**
- The system allows the creation, alteration, and deletion of roles.
- Roles and permissions are managed through a user-friendly interface, allowing for easy onboarding, management, and revocation of user access and role management.

#### 4. Access Control Management
- **User Service**: Allows the creation and deletion of users.
- **Rules Service**: Facilitates the addition of new users to the system, assigning roles and permissions based on predefined policies. It manages the dynamic updating of access rules based on user roles, ensuring that changes are accurately reflected in real-time.
- **Admin Service**: Allows administrators to create, modify, and delete roles and permissions, providing granular control over access rights within the data mesh.

#### 5. Access Control List (ACL) / Role-Permission Assignment
- Centralized ACL maintains a comprehensive list of users, their roles, and permissions, serving as the single source of truth for the access control system. 
- The Role-Permission Assignment allows gaining insights about the permissions assigned to a role.


## Installation
### Prerequisites
- GitHub
- Docker
### Step-by-Step Guide 
1. First navigate to the folder containing the `docker-compose.yml` file. Start the Docker Network by using this command:
   ```
   docker compose up -d
   ```
   Make sure that all containers are up and running.
   
2. Next, we will feed the databases of the mesh. For this, we can run a script using the following command:
   ```
   docker exec -it python-app python database_utils/feed_databases.py
   ```
   
3. To make sure that we can establish a connection to the coordinator we have to add the self-signed certificate to the Trino Truststore using this command:
   ```
   docker exec -u root -it trino-coordinator keytool -import -trustcacerts -alias trino -file /etc/trino/certificates/trino.crt -keystore /usr/lib/jvm/jdk-21.0.1/lib/security/cacerts -storepass password -noprompt
   ```
   
4. Now the Landing page of the Access Control System is available under the following address: *http://localhost:5000/*. You can now manage users and roles using the appropriate interfaces. Make sure to remember the password of a newly registered user, since it is needed to connect to the Trino coordinator. You can also manage roles. There is a set of existing roles already implemented, feel free to change them.
   
5. After registering a user and amending its access rights you can test the user's access by connecting with it to the Trino coordinator using this command:
   ```
   docker exec -it trino-coordinator trino --server https://trino-coordinator:8443 --user <username> --password
   ```
   
6. Now you are connected with the Trino CLI and can query the cluster, using appropriate SQL statements. Make sure to follow Trino's structure of always mentioning the `catalog.schema.table` when querying. For an overview of past queries, you can connect to the Trino Web Interface under the following address: *https://localhost:8443/ui/login.html*. Ignore the warning and log in with an authorized user. In the Cluster Overview in the section "QUERY DETAILS" you can investigate past queries.

## Demo
In this demo we create a new role _incident-specialist_ and invoke a user owning this role. 

https://github.com/timvorburger/ddos-data-mesh/assets/75628730/f4963fc0-fc41-48c6-9c03-2a30f488cbdc




