FROM tomcat:8.5.16-jre8

MAINTAINER bwerquin

RUN rm -rf $CATALINA_HOME/webapps/*
ADD /config/ $CATALINA_HOME/webapps/config/
ADD *.war $CATALINA_HOME/webapps/rmestromae.war
