FROM ubuntu:16.04
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update -y
RUN apt install npm -y
RUN apt install curl -y
RUN npm install -g n -y
RUN n 10
COPY . .
COPY docker_entrypoint.sh ./
RUN npm install
EXPOSE 7007
ENTRYPOINT ["chmod 777 ./docker_entrypoint.sh"]
ENTRYPOINT ["./docker_entrypoint.sh"]

