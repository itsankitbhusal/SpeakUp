# use nodejs 18 as a base image
FROM node:alpine

# set work directory inside the container
WORKDIR /app/frontend

#copy all the files from current directory
COPY . .

# install dependencies
RUN npm install

# port to expose
EXPOSE 5173

# run the react app
CMD ["npm", "run", "dev"]