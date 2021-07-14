FROM node:14-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
EXPOSE 49160
CMD ["npm", "start"]