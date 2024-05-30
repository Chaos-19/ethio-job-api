# Use Puppeteer image from GitHub Container Registry
FROM ghcr.io/puppeteer/puppeteer:22.7.1

# Environment variables to skip Chromium download and set executable path
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project to the working directory
COPY . .

# Build the project
RUN npm run build

# Set the working directory to the build output directory
WORKDIR /usr/src/app/dist

# Command to run the application
CMD ["node", "src/index.js"]

