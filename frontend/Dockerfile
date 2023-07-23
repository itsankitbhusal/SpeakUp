# use nodejs 18 as a base image
FROM node:18.0.0 AS builder

# set work directory inside the container
WORKDIR /app/frontend

# copy package.json and package-lock.json to the container
COPY package*.json .

# install the dependencies
RUN npm install

# copy rest of code to the container
COPY . .

# environment variable
ENV VITE_BASE_URL=http://localhost:5001

# port to expose
EXPOSE 5173

# run the react app
CMD ["npm", "run", "dev"]