FROM node:16
COPY package.json /home/node/app/package.json
COPY dist /home/node/app/dist
COPY node_modules /home/node/app/node_modules
WORKDIR /home/node/app
CMD npm run start:prod
