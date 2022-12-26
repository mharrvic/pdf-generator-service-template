# Specifies the base image to use for the Docker container.
# In this case, the base image is the latest version of Node.js with a version number of 16.
FROM node:16

# Sets the working directory for the rest of the instructions in the Dockerfile.
# This means that any commands that follow will be executed within the /app directory inside the container.
WORKDIR /app

# Copies the package.json file and any other files that match the pattern package*.json from the host system
# (i.e., the system where the Dockerfile is located) to the /app directory inside the container.
COPY package*.json /app/

# Runs the npm ci command inside the container to install the dependencies specified in the package.json file.
# The --force flag is used to force npm to install the dependencies even if there are warnings,
# and the --only=production flag tells npm to only install the dependencies needed for production (i.e., not development dependencies).
RUN npm ci --force --only=production

# Copies the entire project directory (i.e., all files and subdirectories)
# from the host system to the /app directory inside the container.
COPY . /app/

# Runs the npm run build command inside the container to build the project.
RUN npm run build

# Specifies the default command to run when the container is started.
# In this case, the command is npm run serve, which starts the server for the project.
CMD ["npm", "run", "serve:build"]