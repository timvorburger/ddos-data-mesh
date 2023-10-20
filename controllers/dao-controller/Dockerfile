# Stage: build
FROM node:18 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
ARG RUNMODE
ARG DAO_AGENT_HOST=${DAO_AGENT_HOST:-"localhost"}
ENV RUNMODE=${RUNMODE} DAO_AGENT_HOST=${DAO_AGENT_HOST}
RUN npm run build

# Stage: runtime
FROM nginx:alpine as runtime
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/dao-controller /usr/share/nginx/html/
ENTRYPOINT ["nginx", "-g", "daemon off;"]