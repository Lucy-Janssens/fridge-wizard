# Use nginx alpine as base image
FROM nginx:alpine

# Copy the static HTML file to nginx's web root
COPY index.html /usr/share/nginx/html/

# Create a simple nginx config for single-page app
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
