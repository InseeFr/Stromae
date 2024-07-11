FROM tomcat:9-jre17

RUN rm -rf $CATALINA_HOME/webapps/*
ADD config/ $CATALINA_HOME/webapps/
ADD ./target/*.war $CATALINA_HOME/webapps/rmesstromae.war

COPY ./script/env.sh $CATALINA_HOME
RUN chmod 755 $CATALINA_HOME/env.sh

# Ajout securité tomcat
RUN sed -i 's/<Connector port="8080" protocol="HTTP\/1.1"/<Connector port="8080" protocol="HTTP\/1.1"\n               server="unknown"/' /usr/local/tomcat/conf/server.xml
RUN sed -i 's/pattern="%h %l %u %t &quot;%r&quot; %s %b"/pattern="%h %l %u %t %r %s %b %D %{Referer}i %{User-Agent}i"/' /usr/local/tomcat/conf/server.xml
RUN sed -i 's/autoDeploy="true"/autoDeploy="false"/' /usr/local/tomcat/conf/server.xml
RUN sed -i 's/<Server port="8005" shutdown="SHUTDOWN">/<Server port="-1" shutdown="Super1mpr3viSible">/' /usr/local/tomcat/conf/server.xml

# Ajout user tomcat pour non root
RUN groupadd -g 10001 tomcat
RUN useradd tomcat -u 10001 -g 10001 -ms /bin/bash

RUN chown tomcat: /usr/local/tomcat -R
RUN chmod 750 /usr/local/tomcat -R

USER tomcat

EXPOSE 8080
EXPOSE 8443

CMD ["/bin/bash", "-c", "$CATALINA_HOME/env.sh && catalina.sh run"]

