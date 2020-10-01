<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
    xmlns:oxf="http://www.orbeon.com/oxf/processors" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <!-- Invalidation of the local session on Orbeon  -->
    <p:processor name="oxf:session-invalidator"/>
    <!-- We retrieve the parameters (verb, campaign, unit) of the query -->
    <p:processor name="oxf:pipeline">
        <p:input name="config" href="get-parameters.xpl"/>
        <p:output name="parameters" id="parameters"/>
    </p:processor>
    
    <!-- We create the url we are redirected to -->
    <p:processor name="oxf:unsafe-xslt">
        <p:input name="data" href="#parametres"/>	    
        <p:input name="config">			
            <redirect-url xsl:version="2.0">
                <server-side>false</server-side>  
                <path-info>
                    <xsl:choose>
                        <xsl:when test="p:property('insee-context')='household'">
                            <xsl:value-of select="concat(p:property('url-keycloak-logout'),'/',substring-before(/parameters/survey,'-'))"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="p:property('url-keycloak-logout')"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </path-info>
            </redirect-url>			
        </p:input>
        <p:output name="data" id="outxslt"/>
    </p:processor>		
    
    <!-- Redirection -->
    <p:processor name="oxf:redirect">
        <p:input name="data" href="#outxslt"/>
    </p:processor>
    
</p:config>