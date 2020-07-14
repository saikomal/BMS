FROM ubuntu:latest


RUN apt update
RUN apt-get install python3 -y
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
RUN pip3 install --upgrade pip


WORKDIR /app
COPY . /app

RUN unset LC_ALL

RUN pip3 install flask
RUN pip3 install pymongo
RUN pip3 install dnspython


EXPOSE 5000

ENV FLASK_APP="src"
ENV FLASK_ENV="development"
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

ENTRYPOINT ["flask"]
CMD ["run","--host=0.0.0.0"]
