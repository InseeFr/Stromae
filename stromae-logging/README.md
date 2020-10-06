# Stromae logging

Library to add in the lib d'orbeon folder.

This library has two functions:

- It allows to add information in the log (IP address, Session id and user-agent).
- This library makes available a filter that allows to filter the logs at the output of orbeon and avoids to clutter the log unnecessarily.

This aims to recover paradata.

## Files to modify in orbeon to run the library

- WEB-INF/orbeon-coleman/config/properties-local.xml

```xml
<!-- LOGGING -->
    <property as="xs:NMTOKENS" name="oxf.xforms.logging.debug">
        control
        event
        action
    </property>
```

- log4j.xml, the complete file used in Stromae is available disponible [ici](./src/main/resources/log4j.xml).

```xml
    <appender name="RollingFileAppender" class="org.apache.log4j.RollingFileAppender">
        <param name="File" value="${catalina.base}/logs/orbeon.log"/>
        <param name="MaxFileSize" value="1MB"/>
        <param name="maxBackupIndex" value="200"/>
        <param name="Append" value="false" />
        <param name="Encoding" value="UTF-8"/>
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%d{ISO8601} %p %c{1} - sessionId:%X{sessionId} ipAddr:%X{ipAddr} userAgent:%X{userAgent} survey:%X{survey} surveyUnit:%X{surveyUnit} OrbeonMessage:%m%n"/>
        </layout>
        <!-- Filter useless Logs-->
        <filter class="fr.insee.stromae.logging.CustomFilterParadata" />
    </appender>

    <!-- Debug mode of Orbeon -->
    <category name="org.orbeon.oxf.xforms.processor.XFormsServer">
        <priority value="debug"/>
    </category>
```

- web.xml

Be careful, this is a servlet filter and not the log filter. It allows to catch the client request and to get the IP address, the user-agent, etc...

```xml
    <!-- logging -->
    <filter>
        <filter-name>AddSessionDataFilter</filter-name>
        <filter-class>fr.insee.stromae.logging.AddSessionDataFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>AddSessionDataFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

## Retrieve client informations

It is the java class [`fr.insee.strome.logging.AddSessionDataFilter`](./src/main/java/fr/insee/stromae/logging/AddSessionDataFilter.java) that retrieves information from the client via the request.

## Filter the log to keep only the content useful for the exploitation of the paradata

It is the java class [`fr.insee.stromae.logging.CustomFilterParadata`](./src/main/java/fr/insee/stromae/logging/CustomFilterParadata.java) that filters the logs.
