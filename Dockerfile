FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN apk update && apk add git
RUN git clone https://github.com/TheKritix/dtu-praktikportalen.git
WORKDIR "/usr/src/app/dtu-praktikportalen"
RUN npm install && npm cache clean --force
RUN npm install --global serve
RUN npm run build
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
CMD ["serve", "-s", "build", "-p", "80"]
