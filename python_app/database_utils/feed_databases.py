import os
import json
import uuid
import mysql.connector
from tqdm import tqdm


def feed(host, user, password, database, port, json_file_path):

    path_to_json_files = json_file_path
    json_file_names = [
        filename
        for filename in os.listdir(path_to_json_files)
        if filename.endswith(".json")
    ]


    print(f"Setting up db connection for database: {database}")
    mydb = mysql.connector.connect(
        host= host,
        user= user,
        password= password,
        database= database, 
        port = port
    )

    print(f"connected")

    mycursor = mydb.cursor()

    for json_file_name in tqdm(json_file_names):
        with open(os.path.join(path_to_json_files, json_file_name)) as json_file:
            json_text = json.load(json_file)

            fingerprint_id = json_text["key"]
            target = json_text["target"]
            location = json_text["location"]

            # here the write to table Fingerprint:
            sql = "INSERT INTO Fingerprint (fingerprint_id, target, location) VALUES (%s, %s, %s)"
            val = (fingerprint_id, target, location)
            mycursor.execute(sql, val)

            for v in json_text["attack_vectors"]:
                attack_vector_id = str(uuid.uuid4())
                # fingerprint_id from above...
                service = v["service"]
                protocol = v["protocol"]
                time_start = v["time_start"]
                duration_seconds = v["duration_seconds"]
                nr_packets = v["nr_packets"]
                nr_megabytes = v["nr_megabytes"]
                detection_thershold = v["detection_threshold"]

                # here the write to tabel AttackVector:
                sql = "INSERT INTO AttackVector (attack_vector_id, fingerprint_id, service, protocol, time_start, duration_seconds, nr_packets, nr_megabytes, detection_threshold) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                val = (
                    attack_vector_id,
                    fingerprint_id,
                    service,
                    protocol,
                    time_start,
                    duration_seconds,
                    nr_packets,
                    nr_megabytes,
                    detection_thershold,
                )
                mycursor.execute(sql, val)

                for ip in v["source_ips"]:
                    source_ip_id = str(uuid.uuid4())
                    # attack_vector_id from above...
                    source_ip = ip
                    nr_packets = v["nr_packets_by_source"][ip]

                    # here the write to table SourceIP
                    sql = "INSERT INTO SourceIP (source_ip_id, attack_vector_id, source_ip, nr_packets) VALUES (%s, %s, %s, %s)"
                    val = (source_ip_id, attack_vector_id, source_ip, nr_packets)
                    mycursor.execute(sql, val)

                for ip, ttls in v["ttl_by_source"].items():
                    for ttl in ttls:
                        ttl_id = str(uuid.uuid4())
                        # attack_vector_id form above...
                        ttl_value = ttl
                        source_ip = ip

                        # here the write to table TTL
                        sql = "INSERT INTO TTL (ttl_id, attack_vector_id, ttl_value, source_ip) VALUES (%s, %s, %s, %s)"
                        val = (ttl_id, attack_vector_id, ttl_value, source_ip)
                        mycursor.execute(sql, val)
    
    mydb.commit()
    mycursor.close()
    mydb.close()
    


if __name__ == "__main__":

    #database connection details
    databases = [
        {
            "host": "mysql",
            "user": "user", 
            "password": "password",
            "database": "domain_team_1_ddos_data",
            "port": 3306,
            "json_file_path": "/python_app/database_utils/fingerprints_domain_team_1"
        },
        {
            "host": "mysql-worker-1",
            "user": "user2", 
            "password": "password",
            "database": "domain_team_2_ddos_data",
            "port": 3306,
            "json_file_path": "/python_app/database_utils/fingerprints_domain_team_2"
        },
        {
            "host": "mysql-worker-2",
            "user": "user3", 
            "password": "password",
            "database": "domain_team_3_ddos_data",
            "port": 3306,
            "json_file_path": "/python_app/database_utils/fingerprints_domain_team_3"
        }
    ]
    
    for db_config in databases:
        feed(**db_config)
