# Use Debian-based Node image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install OpenSSL and other required packages
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy rest of the source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
