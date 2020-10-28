FROM node:current-alpine3.11 as builder

WORKDIR /client

# Start with `npm ci` before copying app code
# in order to preserve this layer
COPY ./package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx
COPY --from=builder /client/dist /usr/share/nginx/html
EXPOSE 80
