# Stage 1
FROM node:14.15.4 as node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/ds2022-30241-coblisan-george-assignment-1-fe /usr/share/nginx/html