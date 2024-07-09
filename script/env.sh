#!/bin/bash
envsubst < "$CATALINA_HOME/webapps/properties/config/properties-local-dev.xml" > "$CATALINA_HOME/webapps/properties/config/props.temp"
mv "$CATALINA_HOME/webapps/properties/config/props.temp" "$CATALINA_HOME/webapps/properties/config/properties-local-dev.xml"
