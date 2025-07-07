# Gunakan node image sebagai base
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke container
COPY . .

# Jalankan development server
CMD ["npm", "start"]
