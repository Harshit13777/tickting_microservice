FROM node:alpine
# docker directory
WORKDIR /app 
# ./ this is WORKDIR of docker
COPY package.json ./
# omit the install of pakage which are in --save-dev
RUN npm install --omit=dev   
# ./ first mean folder from , second folder to copy which is docker 
COPY ./ ./

CMD ["npm","start"]