FROM squidfunk/mkdocs-material:latest as build
WORKDIR /build
COPY . .
RUN pip install --no-cache-dir mkdocs-render-swagger-plugin
RUN npm ci
RUN npm run build
RUN mkdocs build

FROM docker.io/library/nginx:alpine
COPY --from=build /build/site/ /usr/share/nginx/html/
