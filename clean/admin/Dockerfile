# Build Stage
FROM node:18-alpine as build

WORKDIR /app

COPY clean/admin/package*.json ./
RUN npm install

COPY clean/admin/. .
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy custom nginx config
COPY clean/admin/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
