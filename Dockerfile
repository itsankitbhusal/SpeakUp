#use nodejs 18 as a base image
FROM node:18.0.0 AS builder

# set work directory inside the container
WORKDIR /app

# copy package and package-lock to the container
COPY package*.json .

# install the dependencies
RUN npm install

# copy rest of code to the container
COPY . .


# expose the port for backend
EXPOSE 5001

# start the backend
CMD [ "npm", "start" ]