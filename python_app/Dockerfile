FROM python:3.9

RUN apt-get update && apt-get install -y apache2-utils

WORKDIR /python_app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "/python_app/access_control/access_control_server.py"]