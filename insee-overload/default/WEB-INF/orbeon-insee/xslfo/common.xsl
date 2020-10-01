f<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:fr="http://orbeon.org/oxf/xml/form-runner"
    xmlns:xf="http://www.w3.org/2002/xforms"
    xmlns:xxf="http://orbeon.org/oxf/xml/xforms"
    xmlns:saxon="http://saxon.sf.net/"
    xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:xhtml="http://www.w3.org/1999/xhtml" exclude-result-prefixes="xs" version="2.0">

    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>

    <!-- The xsl containing the set of parameters that can be overloaded by the xsl of each survey -->
    <xsl:include href="parametres.xsl"/>

    <!-- The pdf template -->
    <xsl:template match="/">
        <fo:root>
            <fo:layout-master-set>
                <fo:simple-page-master master-name="A4" page-height="210mm" page-width="297mm" margin-top="5mm" margin-bottom="10mm" margin-left="10mm" margin-right="10mm">
                    <fo:region-body/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            <fo:page-sequence master-reference="A4">
                <fo:flow flow-name="xsl-region-body">
                    <!-- Write a header -->
                    <xsl:call-template name="header"/>
                    <!-- Write the title (personalized if it exists, the title if not) -->
                    <xsl:call-template name="title"/>
                    <!-- Write the rest (it starts at the level of each section) -->
                    <xsl:apply-templates select="//fr:section"/>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>

    <xsl:template name="header">
        <fo:table>
            <fo:table-column/>
            <fo:table-column/>

            <fo:table-body>
                <fo:table-row>
                    <fo:table-cell>
                        <fo:block font-family="{$style}" font-size="11pt">
                            <xsl:text>Questionnaire </xsl:text>
                            <xsl:choose>
                                <xsl:when test="//xf:instance[@id='fr-form-instance']/form/stromae/util/expedie/text()='oui'">
                                    <xsl:text>expédié le </xsl:text>
                                    <xsl:value-of select="//xf:instance[@id='fr-form-instance']/form/stromae/util/dateHeure/text()" />
                                </xsl:when>
                                <xsl:when test="//xf:instance[@id='fr-form-instance']/form/stromae/util/expedie/text()='non'">
                                    <xsl:text>non expédié</xsl:text>
                                </xsl:when>
                            </xsl:choose>
                        </fo:block>
                    </fo:table-cell>
                    <fo:table-cell>
                        <fo:block font-family="{$style}" font-size="11pt" text-align="right">
                            <xsl:text>Identifiant : </xsl:text>
                            <xsl:value-of select="$unite"/>
                        </fo:block>
                    </fo:table-cell>
                </fo:table-row>
                <xsl:if test="//xf:instance[@id='fr-form-instance']/form/stromae/util/expedie/text()='oui'">
                    <fo:table-row>
                        <fo:table-cell number-columns-spanned="2">
                            <fo:block font-family="{$style}" font-size="11pt">
                                <xsl:text>Ce récapitulatif pdf de votre questionnaire vaut preuve d'envoi.</xsl:text>
                            </fo:block>
                        </fo:table-cell>
                    </fo:table-row>
                </xsl:if>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template name="title">
        <fo:block font-family="{$style}" font-size="18pt" font-weight="bold" background-color="{$couleurs/titre/text()}" text-align="center">
            <xsl:choose>
                <xsl:when test="//xf:output[@id='titre-formulaire']">
                    <xsl:apply-templates select="//xf:output[@id='titre-formulaire']"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="//xhtml:head/xhtml:title"/>
                </xsl:otherwise>
            </xsl:choose>
        </fo:block>
    </xsl:template>

    <xsl:template match="*">
        <xsl:apply-templates select="*"/>
    </xsl:template>

    <!-- Large part marker -->
    <xsl:template match="fr:section">
        <fo:block font-family="{$style}" font-size="15pt" font-weight="bold" space-before="13px" break-after="page">
            <fo:inline background-color="{$couleurs/module/text()}" padding="2px">
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl" select="@id"/>
                </xsl:call-template>
            </fo:inline>
            <xsl:apply-templates select="*"/>
        </fo:block>
    </xsl:template>

    <!-- Subpart marker -->
    <xsl:template match="xhtml:div[@class='paragraphe']">
        <fo:block font-family="{$style}" font-weight="normal" font-size="13pt" space-before="6px">
            <xsl:if test="not(xhtml:div[@class='regroupement'])">
                <xsl:attribute name="keep-together">
                    <xsl:value-of select="string('always')"/>
                </xsl:attribute>
            </xsl:if>
            <fo:inline background-color="{$couleurs/paragraphe/text()}" padding="2px">
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl">
                        <xsl:value-of select="xhtml:h3/xf:output/@id"/>
                    </xsl:with-param>
                </xsl:call-template>
            </fo:inline>
            <xsl:apply-templates select="*[not(name()='xhtml:h3')]"/>
        </fo:block>
    </xsl:template>

    <!-- Cluster marker -->
    <xsl:template match="xhtml:div[@class='regroupement']">
        <fo:block font-family="{$style}" font-size="12pt" space-before="6px" keep-together="always">
            <xsl:call-template name="getLibelle">
                <xsl:with-param name="nomControl">
                    <xsl:value-of select="xhtml:h4/xf:output/@id"/>
                </xsl:with-param>
            </xsl:call-template>
            <xsl:apply-templates select="*[not(name()='xhtml:h4')]"/>
        </fo:block>
    </xsl:template>

    <!-- The title of the questionnaire -->
    <xsl:template match="xf:output[@id='titre-formulaire']" priority="3">
        <xsl:call-template name="getLibelle">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

    <!-- Delete all fields that are not relevant (grouped in xf:group). -->
    <xsl:template match="xf:group">
        <xsl:variable name="bind">
            <xsl:value-of select="@bind"/>
        </xsl:variable>
        <xsl:variable name="relevant">
            <!-- We are careful to make the following replacement to point on the instance and not on the resources for example -->
            <xsl:value-of select="replace(//xf:bind[@id=$bind]/@relevant,'//','//xf:instance[@id=&quot;fr-form-instance&quot;]//')" />
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$relevant=''">
                <xsl:apply-templates select="*"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:variable name="condition" select="saxon:evaluate($relevant)" as="xs:boolean"/>
                <xsl:if test="$condition">
                    <xsl:apply-templates select="*"/>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- Nothing is displayed for xf:output that are not in a table. -->
    <xsl:template match="xf:output[not(xf:alert[@level='warning'] or ancestor::xhtml:table or ancestor::xhtml:div[@class='question'] or contains(@class,'tableau') or contains(@class,'Tableau'))]" priority="2"/>

    <xsl:template match="xhtml:div[@class='framePerso']" priority="3">
        <xsl:apply-templates select="*"/>
    </xsl:template>

    <!-- Texts that do not correspond to warnings or instructions -->
    <xsl:template match="xf:output[not(@class='consigne') and not(xf:alert[@level='warning'])]">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" font-weight="normal">
            <xsl:if test="contains(@class,'tableau') or contains(@class,'Tableau')">
                <xsl:attribute name="start-indent" select="string('10px')"/>
            </xsl:if>
            <xsl:call-template name="getLibelle">
                <xsl:with-param name="nomControl">
                    <xsl:value-of select="@id"/>
                </xsl:with-param>
            </xsl:call-template>
        </fo:block>
    </xsl:template>

    <xsl:template match="xf:output[xf:alert[@level='warning']]" priority="2">
        <xsl:variable name="bind">
            <xsl:value-of select="@bind"/>
        </xsl:variable>
        <xsl:variable name="constraint">
            <!-- We are careful to make the following replacement to point on the instance and not on the resources for example -->
            <xsl:value-of select="replace(//xf:bind[@id=$bind]/xf:constraint[@level='warning']/@value,'//','//xf:instance[@id=&quot;fr-form-instance&quot;]//')" />
        </xsl:variable>
        <xsl:variable name="condition" select="saxon:evaluate($constraint)" as="xs:boolean"/>
        <xsl:if test="not($condition)">
            <xsl:variable name="nom">
                <xsl:value-of select="substring-before(@id,'-control')"/>
            </xsl:variable>
            <fo:block font-family="{$style}" font-size="10pt" color="#FF7A2F" space-before="6px">
                <xsl:value-of select="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/alert/text()" />
            </fo:block>
        </xsl:if>
    </xsl:template>

    <!-- Those that do not correspond to warnings but to an instruction -->
    <xsl:template match="xf:output[@class='consigne' and not(xf:alert[@level='warning'])]">
        <fo:block font-family="{$style}" font-size="10pt" color="#3C5C7C" space-before="6px" font-weight="bold">
            <xsl:call-template name="getLibelle">
                <xsl:with-param name="nomControl">
                    <xsl:value-of select="@id"/>
                </xsl:with-param>
            </xsl:call-template>
        </fo:block>
    </xsl:template>

    <!-- The fields -->
    <xsl:template match="xf:textarea|xf:input">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl">
                        <xsl:value-of select="@id"/>
                    </xsl:with-param>
                </xsl:call-template>
            </fo:block>
            <fo:block color="blue" font-weight="bold">
                <xsl:variable name="reponse">
                    <xsl:call-template name="getReponse">
                        <xsl:with-param name="nom">
                            <xsl:value-of select="replace(@id,'-control','')"/>
                        </xsl:with-param>
                    </xsl:call-template>
                </xsl:variable>
                <xsl:value-of select="$reponse"/>
                <xsl:if test="following-sibling::xhtml:span[@class='suffixe'] and not($reponse='')">
                    <xsl:text></xsl:text>
                    <xsl:value-of select="following-sibling::xhtml:span[@class='suffixe']/text()"/>
                    <xsl:text></xsl:text>
                </xsl:if>
            </fo:block>
        </fo:block>
    </xsl:template>

    <xsl:template match="xhtml:div[@class='question']">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <xsl:apply-templates select="*"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="xf:input[@class='duree']">
        <fo:inline color="blue" font-weight="bold">
            <xsl:variable name="reponse">
                <xsl:call-template name="getReponse">
                    <xsl:with-param name="nom">
                        <xsl:value-of select="replace(@id,'-control','')"/>
                    </xsl:with-param>
                </xsl:call-template>
            </xsl:variable>
            <xsl:value-of select="$reponse"/>
            <xsl:if test="following-sibling::xhtml:span[@class='suffixe'] and not($reponse='')">
                <xsl:text></xsl:text>
                <xsl:value-of select="./(following-sibling::xhtml:span[@class='suffixe'])[1]/text()"/>
                <xsl:text></xsl:text>
            </xsl:if>
        </fo:inline>
    </xsl:template>
    <xsl:template match="xhtml:span[@class='suffixe']"/>

    <xsl:template match="xf:select|xf:select1">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl">
                        <xsl:value-of select="@id"/>
                    </xsl:with-param>
                </xsl:call-template>
            </fo:block>
            <xsl:variable name="codeReponse">
                <xsl:call-template name="getReponse">
                    <xsl:with-param name="nom">
                        <xsl:value-of select="replace(@id,'-control','')"/>
                    </xsl:with-param>
                </xsl:call-template>
            </xsl:variable>
            <xsl:if test="$codeReponse/text() and not($codeReponse/text()='')">
                <fo:block color="blue" font-weight="bold">
                    <xsl:call-template name="getLabelReponse">
                        <xsl:with-param name="nom">
                            <xsl:value-of select="replace(@id,'-control','')"/>
                        </xsl:with-param>
                        <xsl:with-param name="codeReponse">
                            <xsl:value-of select="$codeReponse"/>
                        </xsl:with-param>
                    </xsl:call-template>
                </fo:block>
            </xsl:if>
        </fo:block>
    </xsl:template>

    <xsl:template name="getLibelle">
        <xsl:param name="nomControl"/>
        <xsl:variable name="nom" select="replace($nomControl,'-control','')"/>
        <xsl:apply-templates select="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/label/node()" />
    </xsl:template>

    <xsl:template name="getReponse">
        <xsl:param name="nom"/>
        <xsl:value-of select="//xf:instance[@id='fr-form-instance']//Variable[@idVariable=$nom]"/>
    </xsl:template>

    <xsl:template name="getLabelReponse">
        <xsl:param name="nom"/>
        <xsl:param name="codeReponse"/>
        <xsl:variable name="valeur">
            <xsl:value-of select="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/item[child::value/text()=$codeReponse]/label/text()" />
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="$valeur=''">
                <xsl:text>Coché</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$valeur"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- Treatment on the xhtml tags inside the labels in the resource part of the xforms -->

    <xsl:template match="span[@class='gros']">
        <fo:inline font-size="20pt">
            <xsl:apply-templates select="node()"/>
        </fo:inline>
    </xsl:template>

    <xsl:template match="p">
        <fo:block max-width="{$max-width}">
            <xsl:if test="@id">
                <xsl:attribute name="id">
                    <xsl:value-of select="@id"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="span[@class='bloc']">
        <fo:block max-width="{$max-width}">
            <xsl:apply-templates select="node()"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="br">
        <fo:block/>
    </xsl:template>

    <xsl:template match="span[@style='text-decoration:underline']">
        <fo:inline text-decoration="underline">
            <xsl:apply-templates select="node()"/>
        </fo:inline>
    </xsl:template>

    <xsl:template match="b">
        <fo:inline font-weight="bold">
            <xsl:apply-templates select="node()"/>
        </fo:inline>
    </xsl:template>

    <xsl:template match="i">
        <fo:inline font-style="italic">
            <xsl:apply-templates select="node()"/>
        </fo:inline>
    </xsl:template>

    <xsl:template match="a[@href]">
        <fo:basic-link internal-destination="{if(starts-with(@href,'#')) then replace(@href,'#','') else @href}" text-decoration="underline">
            <xsl:apply-templates select="node()"/>
        </fo:basic-link>
    </xsl:template>

    <!-- Tables -->
    <xsl:template match="xhtml:table">
        <fo:table space-before="6px" keep-together="always" start-indent="10px">
            <xsl:apply-templates select="xhtml:thead | xhtml:tbody" mode="normal"/>
        </fo:table>
    </xsl:template>

    <xsl:template match="xhtml:table[contains(@class,'tableauComplexe')]">
        <fo:table space-before="6px" border="1px solid black" text-align="center" start-indent="10px">
            <xsl:apply-templates select="xhtml:thead | xhtml:tbody" mode="encadre"/>
        </fo:table>
    </xsl:template>
    <xsl:template match="xhtml:thead[child::xhtml:tr]" mode="#all">
        <fo:table-header>
            <xsl:apply-templates select="xhtml:tr" mode="#current"/>
        </fo:table-header>
    </xsl:template>
    <xsl:template match="xhtml:tbody" mode="#all">
        <fo:table-body>
            <xsl:apply-templates select="xhtml:tr" mode="#current"/>
        </fo:table-body>
    </xsl:template>
    <xsl:template match="xhtml:tr" mode="#all">
        <fo:table-row>
            <xsl:apply-templates select="xhtml:th | xhtml:td" mode="#current"/>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="xhtml:td" mode="normal">
        <fo:table-cell number-rows-spanned="{@rowspan}" number-columns-spanned="{@colspan}" width="13em" display-align="center" padding="2px">
            <fo:block font-size="10pt">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>
    <xsl:template match="xhtml:th" mode="normal">
        <fo:table-cell number-rows-spanned="{@rowspan}" number-columns-spanned="{@colspan}" display-align="center" padding="2px">
            <fo:block font-size="10pt" max-width="{$max-width}">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>

    <xsl:template match="xhtml:td | xhtml:th" mode="encadre">
        <fo:table-cell number-rows-spanned="{@rowspan}" number-columns-spanned="{@colspan}" border="1px solid black" display-align="center" padding="1px">
            <fo:block font-size="10pt" max-width="{$max-width}">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>

    <!-- The arrow is replaced by nothing since it is not displayed properly. -->
    <xsl:template match="text()">
        <xsl:value-of select="replace(replace(.,'&#x27A1; ',''),'‑','-')"/>
    </xsl:template>

</xsl:stylesheet>
