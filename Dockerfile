#use alpine as a base image
FROM node:alpine

# set work directory inside the container
WORKDIR /app

# copy all the files
COPY . .

# install the dependencies
RUN npm install

# expose the port for backend
EXPOSE 5001

# start the backend
CMD [ "npm", "start" ]