# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
