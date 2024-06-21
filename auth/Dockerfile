FROM node:alpine
# docker directory
WORKDIR /app 
# ./ this is WORKDIR of docker
COPY package.json ./
RUN npm install 
# ./ first mean folder from , second folder to copy which is docker 
COPY ./ ./

CMD ["npm","start"]