# Gunakan node image sebagai base (untuk development)
# FROM node:22-alpine

# # Set working directory
# WORKDIR /app

# # Copy dependency file
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy seluruh source code ke container
# COPY . .

# # Jalankan development server
# CMD ["npm", "start"]


# Step 1: Build React App (Production Build)
FROM node:22 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy build hasil dari step 1 ke folder default nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
