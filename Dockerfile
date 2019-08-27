FROM mayness/node_server

COPY dist /project/dist
COPY package.json /project/package.json

EXPOSE 3000

WORKDIR /project/

RUN npm install --production

RUN npm run start:prod