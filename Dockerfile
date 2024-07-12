FROM nginx:latest  

COPY dist/frontiweb/browser /usr/share/nginx/html

# Exposing a port, here it means that inside the container, the app will be using Port 80 while running
EXPOSE 80
 