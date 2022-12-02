FROM node:18.12.1-alpine3.15

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
# Will only download the packages for production.
RUN npm run install-client --omit=dev

COPY server/package*.json server/
# By separating the installs, Docker will cache the command. If nothing changed, will be faster.
RUN npm run install-server --omit=dev

COPY client/ client/
# Build our front end.
RUN npm run build --prefix client

COPY server/ server/

# If we don't specify the user, will run as root. By specifying, we reduce the rights.
USER node

# Once the docker image is built, will fun the following commands.
CMD ["npm", "start", "--prefix", "server"]

# Our server runs on port 3001. We expose it to the rest of the internet to communicate.
EXPOSE 3001