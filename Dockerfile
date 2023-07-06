FROM nginx:stable-alpine

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# test
COPY /public/dsfr/ /usr/share/nginx/html

#Add build to nginx root webapp
ADD build /usr/share/nginx/html

#Copy nginx configuration
RUN rm etc/nginx/conf.d/default.conf
COPY container/nginx.conf etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

COPY container/env.sh .
COPY .env .

# Make our shell script executable
RUN chmod +x env.sh

# add non-root user
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# non root users cannot listen on 80
EXPOSE 8080

USER nginx

# Start Nginx server
ENTRYPOINT bash -c "/usr/share/nginx/html/env.sh && nginx -g 'daemon off;'"