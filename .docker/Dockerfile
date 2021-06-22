
# pull official base image
FROM node:15.10.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

RUN npm run build
RUN npm install -g serve

# start app
CMD ["npm", "run","prod"]