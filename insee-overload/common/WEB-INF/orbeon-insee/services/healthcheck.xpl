<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
    xmlns:oxf="http://www.orbeon.com/oxf/processors"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xf="http://www.w3.org/2002/xforms">

    <!-- Pipeline pour le healthcheck -->
    
    <!-- attraper l'URI d'origine : -->
    <p:processor name="oxf:request">
        <p:input name="config">
            <config stream-type="xs:anyURI">
                <include>/request/request-uri</include>
                <include>/request/parameters</include>
            </config>         
        </p:input>
        <p:output name="data" id="request"/>
    </p:processor>     
   
    <!-- On teste l'accès à la base Orbeon et la presence du fichier de properties -->
    <p:processor name="oxf:xforms-submission">
        <p:input name="request">
            <dummy/>
        </p:input>
        <p:input name="submission" transform="oxf:unsafe-xslt" href="#request">            
                <xf:submission xsl:version="2.0" method="get" resource="{p:property('server-exist-orbeon')}/rest/db/restxq/properties.xml"/>
                                    
                            
        </p:input>
        <p:output name="response" id="instanceOI"/>
    </p:processor>
    
    <!-- on récupère les url de test pour la suite -->
    <p:processor name="oxf:unsafe-xslt">
        <p:input name="data" href="#instanceOI"/>      
        <p:input name="config">
            <parametres xsl:version="2.0">                
                <get>       
                    <xsl:value-of select="//entry[@key='healthcheck-path-get']/text()"/>
                </get>
                <post>
                    <xsl:value-of select="//entry[@key='healthcheck-path-post']/text()"/>
                </post> 
            </parametres>
        </p:input>
        <p:output name="data" id="parametresO"/>
    </p:processor>

    <p:choose href="#instanceOI">
        <p:when test="//dummy">
            <!-- La base orbeon ne répond pas -->
            <p:processor name="oxf:unsafe-xslt">
                <p:input name="data" href="#instanceOI"/>
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">
                            <baseOrbeon>                                
                                <retourGet>KO (la base ne répond pas)</retourGet>
                            </baseOrbeon>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="responseOI"/>
            </p:processor>
        </p:when>
        <p:otherwise>
            <p:processor name="oxf:unsafe-xslt">
                <p:input name="data" href="#instanceOI"/>
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">                            
                            <baseOrbeon>
                                <retourGet>OK (la base répond)</retourGet>                                
                            </baseOrbeon>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="responseOI"/>
            </p:processor>
        </p:otherwise>
    </p:choose>


    <!-- On récupère l'instance de test Orbeon -->
    <p:processor name="oxf:xforms-submission">
        <p:input name="request"><dummy/></p:input>
        <p:input name="submission" transform="oxf:unsafe-xslt" href="#parametresO">
            <xf:submission xsl:version="2.0" method="get"
                resource="{p:property('server-exist-orbeon')}/rest/db/orbeon/fr/{/parametres/get}.xml"
            />
        </p:input>
        <p:output name="response" id="instanceO"/>
    </p:processor>

    <p:choose href="#instanceO">
        <p:when test="not(//form)">
            <!-- Le get Orbeon a foiré -->
            <p:processor name="oxf:unsafe-xslt">
                <!--<p:input name="req" href="#request"/>--> 
                <p:input name="data" href="#parametresO"/>                
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">
                            <baseOrbeon>
                                <retourGet>KO (fichier de réponse de test manquant)</retourGet>
                                <retourPost>non testé</retourPost>                                
                            </baseOrbeon>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="responseO"/>
            </p:processor>
        </p:when>
        <p:otherwise>
            <!-- Sinon on tente le put Orbeon-->
            <p:processor name="oxf:xforms-submission">
                <p:input name="submission" transform="oxf:unsafe-xslt" href="#parametresO">
                    <xf:submission xsl:version="2.0" method="post" replace="instance"
                        serialization="application/xml" media-type="application/xml"
                        resource="{p:property('server-exist-orbeon')}/apps/orbeon/collectes/reponse/{/parametres/post}HC"
                    />                                     
                </p:input>
                <p:input name="request" href="#instanceO"/>
                <p:output name="response" id="responseOPost"/>
            </p:processor>

            <p:choose href="#responseOPost">                
                <p:when test="not(//ok)">
                    <!-- Le post a échoué Orbeon-->
                    <p:processor name="oxf:unsafe-xslt">
                        <p:input name="data" href="#instanceO"/>
                        <p:input name="config">
                            <xsl:stylesheet version="2.0">
                                <xsl:template match="/">
                                    <baseOrbeon>
                                        <retourGet>OK (fichier de réponse de test
                                            accessible)</retourGet>
                                        <retourPost>KO (l'écriture en base a échoué)</retourPost>
                                    </baseOrbeon>
                                </xsl:template>
                            </xsl:stylesheet>
                        </p:input>
                        <p:output name="data" id="responseO"/>
                    </p:processor>
                </p:when>
                <p:otherwise>
                    <!-- Le post Orbeon a réussi -->
                    <p:processor name="oxf:unsafe-xslt">
                        <p:input name="data" href="#instanceO"/>
                        <p:input name="config">
                            <xsl:stylesheet version="2.0">
                                <xsl:template match="/">
                                    <baseOrbeon>
                                        <retourGet>OK (fichier de réponse de test
                                            accessible)</retourGet>
                                        <retourPost>OK (l'écriture en base a réussi)</retourPost>
                                    </baseOrbeon>
                                </xsl:template>
                            </xsl:stylesheet>
                        </p:input>
                        <p:output name="data" id="responseO"/>
                    </p:processor>
                </p:otherwise>
            </p:choose>
        </p:otherwise>
    </p:choose>

    <!-- On teste l'accès à la base Pilotage et la presence du fichier de properties -->
    <p:processor name="oxf:xforms-submission">
        <p:input name="request">
            <dummy/>
        </p:input>
        <p:input name="submission" transform="oxf:unsafe-xslt" href="#request">
            <xf:submission xsl:version="2.0" method="get"
                resource="{p:property('server-exist-pilotage')}/rest/db/restxq/properties.xml"/>
        </p:input>
        <p:output name="response" id="instancePI"/>
    </p:processor>

    <!-- on récupère les url de test pour la suite -->
    <p:processor name="oxf:unsafe-xslt">
        <p:input name="data" href="#instancePI"/>
        <p:input name="config">
            <parametres xsl:version="2.0">                                
                <pilotage>
                    <xsl:value-of select="//entry[@key='healthcheck-pilotage']/text()"/>
                </pilotage>                
            </parametres>
        </p:input>
        <p:output name="data" id="parametresP"/>
    </p:processor>

    <p:choose href="#instancePI">
        <p:when test="//dummy">
            <!-- La base pilotage ne répond pas -->
            <p:processor name="oxf:unsafe-xslt">
                <p:input name="data" href="#instancePI"/>
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">
                            <basePilotage>
                                <retourGet>KO (la base ne répond pas)</retourGet>
                            </basePilotage>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="responsePI"/>
            </p:processor>
        </p:when>
        <p:otherwise>
            <p:processor name="oxf:unsafe-xslt">
                <p:input name="data" href="#instancePI"/>
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">
                            <basePilotage>
                                <retourGet>OK (la base répond)</retourGet>
                            </basePilotage>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="responsePI"/>
            </p:processor>
        </p:otherwise>
    </p:choose>



    <!-- On récupère l'instance de test Pilotage -->
    <p:processor name="oxf:xforms-submission">
        <p:input name="request">
            <dummy/>
        </p:input>
        <p:input name="submission" transform="oxf:unsafe-xslt" href="#parametresP">
            <xf:submission xsl:version="2.0" method="get"
                resource="{p:property('server-exist-pilotage')}/restxq/{p:property('informations-service')}/{/parametres/pilotage}"
            />
        </p:input>
        <p:output name="response" id="instanceP"/>
    </p:processor>

    <p:choose href="#instanceP">
        <p:when test="not(//Contact) or not(//UniteEnquetee)">
            <!-- Le get Pilotage a foiré -->
            <p:processor name="oxf:unsafe-xslt">
                <p:input name="data" href="#instanceP"/>
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">
                            <basePilotage>
                                <retourGet>KO (le WS a échoué)</retourGet>
                            </basePilotage>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="responseP"/>
            </p:processor>
        </p:when>
        <p:otherwise>

            <p:processor name="oxf:unsafe-xslt">
                <p:input name="data" href="#instanceP"/>
                <p:input name="config">
                    <xsl:stylesheet version="2.0">
                        <xsl:template match="/">
                            <basePilotage>
                                <retourGet>OK (le WS a réussi)</retourGet>
                            </basePilotage>
                        </xsl:template>
                    </xsl:stylesheet>
                </p:input>
                <p:output name="data" id="responseP"/>
            </p:processor>
        </p:otherwise>
    </p:choose>


    <!-- préparer la page de retour-->
    <p:processor name="oxf:unsafe-xslt">
        <p:input name="req" href="#request"/>
        <p:input name="responseO" href="#responseO"/>
        <p:input name="responseOI" href="#responseOI"/>
        <p:input name="responseP" href="#responseP"/>
        <p:input name="responsePI" href="#responsePI"/>
        <p:input name="parametresO" href="#parametresO"/>
        <p:input name="parametresP" href="#parametresP"/>
        <p:input name="data" href="../xhtml/healthcheck.xhtml"/>
        <p:input name="config">
            <xsl:stylesheet version="2.0">
                <xsl:param name="req" select="doc('input:req')/request/parameters/parameter[name/text()='debug']/value"/>
                <xsl:param name="responseO" select="doc('input:responseO')"/>
                <xsl:param name="responseOI" select="doc('input:responseOI')"/>
                <xsl:param name="responseP" select="doc('input:responseP')"/>
                <xsl:param name="responsePI" select="doc('input:responsePI')"/>
                <xsl:param name="parametresO" select="doc('input:parametresO')"/>
                <xsl:param name="parametresP" select="doc('input:parametresP')"/>
                <xsl:template match="/">
                    <xsl:apply-templates select="*"/>
                </xsl:template>
                <xsl:template match="node() | @*">
                    <xsl:copy>
                        <xsl:apply-templates select="node() | @*"/>
                    </xsl:copy>
                </xsl:template>
                <xsl:template match="body">
                    <xsl:element name="body">
                        <div>Tomcat Orbeon: ok</div>
                        <div>
                            <p>Base eXist Orbeon:</p>
                            <li>
                                <xsl:element name="ul">
                                    <xsl:value-of
                                        select="concat('get simple: ',$responseOI/baseOrbeon/retourGet)"
                                    />
                                </xsl:element>
                                <xsl:element name="ul">
                                    <xsl:value-of
                                        select="concat('get reponse: ',$responseO/baseOrbeon/retourGet)"
                                    />
                                </xsl:element>
                                <xsl:element name="ul">
                                    <xsl:value-of
                                        select="concat('post reponse: ',$responseO/baseOrbeon/retourPost)"
                                    />
                                </xsl:element>
                            </li>
                        </div>
                        <div>
                            <p>Base eXist Pilotage:</p>
                            <li>
                                <xsl:element name="ul">
                                    <xsl:value-of
                                        select="concat('get simple: ',$responsePI/basePilotage/retourGet)"
                                    />
                                </xsl:element>
                                <xsl:element name="ul">
                                    <xsl:value-of
                                        select="concat('get info: ',$responseP/basePilotage/retourGet)"
                                    />
                                </xsl:element>
                            </li>                            
                        </div>
                        <!--<xsl:if test="$req='debug'">
                            <div>
                                <p>DEBUG</p>                                
                                <li>
                                    <xsl:element name="ul">
                                        <xsl:value-of select="concat('get reponse cible: ',$parametresO/parametres/get)"/>
                                    </xsl:element>
                                    <xsl:element name="ul">
                                        <xsl:value-of select="concat('post reponse cible: ',$parametresO/parametres/post)"/>
                                    </xsl:element>
                                    <xsl:element name="ul">
                                        <xsl:value-of select="concat('get info cible: ',$parametresP/parametres/pilotage)"/>
                                    </xsl:element>
                                </li>
                            </div>
                        </xsl:if>-->
                    </xsl:element>
                </xsl:template>
            </xsl:stylesheet>
        </p:input>
        <p:output name="data" id="pageHC"/>
    </p:processor>

    <!--transfo en html 5-->
    <p:processor name="oxf:html-converter">
        <p:input name="config">
            <config>
                <version>5.0</version>
                <encoding>utf-8</encoding>
                <indent>true</indent>
                <indent-amount>0</indent-amount>
            </config>
        </p:input>
        <p:input name="data" href="#pageHC"/>
        <p:output name="data" id="pageHCConvertie"/>
    </p:processor>

    <!-- On renvoie le healthcheck-->
    <p:choose href="#pageHC">
        <!--si on trouve un KO parmi les tests, on renvoie la page avec un code http erreur 500-->
        <p:when test="//ul[matches(text(),'KO')]">
            <p:processor name="oxf:http-serializer">
                <p:input name="config">
                    <config>
                        <status-code>500</status-code>
                    </config>
                </p:input>
                <p:input name="data" href="#pageHCConvertie"/>
            </p:processor>
        </p:when>
        <!--sinon code http 200-->
        <p:otherwise>
            <p:processor name="oxf:http-serializer">
                <p:input name="config">
                    <config>
                        <status-code>200</status-code>
                    </config>
                </p:input>
                <p:input name="data" href="#pageHCConvertie"/>
            </p:processor>
        </p:otherwise>
    </p:choose>

</p:config>
