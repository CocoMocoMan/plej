FROM node
# RUN apt-get update -y && apt-get -y install curl python build-essential git ca-certificates 
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD npm run start