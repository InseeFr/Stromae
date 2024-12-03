#!/bin/bash
PATH_TO_PROPS_FILE=$CATALINA_HOME/webapps/properties/config/properties-local-prod.xml
sed -i "s^\$STROMAE_HOST^$STROMAE_HOST^g" $PATH_TO_PROPS_FILE
sed -i "s^\$STROMAE_DB_URL^$STROMAE_DB_URL^g" $PATH_TO_PROPS_FILE
sed -i "s^\$ORBEON_EXIST_COLLECTION^$ORBEON_EXIST_COLLECTION^g" $PATH_TO_PROPS_FILE
sed -i "s^\$ORBEON_EXIST^$ORBEON_EXIST^g" $PATH_TO_PROPS_FILE
echo $ORBEON_LICENSE > /home/tomcat/.orbeon/license.xml

