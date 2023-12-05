# Use an official Node.js image as the base image
FROM node:18 as node

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ./ /usr/src/app

# Install Nest.js dependencies
RUN npm install

# Build the Nest.js app in production mode
RUN npm run build

# DEPLOYMENT
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=node /usr/src/app/dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80