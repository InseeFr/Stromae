ARG TOMCAT_VERSION=9.0.100-jre17-temurin-jammy
FROM tomcat:${TOMCAT_VERSION}

# Ajout securité tomcat
RUN sed -i 's/<\/Host>/<Valve className="org.apache.catalina.valves.RemoteIpValve" remoteIpHeader="X-Forwarded-For" protocolHeader="X-Scheme"\/><\/Host>/' /usr/local/tomcat/conf/server.xml
RUN sed -i 's/<Connector port="8080" protocol="HTTP\/1.1"/<Connector port="8080" protocol="HTTP\/1.1"\n               server="unknown"/' /usr/local/tomcat/conf/server.xml
RUN sed -i 's/pattern="%h %l %u %t &quot;%r&quot; %s %b"/pattern="%h %l %u %t %r %s %b %D %{Referer}i %{User-Agent}i"/' /usr/local/tomcat/conf/server.xml
RUN sed -i 's/autoDeploy="true"/autoDeploy="false"/' /usr/local/tomcat/conf/server.xml
RUN sed -i 's/<Server port="8005" shutdown="SHUTDOWN">/<Server port="-1" shutdown="Super1mpr3viSible">/' /usr/local/tomcat/conf/server.xml

# Add WAR (application)
COPY ./target/*.war /usr/local/tomcat/webapps/rmesstromae.war

# Add configuration files (log4j, props & empty license.xml)
COPY ./conf/log4j2.xml /usr/local/tomcat/webapps/properties/config/log4j2.xml
COPY ./conf/properties-local-prod.xml /usr/local/tomcat/webapps/properties/config/properties-local-prod.xml
COPY ./conf/license.xml /home/tomcat/.orbeon/license.xml
# Add entrypoint.sh
COPY ./scripts/entrypoint.sh /usr/local/tomcat/entrypoint.sh

# Ajout user tomcat pour non root
ENV TOMCAT_USER_ID=10001
ENV TOMCAT_USER=tomcat

ENV JAVA_TOOL_OPTIONS_DEFAULT \
    -XX:MaxRAMPercentage=75 \
    -XX:+UseZGC

RUN groupadd -g $TOMCAT_USER_ID $TOMCAT_USER
RUN useradd $TOMCAT_USER -u $TOMCAT_USER_ID -g $TOMCAT_USER_ID -ms /bin/bash

RUN chown $TOMCAT_USER: /usr/local/tomcat -R
RUN chmod 750 /usr/local/tomcat -R
RUN chown $TOMCAT_USER: /home/tomcat/.orbeon -R

# give write permission to write in properties folder
RUN chmod 755 /usr/local/tomcat/entrypoint.sh
RUN chmod 755 /usr/local/tomcat/webapps/properties -R
RUN chmod 755 /home/tomcat/.orbeon -R

USER $TOMCAT_USER_ID

EXPOSE 8080
EXPOSE 8443

CMD ["/bin/bash", "-c", \
    "export JAVA_TOOL_OPTIONS=\"$JAVA_TOOL_OPTIONS_DEFAULT $JAVA_TOOL_OPTIONS\"; \
    $CATALINA_HOME/entrypoint.sh && catalina.sh run" ]
