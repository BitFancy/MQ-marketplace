# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN yarn install

# Copy the rest of the application code.
COPY . .

# Ensure .env is included
COPY .env .env

# Expose port 5000.
EXPOSE 5000

# Start the backend server.
CMD ["yarn", "start"]
