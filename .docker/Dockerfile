# build stage
FROM node:lts-alpine as build

# Env vars
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production

# Copy nginx configuration
COPY ./.docker/ /etc/nginx/

# Copy build
COPY --from=build /app/build /var/www/mattiacampagna.com/public
COPY --from=build /app/.env /var/www/mattiacampagna.com/public/.env

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]