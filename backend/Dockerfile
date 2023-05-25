FROM node:latest
WORKDIR /var/www/app-backend

# Copy the package over and use npm to download dependencies
COPY package*.json ./
RUN npm install

# Copy the project source
COPY . .

EXPOSE 5000

CMD npm run start