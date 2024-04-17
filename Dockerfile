# Fase de compilación
FROM node:20.12-alpine as build-step

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build --prod

# Fase de producción
FROM nginx:alpine

COPY --from=build-step /app/dist/frontiweb /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
