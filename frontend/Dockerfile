# Stage 1: Build the code
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # This creates the /dist folder inside the container

# Stage 2: Serve the code with Nginx
FROM nginx:alpine
# Copy the built files from Stage 1 to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copy your custom nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]