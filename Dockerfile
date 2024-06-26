# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY pnpm*.json ./
RUN npm config set registry https://registry.npm.taobao.org && npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]