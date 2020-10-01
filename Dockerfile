FROM tomcat:8.0-jre8

RUN apt-get update -qy && apt-get install gettext-base -y
RUN rm -rf $CATALINA_HOME/webapps/*
ADD demo/ $CATALINA_HOME/webapps/
ADD ./target/*.war $CATALINA_HOME/webapps/questionnaire.war

COPY ./scripts/env.sh $CATALINA_HOME
COPY ./scripts/.env $CATALINA_HOME

CMD ["/bin/bash", "-c", "$CATALINA_HOME/env.sh && catalina.sh run"]

