#############
# GOALS APP #
# FRONT END #
#############

# node
# Build React App
FROM node:latest as react-app
WORKDIR /var/www/app-frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# nginx
FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/conf.d /etc/nginx/conf.d
COPY --from=react-app /var/www/app-frontend/build /usr/share/nginx/html
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
