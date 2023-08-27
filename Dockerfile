FROM node:20.2.0-alpine3.18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# for typescript
RUN npm run build
# COPY ./docker-compose.yml ./build
# WORKDIR ./build

# RUN docker compose up -d

# CMD node src/index.js