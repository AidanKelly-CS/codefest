# pull the official base image
FROM python:3.10-slim-buster

# set the working directory
WORKDIR /usr/src/app

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# start app
CMD ["python", "app.py"]