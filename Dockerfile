FROM node:16.11.1-alpine3.11
WORKDIR /code

COPY . /code

RUN yarn install

RUN yarn build

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["front"]
