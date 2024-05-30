FROM ghcr.io/puppeteer/puppeteer:22.7.1

# Environment variables (adjust if needed)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy project and build
COPY . .
RUN npm run build

# Update path in CMD (working directory is /usr/src/app/dist)
CMD ["node", "/usr/src/app/src/index.js"]
