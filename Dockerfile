FROM tomcat:8.0-jre8

RUN apt-get update -qy && apt-get install gettext-base -y
RUN rm -rf $CATALINA_HOME/webapps/*
ADD config/ $CATALINA_HOME/webapps/
ADD ./target/*.war $CATALINA_HOME/webapps/rmesstromae.war

CMD ["/bin/bash", "-c", "catalina.sh run"]

