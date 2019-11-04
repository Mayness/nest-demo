FROM registry.cn-hangzhou.aliyuncs.com/dmy_mirror/node_server:4

COPY dist /project/dist
COPY public /project/public
COPY prod-paths.js /project/prod-paths.js
COPY tsconfig.json /project/tsconfig.json
COPY package.json /project/package.json
COPY startup.json /project/startup.json

EXPOSE 3000

WORKDIR /project/

ENV NODE_ENV product

RUN cnpm i --production

CMD pm2-runtime startup.json