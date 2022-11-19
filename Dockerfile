FROM python:3.11
WORKDIR /sigmafraud

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
CMD ["flask", "--app", "api", "run", "--host", "0.0.0.0"]