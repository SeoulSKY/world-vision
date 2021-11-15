FROM node:14

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

COPY ./package.json /app/package.json

COPY ./package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install

COPY . /app

EXPOSE 5000

ENTRYPOINT ["npm", "start"]

