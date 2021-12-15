#!/bin/bash

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  export $varname=$value  
  
done < $CATALINA_HOME/.env
envsubst < "$CATALINA_HOME/webapps/properties/config/properties-local.xml" > props.temp
mv props.temp "$CATALINA_HOME/webapps/properties/config/properties-local.xml"
