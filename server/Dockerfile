FROM node

#-p is used for make parent folder if that folder not exist
RUN mkdir -p /wong/src 

# set working directory (default path) to /wong/src (if run command exec -it, default path is /wong/src) (this path is in container, not host)
WORKDIR /wong/src 

# package.json isn't change frequenty, so this layer is cache. (Improve performance when build next time)
COPY package.json .
RUN npm install

# copy all files in folder server (except files and folders in .gitignore) to working directory
COPY . .

# set container port (used for -p flag for connect outside to this container e.g. -p xxxx:3001)
# $PORT is get ENV from .env file (when docker run, using flag "--env-file ./.env")
EXPOSE $PORT

CMD ["npm", "run", "dev"]