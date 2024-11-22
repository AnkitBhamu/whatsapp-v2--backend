FROM ubuntu:latest


WORKDIR /app

COPY . ./

# INSTALL POSTGRES and NPM
RUN apt-get update && apt-get install -y postgresql nodejs npm && npm install

CMD [ "npm" , "start" ]

EXPOSE 9000 8080
