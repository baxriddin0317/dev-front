FROM node:16.20.2
WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
COPY .env.example .env

RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]
