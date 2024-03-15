# Use the Python 3.9 image as the base image
FROM python:3.9

# Install Apache utilities
RUN apt-get update && apt-get install -y apache2-utils

# Set the working directory to /python_app
WORKDIR /python_app

# Copy the requirements.txt file into the container
COPY requirements.txt ./

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code into the container
COPY . .

# Set the command to run your application
CMD ["python", "/python_app/access_control/access_control_server.py"]