#############
# GOALS APP #
# BACK END  #
#############

FROM node:latest
WORKDIR /var/www/app-backend

# Set up Tini to manage OS Signals (allow: ctrl-c & docker {container} stop)
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# Copy the package over and use npm to download dependencies
COPY package*.json ./
RUN npm install

# Copy the project source
COPY . .

# EXPOSE 5000

# CMD npm run start
CMD ["npm", "run", "start"]

# Use the node user instead of root
USER node