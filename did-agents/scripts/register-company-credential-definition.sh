#!/bin/sh

# First cURL request to get the schema_id
schema_id=$(curl -s -X POST "http://127.0.0.1:8038/schemas" -d '{"schema_name":"company","schema_version":"1.0", "attributes": ["name", "domain", "contact", "region", "industry" ]}' | jq -r '.schema_id')

# Second cURL request using the schema_id
curl -X POST "http://127.0.0.1:8038/credential-definitions" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"tag\": \"initial registration\", \"schema_id\": \"$schema_id\", \"support_revocation\": false}"
