FROM node

#-p is used for make parent folder if that folder not exist
RUN mkdir -p /wong/src 

# set working directory (default path) to /wong/src (if run command exec -it, default path is /wong/src) (this path is in container, not host)
WORKDIR /wong/src 

# package.json isn't change frequenty, so this layer is cache. (Improve performance when build next time)
COPY package.json .

# Value from build: args: NODE_ENV
ARG NODE_ENV 
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# copy all files in folder server (except files and folders in .gitignore) to working directory
COPY . .

# set container port (used for -p flag for connect outside to this container e.g. if PORT=3001 so flag is -p xxxx:3001)
EXPOSE $PORT

# Default command, you can override this command with docker-compose by specify command:
CMD ["node", "index.js"] 