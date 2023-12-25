FROM node:21-alpine3.17 as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build


FROM nginx
COPY --from=build /app/dist /app
COPY deploy/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
