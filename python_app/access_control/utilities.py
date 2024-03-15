import json

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            #print(f"Data from {file_path}:\n{json.dumps(data, indent=4)}\n")
            return data
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except Exception as e:
        print(f"Error reading JSON file: {file_path}\n{e}\n")
        return None

def write_json_file(file_path, data):
    try:
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
            #print(f"Data written to {file_path}\n")
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except Exception as e:
        print(f"Error writing to JSON file: {file_path}\n{e}\n")
