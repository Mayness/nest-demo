FROM registry.cn-hangzhou.aliyuncs.com/dmy_mirror/node_server:4

COPY dist /project/dist
# COPY .env /project/.env
COPY package.json /project/package.json
COPY startup.js /project/startup.js

EXPOSE 3000

WORKDIR /project/

ENV NODE_ENV production

RUN cnpm install --production

CMD pm2-runtime start startup.js