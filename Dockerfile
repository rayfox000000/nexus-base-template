FROM node:10-alpine15.1
ENV PORT=8080
ENV MONGODB_URL=
ENV DATABASE=
ENV LOGGING_URL=
ENV LOGGING_COLLECTION=
ENV LIMIT=10
COPY ./src/Api/package.json ./app/
WORKDIR ./app/
RUN npm install
COPY ./src/Api /app
EXPOSE 8080
ENTRYPOINT ["npm","start"]
