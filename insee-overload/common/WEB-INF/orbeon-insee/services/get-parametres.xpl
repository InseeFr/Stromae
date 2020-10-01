<!-- This pipeline is used to retrieve the parameters of all HTTP requests from the application. -->
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:oxf="http://www.orbeon.com/oxf/processors">

    <!-- The output parameter tree that will be retrieved by the other pipelines -->
    <p:param type="output" name="parameters"/>

    <!-- We retrieve the path of the request -->
    <!-- We retrieve le remote-user -->
    <!-- We retrieve parameters -->
    <p:processor name="oxf:request">
        <p:input name="config">
            <config>
                <include>/request/request-path</include>
                <include>/request/attributes</include>
                <include>/request/parameters</include>
            </config>
        </p:input>
        <p:output name="data" id="request"/>
    </p:processor>

    <!-- And we build the parameter tree from the query -->
    <!-- Two possibilities, we are in a form-runner url or not -->
    <p:choose href="#request">
        <!-- If we are in a form-runner url.
        We can eventually remove this case if we remove the form-runner. -->
        <p:when test="starts-with(/request/request-path, '/fr/')">
            <p:processor name="oxf:unsafe-xslt">
                <!-- En entrée la requête -->
                <p:input name="data" href="#request"/>
                <p:input name="config">
                    <parameters xsl:version="2.0">
                        <xsl:variable name="url-part" select="tokenize(/request/request-path,'/')"/>
                        <action>
                            <xsl:value-of select="lower-case($url-part[5])"/>
                        </action>
                        <survey>
                            <xsl:value-of select="lower-case($url-part[3])"/>
                        </survey>
                        <modele>
                            <xsl:value-of select="lower-case($url-part[4])"/>
                        </modele>
                        <surveyUnit>
                            <xsl:value-of
                                select="upper-case(/request/parameters/parameter[name/text()='unite-enquete']/value)"
                            />
                        </surveyUnit>
                        <xsl:if test="/request/attributes/attribute[name='remote-user']">
                            <identifiant>
                                <xsl:value-of select="upper-case(/request/attributes/attribute[name='remote-user']/value)"/>
                            </identifiant>
                        </xsl:if>
                    </parameters>
                </p:input>
                <p:output name="data" ref="parameters"/>
            </p:processor>
        </p:when>
        <p:when test="starts-with(/request/request-path, '/logout')">
            <p:processor name="oxf:unsafe-xslt">
                <!-- En entrée la requête -->
                <p:input name="data" href="#request"/>
                <p:input name="config">
                    <parameters xsl:version="2.0">                        
                        <surveyUnit>
                            <xsl:value-of select="upper-case(/request/parameters/parameter[name/text()='survey-unit']/value)"/>
                        </surveyUnit>
                        <survey><xsl:value-of select="/request/parameters/parameter[name/text()='survey']/value"/></survey>
                    </parameters>
                </p:input>
                <p:output name="data" ref="parameters"/>
            </p:processor>
        </p:when>
        <p:otherwise>
            <p:processor name="oxf:unsafe-xslt">
                <!-- En entrée la requête -->
                <p:input name="data" href="#request"/>
                <p:input name="config">
                    <!-- On crée l'arbre de sortie -->
                    <parameters xsl:version="2.0">
                        <xsl:variable name="url-part" select="tokenize(/request/request-path,'/')"/>
                        <action>
                            <xsl:value-of select="lower-case($url-part[2])"/>
                        </action>
                        <survey>
                            <xsl:value-of select="lower-case($url-part[3])"/>
                        </survey>
                        <surveyUnit>
                            <xsl:value-of select="upper-case($url-part[4])"/>
                        </surveyUnit>
                        <xsl:if test="/request/parameters/parameter[name/text()='modele']">
                            <modele>
                                <xsl:value-of
                                    select="lower-case(/request/parameters/parameter[name/text()='modele']/value)"
                                />
                            </modele>
                        </xsl:if>
                        <xsl:if test="/request/attributes/attribute[name='remote-user']">
                            <identifiant>
                                <xsl:value-of select="upper-case(/request/attributes/attribute[name='remote-user']/value)"/>
                            </identifiant>
                        </xsl:if>
                    </parameters>
                </p:input>
                <p:output name="data" ref="parameters"/>
            </p:processor>
        </p:otherwise>
    </p:choose>

</p:config>
