#=====================================
# Stage 1: Build the Angular app
#=====================================
FROM node:20 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build --configuration=production

#=====================================
# Stage 2: Serve the app with NGINX
#=====================================
FROM nginx:stable-alpine

COPY Nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
