FROM node:20

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]

EXPOSE 3000

# Remove unnecessary commands if not using Nginx/serve
# CMD ["serve", "-s", "build"]
