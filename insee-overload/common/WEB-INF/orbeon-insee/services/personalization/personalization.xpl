<!-- Cette pipeline permet de récupérer les paramètres de l'ensemble des requêtes HTTP de l'application -->
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:oxf="http://www.orbeon.com/oxf/processors"
    xmlns:xf="http://www.w3.org/2002/xforms">

    <p:param type="input" name="formulaire"/>
    <p:param type="input" name="parameters"/>
    <p:param type="output" name="personalized-form"/>

    <p:processor name="oxf:xforms-submission">
        <p:input name="request">
            <dummy/>
        </p:input>
        <p:input name="submission" transform="oxf:unsafe-xslt" href="#parameters">
            <xf:submission xsl:version="2.0" method="get"
                resource="{p:property('server-exist-orbeon')}/restxq/{p:property('preremplissage-service')}/{/parameters/survey}/{/parameters/modele}/{/parameters/surveyUnit}"/>
        </p:input>
        <p:output name="response" id="instance"/>
    </p:processor>
        
    <p:choose href="#parameters">
        <p:when test="not(/parameters/identifiant)">
            <p:processor name="oxf:unsafe-xslt">
                <p:input name="data" href="#parameters"/>
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">
                            <parameters>
                                <xsl:copy-of
                                    select="/parameters/*"/>
                                <identifiant>
                                    <xsl:value-of select="p:property('identifiant')"/>
                                </identifiant>
                            </parameters>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="parameters-bis"/>
            </p:processor>
        </p:when>
        <p:otherwise>
            <p:processor name="oxf:identity">
                <p:input name="data" href="#parameters"/>
                <p:output name="data" id="parameters-bis"/>
            </p:processor>
        </p:otherwise>
    </p:choose>
    <!-- We are going to retrieve the piloting information -->
    <!-- If you access via edit or print, you are an internal user, you will retrieve the basic identifier from the campaign and the surveyed unit. -->
    <p:choose href="#parameters-bis">
        <p:when test="/parameters/action='edit' or /parameters/action='imprimer'">
            <!-- A basic query is made to retrieve the contact. -->
            <p:processor name="oxf:xforms-submission">
                <p:input name="request">
                    <dummy/>
                </p:input>
                <p:input name="submission" transform="oxf:unsafe-xslt" href="#parameters-bis">
                    <xf:submission xsl:version="2.0" method="get"
                        resource="{p:property('server-exist-pilotage')}/restxq/interrogations/{/parameters/survey}/{/parameters/surveyUnit}"
                    />
                </p:input>
                <p:output name="response" id="interrogation"/>
            </p:processor>
            <!-- We copy the request by modifying the contact id -->
            <p:processor name="oxf:unsafe-xslt">
                <p:input name="data" href="#parameters-bis"/>
                <p:input name="interrogation" href="#interrogation"/>
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">
                            <parameters>
                                <xsl:copy-of
                                    select="/parameters/*[not(name()='identifiant')]"/>
                                <identifiant>
                                    <xsl:value-of select="doc('input:interrogation')//Interrogation/@idContactPrincipal"/>
                                </identifiant>
                            </parameters>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="parameters-ter"/>
            </p:processor>
        </p:when>
        <p:otherwise>
            <p:processor name="oxf:identity">
                <p:input name="data" href="#parameters-bis"/>
                <p:output name="data" id="parameters-ter"/>
            </p:processor>
        </p:otherwise>
    </p:choose>
    
    <!-- We retrieve thepiloting information -->
    <p:processor name="oxf:xforms-submission">
        <p:input name="request">
            <dummy/>
        </p:input>
        <p:input name="submission" transform="oxf:unsafe-xslt" href="#parameters-ter">
            <xf:submission xsl:version="2.0" method="get"
                resource="{p:property('server-exist-pilotage')}/restxq/{p:property('informations-service')}/{/parameters/survey}?idUe={/parameters/surveyUnit}&amp;idContact={/parameters/identifiant}"
            />
        </p:input>
        <p:output name="response" id="informations"/>
    </p:processor>
    
    <!-- We enrich the form with the recovered information -->
    <p:processor name="oxf:unsafe-xslt">
        <p:input name="data" href="#formulaire"/>
        <p:input name="instance" href="#instance"/>
        <p:input name="informations" href="#informations"/>
        <p:input name="config">
            <xsl:stylesheet version="2.0">
                <xsl:import href="initialisation.xsl"/>
                <xsl:param name="instance" select="doc('input:instance')"/>
                <xsl:param name="informations" select="doc('input:informations')"/>
            </xsl:stylesheet>
        </p:input>
        <p:output name="data" id="perso-form"/>
    </p:processor>
    
    <!-- We replace the labels with the Danish character -->
    <p:processor name="oxf:unsafe-xslt">
        <p:input name="data" href="#perso-form"/>
        <p:input name="config">
            <xsl:stylesheet version="2.0">
                <xsl:import href="personalization.xsl"/>
            </xsl:stylesheet>
        </p:input>
        <p:output name="data" id="personalized-form" ref="personalized-form"/>
    </p:processor>
    
</p:config>
