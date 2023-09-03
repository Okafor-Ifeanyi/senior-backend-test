FROM node:20.2.0-alpine3.18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# for typescript
RUN npm run build
RUN npm run test
# COPY ./docker-compose.yml ./build
# WORKDIR ./build

# RUN docker compose up -d

# CMD node src/index.js