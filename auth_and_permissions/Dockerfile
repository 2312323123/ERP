FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

# https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html
RUN groupadd -r myuser && useradd -r -g myuser myuser

CMD [ "npm", "run", "start-fast" ]