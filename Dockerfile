FROM ubuntu:16.04
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update -y
RUN apt install npm -y
RUN apt install curl -y
RUN npm install -g n -y
RUN n 10
COPY . .
COPY app_start_script.sh ./
RUN npm install
EXPOSE 7007
CMD ["bash","./app_start_script.sh"]


