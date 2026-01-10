FROM node:18-alpine
RUN apk add --no-cache bash postgresql-client
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x ./validate-db.sh
ENV PORT=5001
EXPOSE 5001
CMD ["npm", "run", "dev"]