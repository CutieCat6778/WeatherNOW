FROM node:14-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY index.html /usr/share/nginx/html