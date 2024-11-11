# Use an official Node.js image as the base for building
FROM node:16-alpine AS builder

LABEL org.opencontainers.image.source="https://github.com/rafaeltovargarrido/k8s"

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies only for production
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight Nginx image to serve the app
FROM nginx:alpine

# Copy the build output from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port that Nginx is running on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
