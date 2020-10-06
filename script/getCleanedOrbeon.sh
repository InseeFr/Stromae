#!/usr/bin/env bash
#title           :getCleanedOrbeon.sh
#description     :This script download orbeon from github and delete useless files
#author          :Laurent Caouissin
#==============================================================================

set -e

ORBEON_URL="$1"
USE_INSEE_PROXY="$2"
ORBEON_FILE_NAME=$(basename -s .zip $ORBEON_URL)
ORBEON_SOURCE_FOLDER=orbeon-source



function setUpInseeProxy(){
    echo "Set Insee Proxy"
    export http_proxy="$INSEE_HTTP_PROXY"
    export https_proxy="$INSEE_HTTPS_PROXY"
}

function setUp(){
    if [ "$USE_INSEE_PROXY" = true ]
    then 
        setUpInseeProxy
    fi
}

function downloadOrbeonAndUnZip(){
    echo "Download orbeon source from GitHub"
    curl -L $ORBEON_URL -o orbeon.zip 
    echo "Unzip orbeon"
    unzip orbeon.zip $ORBEON_FILE_NAME/orbeon.war
    rm -rf orbeon.zip
    mkdir $ORBEON_SOURCE_FOLDER && unzip $ORBEON_FILE_NAME/orbeon.war -d $ORBEON_SOURCE_FOLDER
    rm -rf $ORBEON_FILE_NAME
}

function cleanOrbeon(){
    echo "Clean orbeon source"
    cd $ORBEON_SOURCE_FOLDER
    rm -rfv xforms-jsp
    echo "Clean Exist source"
    rm -rfv WEB-INF/exist-data
    rm -rfv WEB-INF/lib/exist-*.jar
    echo "Delete unecessary file in WEB-INF folder"
    find WEB-INF/* -maxdepth 0 -type f -delete
    echo "Delete unecessary apps in WEB-INF/resources/apps folder"
    find WEB-INF/resources/apps/* -type d -not -name "context" -exec rm -rfv {} +
    echo "Clean orbeon is finished"
}

function main(){
    setUp && downloadOrbeonAndUnZip && cleanOrbeon
}

main


