FROM node:current-alpine3.11

WORKDIR /type-lyrics-api

ARG CLIENT_TOKEN
ENV CLIENT_TOKEN=${CLIENT_TOKEN}

# Start with `npm ci` before copying app code
# in order to preserve this layer
COPY ./package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]