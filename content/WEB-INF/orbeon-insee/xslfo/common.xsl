<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fr="http://orbeon.org/oxf/xml/form-runner"
    xmlns:xf="http://www.w3.org/2002/xforms" xmlns:xxf="http://orbeon.org/oxf/xml/xforms"
    xmlns:saxon="http://saxon.sf.net/" xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:xhtml="http://www.w3.org/1999/xhtml" exclude-result-prefixes="xs" version="3.0">

    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>


    <!-- "Pour l'export des variables", 3 commentaires indiquent ci-dessous les modifications à apporter -->

    <!-- La xsl comportant l'ensemble des paramètres surchargeables par les xsl de chaque enquête -->
    <xsl:include href="parametres.xsl"/>

    <!-- Le template du pdf -->
    <xsl:template match="/">

        <!-- debug preuve de dépôt -->
        <!--<xsl:result-document href="{concat('opt/tomcat/webapps/',concat(//xf:instance[@id='fr-form-instance']/form/@modele,'voila.xml'))}">
            <xsl:copy-of select="root()"/>
        </xsl:result-document>-->
        <!-- fin debug preuve de dépôt -->
        <xsl:variable name="tree" as="node()">
            <xsl:element name="Tree"/>
        </xsl:variable>

        <fo:root>

            <fo:layout-master-set>
                <fo:simple-page-master master-name="A4" page-height="210mm" page-width="297mm"
                    margin-top="5mm" margin-bottom="10mm" margin-left="10mm" margin-right="10mm">
                    <fo:region-body/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            <fo:page-sequence master-reference="A4">
                <fo:flow flow-name="xsl-region-body">
                    <!-- On écrit une entête -->
                    <xsl:call-template name="entete"/>
                    <!-- On écrit le titre (personnalisé s'il existe, le title sinon) -->
                    <xsl:call-template name="titre"/>
                    <!-- On écrit le reste (ça démarre au niveau de chaque section) -->
                    <xsl:apply-templates select="//xf:case/fr:section | //xf:case/xf:repeat">
                        <xsl:with-param name="tree" select="$tree" as="node()" tunnel="yes"/>
                        <xsl:with-param name="Boucle_salarie_occurrence" select="'0'" tunnel="yes"/>
                    </xsl:apply-templates>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>

    <xsl:template name="entete">
        <fo:table table-layout="fixed" width="100%">
            <fo:table-body>
                <fo:table-row>
                    <fo:table-cell>
                        <fo:block font-family="{$style}" font-size="11pt">
                            <xsl:text>Questionnaire </xsl:text>
                            <xsl:choose>
                                <xsl:when
                                    test="//xf:instance[@id = 'fr-form-instance']/form/stromae/util/expedie/text() = 'oui'">
                                    <xsl:text>expédié le </xsl:text>
                                    <xsl:value-of
                                        select="//xf:instance[@id = 'fr-form-instance']/form/stromae/util/dateHeure/text()"
                                    />
                                </xsl:when>
                                <xsl:when
                                    test="//xf:instance[@id = 'fr-form-instance']/form/stromae/util/expedie/text() = 'non'">
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
                <xsl:if
                    test="//xf:instance[@id = 'fr-form-instance']/form/stromae/util/expedie/text() = 'oui'">
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

    <xsl:template name="titre">
        <fo:block font-family="{$style}" font-size="18pt" font-weight="bold"
            background-color="{$couleurs/titre/text()}" text-align="center">
            <xsl:choose>
                <xsl:when test="//xf:output[@id = 'titre-formulaire']">
                    <xsl:apply-templates select="//xf:output[@id = 'titre-formulaire']"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="//xhtml:head/xhtml:title"/>
                </xsl:otherwise>
            </xsl:choose>
        </fo:block>
    </xsl:template>

    <!-- Par défaut on ne fait rien et on passe à en dessous -->
    <xsl:template match="*">
        <xsl:apply-templates select="*"/>
    </xsl:template>

    <xsl:template match="xf:repeat" mode="#all">
        <xsl:param name="tree" as="node()" tunnel="yes"/>

        <!-- On  récupère l'identifiant du conteneur du Groupe et du type d'objet sur lequel on boucle ; la plupart du temps, les deux ont le même nom, sauf en cas de boucles liées -->
        <xsl:variable name="identifiantConteneurGroupe">
            <!--Avec ce premier test, on s'assure de mettre l'ID de la boucle dans la bonne forme pour rechercher au sein des "Groupe"
            Dans certains cas, le nom de la boucle est en effet suivi par l'ID à 8 caractères de la page-->
            <xsl:choose>
                <xsl:when test="matches(@id, '(.*)-[a-z0-9]{8}$')">
                    <!--                    <xsl:value-of select="replace(@id,concat('-',tokenize(@id,'-')[last()]),'')"/>-->
                    <xsl:value-of select="replace(@id, '(.*)-[a-z0-9]{8}$', '$1')"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="@id"/>
                </xsl:otherwise>
            </xsl:choose>
            <!--Au final, il est plus simple de juste prendre ce qu'il y a dans le bind -> NON cela engendre une régression sur les xf:repeat sans bind (typiquement ACTI)-->
            <!--<xsl:value-of select="substring-before(@bind,'-bind')"/>-->
        </xsl:variable>
        <xsl:variable name="identifiantGroupe">
            <xsl:choose>
                <xsl:when test="contains(@nodeset, 'idGroupe')">
                    <xsl:value-of
                        select="replace(substring-after(@nodeset, concat('Groupe[@idGroupe=''', $identifiantConteneurGroupe, ''']/Groupe[@typeGroupe=''')), '''\]', '')"
                    />
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$identifiantConteneurGroupe"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <!-- On récupère le contenu du repeat -->
        <xsl:variable name="enfants" select="*"/>
        <xsl:variable name="instance-groups">
            <xsl:value-of select="'//xf:instance[@id=''fr-form-instance'']'"/>
            <xsl:for-each select="$tree/Tree/*">
                <xsl:choose>
                    <xsl:when test="@id != ''">
                        <xsl:value-of
                            select="concat('//Groupe[@typeGroupe=''', name(), ''' and @idGroupe=''', @id, ''']')"
                        />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of
                            select="concat('//Groupe[@typeGroupe=''', name(), '''][', text(), ']')"
                        />
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
            <xsl:value-of
                select="concat('//Groupe[@idGroupe=''', $identifiantConteneurGroupe, ''']/Groupe[@typeGroupe=''', $identifiantGroupe, ''']')"/>
            <!--<xsl:value-of select="concat('//Groupe[@typeGroupe=''',$identifiantGroupe,''']')"/>-->
        </xsl:variable>
        <!-- Pour chaque Groupe -->
        <xsl:for-each select="saxon:evaluate($instance-groups)">
            <xsl:variable name="position" select="position()"/>
            <xsl:variable name="group-id" select="@idGroupe"/>
            <!-- On applique le template des enfants en passant ce groupe en paramètre -->
            <xsl:apply-templates select="$enfants" mode="#current">
                <xsl:with-param name="tree" as="node()" tunnel="yes">
                    <xsl:element name="Tree">
                        <xsl:copy-of select="$tree/Tree"/>
                        <xsl:element name="{$identifiantGroupe}">
                            <xsl:if test="$group-id">
                                <xsl:attribute name="id" select="$group-id"/>
                            </xsl:if>
                            <xsl:value-of select="$position"/>
                        </xsl:element>
                    </xsl:element>
                </xsl:with-param>
            </xsl:apply-templates>
        </xsl:for-each>
    </xsl:template>

    <!-- Marqueur des grandes parties -->
    <xsl:template match="fr:section">
        <xsl:param name="tree" as="node()" tunnel="yes"/>

        <!-- On récupère l'expression relevant -->
        <xsl:variable name="relevant" select="//xf:bind[@id = current()/@bind]/@relevant"/>
        <!-- On l'évalue -->
        <xsl:variable name="isRelevant" as="xs:boolean">
            <xsl:choose>
                <xsl:when test="$relevant != ''">
                    <xsl:variable name="relevant-value">
                        <xsl:call-template name="getFormulaToEvaluate">
                            <xsl:with-param name="formula" select="$relevant"/>
                            <xsl:with-param name="tree" select="$tree" as="node()"/>
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:choose>
                        <xsl:when
                            test="$relevant-value = '' or not($relevant-value) or $relevant-value = 'false'">
                            <xsl:value-of select="false()"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="true()"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="true()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:if test="$isRelevant">
            <fo:block font-family="{$style}" font-size="15pt" font-weight="bold" space-before="13px"
                break-after="page">
                <fo:inline color="{$couleurs/module/police/text()}"
                    background-color="{$couleurs/module/fond/text()}" padding="2px">
                    <xsl:call-template name="getLibelle">
                        <xsl:with-param name="nomControl" select="@id"/>
                        <xsl:with-param name="tree" select="$tree" as="node()"/>
                    </xsl:call-template>
                </fo:inline>
                <xsl:apply-templates select="*"/>
            </fo:block>
        </xsl:if>
    </xsl:template>

    <!-- Marqueur des sous-parties -->
    <xsl:template match="xhtml:div[@class = 'paragraphe' or @class = 'submodule']">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-weight="normal" font-size="13pt" space-before="6px">
            <fo:inline background-color="{$couleurs/paragraphe/text()}" padding="2px">
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl" select="xhtml:h3/xf:output/@id"/>
                    <xsl:with-param name="tree" select="$tree" as="node()"/>
                </xsl:call-template>
            </fo:inline>
            <xsl:apply-templates select="*[not(name() = 'xhtml:h3')]"/>
        </fo:block>
    </xsl:template>

    <!-- Marqueur des regroupements = sous-sous-parties : abandonnées depuis la mise en production de acemotrim -->
    <xsl:template match="xhtml:div[@class = 'regroupement']">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-size="12pt" space-before="6px">
            <xsl:call-template name="getLibelle">
                <xsl:with-param name="nomControl" select="xhtml:h4/xf:output/@id"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
            <xsl:apply-templates select="*[not(name() = 'xhtml:h4')]"/>
        </fo:block>
    </xsl:template>

    <!-- Le titre du questionnaire -->
    <xsl:template match="xf:output[@id = 'titre-formulaire']" priority="3">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <xsl:call-template name="getLibelle">
            <xsl:with-param name="nomControl" select="@id"/>
            <xsl:with-param name="tree" select="$tree" as="node()"/>
        </xsl:call-template>
    </xsl:template>

    <!-- On dégage tous les champs qui sont non relevant (regroupés dans des xf:group) -->
    <xsl:template match="xf:group" mode="#all">
        <xsl:param name="tree" tunnel="yes"/>

        <!-- On récupère l'expression relevant -->
        <xsl:variable name="relevant" select="//xf:bind[@id = current()/@bind]/@relevant"/>
        <!-- On l'évalue -->
        <xsl:variable name="isRelevant" as="xs:boolean">
            <xsl:choose>
                <xsl:when test="$relevant != ''">
                    <xsl:variable name="relevant-value">
                        <xsl:call-template name="getFormulaToEvaluate">
                            <xsl:with-param name="formula" select="$relevant"/>
                            <xsl:with-param name="tree" select="$tree" as="node()"/>
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:choose>
                        <xsl:when
                            test="$relevant-value = '' or not($relevant-value) or $relevant-value = 'false'">
                            <xsl:value-of select="false()"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="true()"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="true()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:if test="$isRelevant">
            <xsl:apply-templates select="*" mode="#current"/>
        </xsl:if>
        <!-- Pour l'export des variables, on met en commentaire tout ce qui précède et on sort cette ligne du commentaire -->
        <!--<xsl:apply-templates select="*"/>-->
    </xsl:template>

    <!-- On n'affiche rien pour les xf:output qui ne sont pas dans une table -->
    <xsl:template
        match="xf:output[not(xf:alert[@level = 'warning'] or ancestor::xhtml:table or ancestor::xhtml:div[@class = 'question'] or contains(@class, 'tableau') or contains(@class, 'Tableau') or contains(@class, 'multiple-choice-question') or contains(@class, '-grid'))]"
        priority="2"/>

    <!-- Permet l'affichage des données d'identification -->
    <xsl:template match="xf:output[parent::xhtml:div[@class = 'framePerso']]" priority="3">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" font-weight="normal">
            <xsl:call-template name="getLibelle">
                <xsl:with-param name="nomControl" select="@id"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </fo:block>
        <fo:block color="blue" font-weight="bold">
            <xsl:value-of
                select="//xf:instance[@id = 'donnees-pilotage']//*[name() = replace(current()/@id, '-control', '')]"
            />
        </fo:block>
    </xsl:template>

    <xsl:template match="xhtml:div[@class = 'framePerso']" priority="3">
        <xsl:apply-templates select="*"/>
    </xsl:template>

    <!-- Les textes qui ne correspondent pas à des warnings ni à une consigne -->
    <xsl:template
        match="xf:output[not(contains(@class, 'consigne')) and not(contains(@class, 'hint')) and not(xf:alert[@level = 'warning'])]">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" font-weight="normal">
            <xsl:if
                test="contains(@class, 'tableau') or contains(@class, 'Tableau') or contains(@class, 'multiple-choice-question') or contains(@class, '-grid')">
                <xsl:attribute name="start-indent" select="string('10px')"/>
            </xsl:if>
            <xsl:call-template name="getLibelle">
                <xsl:with-param name="nomControl" select="@id"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
            <xsl:call-template name="getResponse">
                <xsl:with-param name="nom"
                    select="concat('Variable[@idVariable=''', replace(@id, '-control', ''), ''']')"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </fo:block>

    </xsl:template>

    <!-- ceux qui ont un warning avec un avertissement -->
    <xsl:template match="xf:output[xf:alert[@level = 'warning']]" priority="2">
        <xsl:param name="tree" tunnel="yes"/>

        <!-- On récupère l'expression relevant -->
        <xsl:variable name="constraint"
            select="//xf:bind[@id = current()/@bind]/xf:constraint[@level = 'warning']/@value"/>
        <xsl:variable name="condition" as="xs:boolean">
            <xsl:choose>
                <xsl:when test="$constraint != ''">
                    <xsl:variable name="relevant-value">
                        <xsl:call-template name="getFormulaToEvaluate">
                            <xsl:with-param name="formula" select="$constraint"/>
                            <xsl:with-param name="tree" select="$tree" as="node()"/>
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:choose>
                        <xsl:when
                            test="$relevant-value = '' or not($relevant-value) or $relevant-value = 'false'">
                            <xsl:value-of select="false()"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="true()"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="true()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <!--        <xsl:message select="concat('constraint ',$constraint,' condition ',$condition)"></xsl:message>-->
        <xsl:if test="not($condition)">
            <xsl:variable name="nom" select="substring-before(@id, '-control')"/>
            <fo:block font-family="{$style}" font-size="10pt" color="#FF7A2F" space-before="6px">
                <xsl:apply-templates
                    select="//xf:instance[@id = 'fr-form-resources']/resources/resource[@xml:lang = 'fr']//*[name() = $nom]/alert/node()"
                />
            </fo:block>
        </xsl:if>
    </xsl:template>

    <!-- Ceux qui correspondent à une consigne -->
    <xsl:template
        match="xf:output[(contains(@class, 'consigne') or contains(@class, 'hint')) and not(xf:alert[@level = 'warning'])]">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-size="10pt" color="#3C5C7C" space-before="6px"
            font-weight="bold">
            <xsl:call-template name="getLibelle">
                <xsl:with-param name="nomControl" select="@id"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </fo:block>
    </xsl:template>

    <!-- Les champs -->
    <xsl:template match="xf:textarea | xf:input | fr:number | fr:date">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl" select="@id"/>
                    <xsl:with-param name="tree" select="$tree" as="node()"/>
                </xsl:call-template>
            </fo:block>
            <fo:block color="blue" font-weight="bold">
                <xsl:variable name="response">
                    <xsl:call-template name="getResponse">
                        <xsl:with-param name="nom"
                            select="concat('Variable[@idVariable=''', replace(@id, '-control', ''), ''']')"/>
                        <xsl:with-param name="tree" select="$tree" as="node()"/>
                    </xsl:call-template>
                </xsl:variable>
                <!--<xsl:value-of select="$response"/>-->
                <!-- ajout du séparateur de milliers -->
                <xsl:choose>
                    <xsl:when test="self::fr:date and string-length($response)=10">
                        <xsl:value-of select="concat(substring($response,9,2),'/',substring($response,6,2),'/',substring($response,1,4))"/>
                    </xsl:when>
                    <xsl:when test="self::fr:number">
                        <xsl:variable name="whole-part" as="xs:integer">
                            <xsl:choose>
                                <xsl:when test="contains($response, '.')">
                                    <xsl:value-of
                                        select="string-length(substring-before($response, '.'))"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="string-length($response)"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:variable>
                        <xsl:for-each select="1 to string-length($response)">
                            <xsl:variable name="position" select="position()"/>
                            <xsl:value-of select="substring($response, $position, 1)"/>
                            <xsl:if
                                test="($position &lt; $whole-part) and ((($whole-part - $position) mod 3) = 0)">
                                <xsl:text>&#160;</xsl:text>
                            </xsl:if>
                        </xsl:for-each>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="$response"/>
                    </xsl:otherwise>
                </xsl:choose>
                <!-- ancienne structure des nombres : xf:input est suivi d'un span/@class='suffixe' -->
                <xsl:if
                    test="following-sibling::*[position() = 1 and name() = 'xhtml:span' and @class = 'suffixe'] and not($response = '')">
                    <xsl:text> </xsl:text>
                    <xsl:value-of
                        select="following-sibling::xhtml:span[@class = 'suffixe'][1]/text()"/>
                    <xsl:text> </xsl:text>
                </xsl:if>
                <!-- nouvelle structure des nombres 10/2019 : fr:number a un attribut @suffix -->
                <xsl:if test="@suffix and not($response = '')">
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="@suffix"/>
                    <xsl:text> </xsl:text>
                </xsl:if>
            </fo:block>
        </fo:block>
    </xsl:template>

    <xsl:template match="xhtml:div[@class = 'question']">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <xsl:apply-templates select="*"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="xf:input[@class = 'duree' or @class = 'duration']">
        <xsl:param name="tree" as="node()" tunnel="yes"/>

        <fo:inline color="blue" font-weight="bold">
            <xsl:variable name="response">
                <xsl:call-template name="getResponse">
                    <xsl:with-param name="nom"
                        select="concat('Variable[@idVariable=''', replace(@id, '-control', ''), ''']')"/>
                    <xsl:with-param name="tree" select="$tree" as="node()"/>
                </xsl:call-template>
            </xsl:variable>
            <xsl:value-of select="$response"/>
            <!-- ancienne structure des durées : xf:input est suivi d'un span/@class='suffixe' ; transformé en span/@classs='suffix' pour le heures / minutes de fin -->
            <xsl:if
                test="following-sibling::*[position() = 1 and name() = 'xhtml:span' and (@class = 'suffixe' or @class = 'suffix')] and not($response = '')">
                <xsl:text> </xsl:text>
                <xsl:value-of
                    select="following-sibling::xhtml:span[@class = 'suffixe' or @class = 'suffix'][1]/text()"/>
                <xsl:text> </xsl:text>
            </xsl:if>
        </fo:inline>
    </xsl:template>

    <xsl:template match="xhtml:span[@class = 'suffixe']"/>
    <xsl:template match="xhtml:span[@class = 'suffix']"/>

    <xsl:template match="xf:select | xf:select1">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl" select="@id"/>
                    <xsl:with-param name="tree" select="$tree" as="node()"/>
                </xsl:call-template>
            </fo:block>
            <xsl:variable name="response-code">
                <xsl:call-template name="getResponse">
                    <xsl:with-param name="nom"
                        select="concat('Variable[@idVariable=''', replace(@id, '-control', ''), ''']')"/>
                    <xsl:with-param name="tree" select="$tree" as="node()"/>
                </xsl:call-template>
            </xsl:variable>
            <xsl:if test="$response-code/text() != ''">
                <fo:block color="blue" font-weight="bold">
                    <xsl:choose>
                        <!-- label avec balises xhtml -->
                        <xsl:when
                            test="
                                //xf:instance[@id = 'fr-form-resources']/resources/resource[@xml:lang = 'fr']//*[name() = replace(current()/@id, '-control', '')]
                                /item[child::value/text() = $response-code]/label/node()">
                            <xsl:apply-templates
                                select="
                                    //xf:instance[@id = 'fr-form-resources']/resources/resource[@xml:lang = 'fr']//*[name() = replace(current()/@id, '-control', '')]
                                    /item[child::value/text() = $response-code]/label/node()"
                            />
                        </xsl:when>
                        <!-- label sans balises xhtml -->
                        <xsl:when
                            test="
                                //xf:instance[@id = 'fr-form-resources']/resources/resource[@xml:lang = 'fr']//*[name() = replace(current()/@id, '-control', '')]
                                /item[child::value/text() = $response-code]/label/text() != ''">
                            <xsl:value-of
                                select="
                                    //xf:instance[@id = 'fr-form-resources']/resources/resource[@xml:lang = 'fr']//*[name() = replace(current()/@id, '-control', '')]
                                    /item[child::value/text() = $response-code]/label/text()"
                            />
                        </xsl:when>
                        <!-- pas de label -->
                        <xsl:otherwise>
                            <xsl:text>Coché</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                    <!-- Pour l'export des variables, on met en commentaire le choose qui précède et on sort cette ligne du commentaire -->
                    <!--<xsl:value-of select="$nom"/>-->
                </fo:block>
            </xsl:if>
        </fo:block>
    </xsl:template>

    <!-- réponse au format date -->
    <xsl:template
        match="xf:select1[contains(@id, '-layout-') and not(preceding-sibling::xf:select1[contains(@id, '-layout-')])]">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl" select="@id"/>
                    <xsl:with-param name="tree" select="$tree" as="node()"/>
                </xsl:call-template>
            </fo:block>
            <fo:block color="blue" font-weight="bold">
                <xsl:for-each select="../xf:select1[contains(@id, '-layout-')]">
                    <xsl:variable name="response-code">
                        <xsl:call-template name="getResponse">
                            <xsl:with-param name="nom" select="replace(@id, '-control', '')"/>
                            <xsl:with-param name="tree" select="$tree" as="node()"/>
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:if test="$response-code != ''">
                        <xsl:value-of
                            select="
                                //xf:instance[@id = 'fr-form-resources']/resources/resource[@xml:lang = 'fr']//*[name() = replace(current()/@id, '-control', '')]
                                /item[child::value/text() = $response-code]/label/text()"/>
                        <xsl:text> </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </fo:block>
        </fo:block>
    </xsl:template>
    <xsl:template
        match="xf:select1[contains(@id, '-layout-') and preceding-sibling::xf:select1[contains(@id, '-layout-')]]"/>

    <!-- réponse au format durée -->
    <!--    correction Athemane 03/2022 suite à bug sur Ecmoss
        <xsl:template match="fr:number[contains(@id, '-layout-') and not(preceding-sibling::fr:number)]">-->

    <xsl:template
        match="fr:number[contains(@id, '-layout-') and not(preceding-sibling::*[1][name() = 'fr:number'])]">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle">
                    <xsl:with-param name="nomControl" select="@id"/>
                    <xsl:with-param name="tree" select="$tree" as="node()"/>
                </xsl:call-template>
            </fo:block>
            <fo:block color="blue" font-weight="bold">
                <xsl:for-each select="../fr:number">
                    <xsl:variable name="response">
                        <xsl:call-template name="getResponse">
                            <xsl:with-param name="nom" select="replace(@id, '-control', '')"/>
                            <xsl:with-param name="tree" select="$tree" as="node()"/>
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:if test="$response != ''">
                        <xsl:value-of select="concat($response, ' ', @suffix, ' ')"/>
                    </xsl:if>
                </xsl:for-each>
            </fo:block>
        </fo:block>
    </xsl:template>
    <!--    correction Athemane 03/2022 suite à bug sur Ecmoss
        <xsl:template match="fr:number[contains(@id, '-layout-') and preceding-sibling::fr:number]"/>-->
    <xsl:template
        match="fr:number[contains(@id, '-layout-') and preceding-sibling::*[1][name() = 'fr:number']]"/>

    <xsl:template name="getLibelle">
        <xsl:param name="nomControl"/>
        <xsl:param name="tree" as="node()"/>

        <xsl:variable name="nom" select="replace($nomControl, '-control', '')"/>
        <xsl:choose>
            <xsl:when
                test="//xf:instance[@id = 'fr-form-resources']/resources/resource[@xml:lang = 'fr']//*[name() = $nom]/label/text() = 'custom label'">
                <xsl:apply-templates
                    select="//xf:bind[@id = 'fr-form-resources-bind']/xf:bind[@ref = 'resource[@xml:lang=''fr'']']//xf:bind[@id = concat($nom, '-resource-fr-bind-label')]">
                    <xsl:with-param name="tree" select="$tree" as="node()" tunnel="yes"/>
                </xsl:apply-templates>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates
                    select="//xf:instance[@id = 'fr-form-resources']/resources/resource[@xml:lang = 'fr']//*[name() = $nom]/label/node()">
                    <xsl:with-param name="tree" select="$tree" as="node()" tunnel="yes"/>
                </xsl:apply-templates>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="xf:bind[@id = 'fr-form-resources-bind']//xf:bind">
        <xsl:variable name="calculate"
            select="
                saxon:evaluate(replace(@calculate,
                '(instance\(''fr\-form\-instance''\))?//',
                '//xf:instance[@id=&quot;fr-form-instance&quot;]//'))"
            as="xs:string"/>
        <xsl:choose>
            <xsl:when test="contains($calculate, '>')">
                <xsl:apply-templates select="saxon:parse($calculate)/node()"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$calculate"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="getResponse">
        <xsl:param name="nom"/>
        <xsl:param name="tree" as="node()"/>

        <xsl:variable name="get-response-address">
            <xsl:value-of select="'//xf:instance[@id=''fr-form-instance'']'"/>
            <xsl:for-each select="$tree//*">
                <xsl:choose>
                    <xsl:when test="@id != ''">
                        <xsl:value-of
                            select="concat('//Groupe[@typeGroupe=''', name(), ''' and @idGroupe=''', @id, ''']')"
                        />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of
                            select="concat('//Groupe[@typeGroupe=''', name(), '''][', text(), ']')"
                        />
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
            <xsl:value-of select="concat('//', $nom)"/>
        </xsl:variable>
        <!--        <xsl:message select="$get-response-address"></xsl:message>-->
        <xsl:value-of select="saxon:evaluate($get-response-address)"/>
        <!-- Pour l'export des variables, on met en commentaire la ligne qui précède et on sort cette ligne du commentaire -->
        <!--<xsl:value-of select="$nom"/>-->
    </xsl:template>

    <!-- Traitement sur les balises xhtml à l'intérieur des labels dans la partie resource du xforms -->

    <xsl:template match="span[@id]" priority="-1">
        <fo:inline id="{@id}">
            <xsl:apply-templates select="node()"/>
        </fo:inline>
    </xsl:template>

    <xsl:template match="span[@class = 'gros']">
        <fo:inline font-size="20pt">
            <xsl:if test="@id">
                <xsl:attribute name="id" select="@id"/>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </fo:inline>
    </xsl:template>

    <xsl:template match="p">
        <fo:block>
            <xsl:if test="@id">
                <xsl:attribute name="id">
                    <xsl:value-of select="@id"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="span[@class = 'bloc aide' or @class = 'block help']" priority="2">
        <fo:block>
            <fo:inline text-decoration="underline">
                <xsl:if test="@id">
                    <xsl:attribute name="id" select="@id"/>
                </xsl:if>
                <xsl:apply-templates select="node()"/>
            </fo:inline>
        </fo:block>
    </xsl:template>

    <xsl:template match="span[contains(@class, 'bloc') or contains(@class, 'block')]">
        <fo:block>
            <xsl:if test="@id">
                <xsl:attribute name="id" select="@id"/>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="br">
        <fo:block/>
    </xsl:template>

    <xsl:template match="span[@style = 'text-decoration:underline']">
        <fo:inline text-decoration="underline">
            <xsl:if test="@id">
                <xsl:attribute name="id" select="@id"/>
            </xsl:if>
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
        <fo:basic-link text-decoration="underline">
            <xsl:choose>
                <xsl:when test="starts-with(@href, '#')">
                    <xsl:attribute name="internal-destination" select="replace(@href, '#', '')"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="external-destination" select="@href"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:apply-templates select="node()"/>
        </fo:basic-link>
    </xsl:template>

    <xsl:template match="span[contains(@class, 'aide') or contains(@class, 'help')]">
        <fo:inline text-decoration="underline">
            <xsl:if test="@id">   <xsl:attribute name="id" select="@id"/>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </fo:inline>
    </xsl:template>

    <!-- Pour les réponses au format image, on renvoie le libellé associé, qu'on cherche dans title si l'attribut existe, dans alt sinon -->
    <xsl:template match="img">
        <xsl:choose>
            <xsl:when test="@title">
                <xsl:value-of select="@title"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="@alt"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- On remplace la flêche par rien vu qu'elle s'affiche mal -->
    <xsl:template match="text()">
        <xsl:value-of select="replace(replace(., '&#x27A1; ', ''), '‑', '-')"/>
    </xsl:template>

    <!-- libellé personnalisé (hors boucle et tableau dynamique) -->
    <xsl:template match="text()[contains(., '¤')]">
        <xsl:param name="tree" as="node()" tunnel="yes"/>

        <xsl:variable name="libelle-initial" select="."/>
        <xsl:variable name="label-type"
            select="ancestor::*[name() = 'label' or name() = 'hint' or name() = 'alert' or name() = 'help'][1]/name()"/>
        <xsl:variable name="parent-name"
            select="ancestor::*[name() = 'label' or name() = 'hint' or name() = 'alert' or name() = 'help'][1]/parent::node()/name()"
            as="xs:string"/>
        <xsl:variable name="ref">
            <xsl:choose>
                <xsl:when test="$parent-name = 'item'">
                    <xsl:variable name="grandparent-name"
                        select="
                            ancestor::*[name() = 'label' or name() = 'hint' or name() = 'alert' or name() = 'help'][1]
                            /parent::node()/parent::node()/name()"
                        as="xs:string"/>
                    <xsl:value-of
                        select="
                            normalize-space(replace(saxon:evaluate(concat('//xf:itemset[@ref = ''$form-resources/', $grandparent-name, '/item'']/xf:', $label-type, '/@ref')),
                            '$form-resources',
                            '//xf:instance[@id=''fr-form-resources'']/resources/resource[1]'))"
                    />
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of
                        select="
                            normalize-space(replace(saxon:evaluate(concat('//*[@id = ''', $parent-name, '-control'']/xf:', $label-type, '/@ref')),
                            '$form-resources',
                            '//xf:instance[@id=''fr-form-resources'']/resources/resource[1]'))"
                    />
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <!-- analyse de la variable ref où on doublonne les apostrophes -->
        <xsl:variable name="ref-personnalise">
            <!-- On teste si elle est de la forme :
            début ; 1 ou plusieurs "replace(" ; 1 ou plusieurs caractères autres que la virgule ; 1 virgule ; 0 ou plusieurs caractères ; fin -->
            <xsl:analyze-string select="$ref" regex="^((replace\()+)([^,])+[,](.*)$">
                <xsl:matching-substring>
                    <!-- Les 4 regex-group sont :
                        1) 1 ou plusieurs "replace("
                        2) "replace("
                        3) 1 ou plusieurs caractères autres que la virgule
                        4) 0 ou plusieurs caractères -->
                    <xsl:value-of
                        select="concat(regex-group(1), '''', replace($libelle-initial, '''', ''''''), ''',', regex-group(4))"
                    />
                </xsl:matching-substring>
                <xsl:non-matching-substring>
                    <!-- cas censé ne jamais être utilisé et faire réagir à la recette -->
                    <xsl:value-of select="'Libellé personnalisé'"/>
                </xsl:non-matching-substring>
            </xsl:analyze-string>
        </xsl:variable>
        <xsl:call-template name="getFormulaToEvaluate">
            <xsl:with-param name="formula"
                select="replace(replace($ref-personnalise, '&#x27A1; ', ''), '‑', '-')"/>
            <xsl:with-param name="tree" select="$tree" as="node()"/>
        </xsl:call-template>
    </xsl:template>

    <!-- Les tables -->
    <xsl:template match="xhtml:table">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <xsl:apply-templates select="xhtml:thead | xhtml:tbody" mode="normal"/>
        </fo:table>
    </xsl:template>

    <xsl:template
        match="xhtml:table[contains(@class, 'tableauComplexe') or contains(@class, 'complex-grid')]">
        <fo:table table-layout="fixed" space-before="6px" border="1px solid black"
            text-align="center" start-indent="10px" width="100%">
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
            <xsl:apply-templates select="xhtml:tr | xf:repeat | xf:group" mode="#current"/>

        </fo:table-body>
    </xsl:template>
    <xsl:template match="xhtml:tr" mode="#all">
        <fo:table-row>
            <xsl:apply-templates select="xhtml:th | xhtml:td | xf:group" mode="#current"/>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="xhtml:td" mode="normal">
        <fo:table-cell width="13em" display-align="center" padding="2px">
            <xsl:if test="@rowspan">
                <xsl:attribute name="number-rows-spanned" select="@rowspan"/>
            </xsl:if>
            <xsl:if test="@colspan">
                <xsl:attribute name="number-columns-spanned" select="@colspan"/>
            </xsl:if>
            <fo:block font-size="10pt">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>
    <xsl:template match="xhtml:th" mode="normal">
        <fo:table-cell display-align="center" padding="2px" text-align="left">
            <xsl:if test="@rowspan">
                <xsl:attribute name="number-rows-spanned" select="@rowspan"/>
            </xsl:if>
            <xsl:if test="@colspan">
                <xsl:attribute name="number-columns-spanned" select="@colspan"/>
            </xsl:if>
            <fo:block font-size="10pt">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>

    <xsl:template match="xhtml:td | xhtml:th" mode="encadre">
        <fo:table-cell border="1px solid black" padding="1px" display-align="center">
            <xsl:if test="name() = 'xhtml:th' and ancestor::xhtml:tbody">
                <xsl:attribute name="text-align" select="'left'"/>
            </xsl:if>
            <xsl:if test="@rowspan">
                <xsl:attribute name="number-rows-spanned" select="@rowspan"/>
            </xsl:if>
            <xsl:if test="@colspan">
                <xsl:attribute name="number-columns-spanned" select="@colspan"/>
            </xsl:if>
            <fo:block font-size="10pt">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>

    <xsl:template name="getFormulaToEvaluate">
        <xsl:param name="formula"/>
        <xsl:param name="tree" as="node()"/>

        <xsl:choose>
            <xsl:when test="$tree//*">
                <xsl:variable name="ancestor" select="$tree//*[last()]/name()"/>
                <xsl:variable name="ancestor-id" select="$tree//*[last()]/@id"/>
                <xsl:variable name="ancestor-value" select="$tree//*[last()]/text()"/>
                <xsl:variable name="ancestor-tree">
                    <xsl:value-of select="'//xf:instance[@id=''fr-form-instance'']'"/>
                    <xsl:for-each select="$tree//*">
                        <xsl:choose>
                            <xsl:when test="@id != ''">
                                <xsl:value-of
                                    select="concat('//Groupe[@typeGroupe=''', name(), ''' and @idGroupe=''', @id, ''']')"
                                />
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of
                                    select="concat('//Groupe[@typeGroupe=''', name(), '''][', text(), ']')"
                                />
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:for-each>
                </xsl:variable>

                <!--                <xsl:message select="$ancestor-id"/>-->
                <xsl:variable name="new-formula"
                    select="
                        replace(replace(replace(replace(replace($formula,
                        concat('\$', $ancestor, '-position'),
                        $ancestor-value),
                        concat('Groupe\[@typeGroupe=''', $ancestor, ''' and @idGroupe = current\(\)/ancestor::Groupe\[@typeGroupe=''', $ancestor, '''\]/@idGroupe\]'),
                        concat('Groupe[@typeGroupe=''', $ancestor, ''' and @idGroupe=''', $ancestor-id, ''']')),
                        concat('Groupe\[@typeGroupe=''', $ancestor, '''\]\[@idGroupe = current\(\)/ancestor::Groupe\[@typeGroupe=''', $ancestor, '''\]/@idGroupe\]'),
                        concat('Groupe[@typeGroupe=''', $ancestor, '''][@idGroupe=''', $ancestor-id, ''']')),
                        concat('ancestor::Groupe\[@typeGroupe=''', $ancestor, '''\]'),
                        $ancestor-tree),
                        'instance\(''fr\-form\-instance''\)/stromae/util/CurrentLoopElement\[@loop\-name=''[a-zA-Z0-9_]*''\]',
                        concat('''', $ancestor-id, ''''))"/>
                <!--                fix Athémane 05/2022 : cas où le noms d'une boucle contient des minuscules (enquête MCRD) => remplacé [A-Z0-9_]* par [a-zA-Z0-9_]*-->
                <xsl:call-template name="getFormulaToEvaluate">
                    <xsl:with-param name="formula" select="$new-formula"/>
                    <xsl:with-param name="tree" as="node()">
                        <xsl:element name="Tree">
                            <xsl:copy-of select="$tree//*[not(last())]"/>
                        </xsl:element>
                    </xsl:with-param>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>

                <xsl:value-of
                    select="
                        saxon:evaluate(
                            replace(
                                replace(
                                    replace(
                                        replace(
                                            replace($formula,
                                            '//xf:instance\[@id=''fr-form-instance''\]//',
                                            '//'),
                                        'instance\(''fr\-form\-instance''\)/stromae/util/nomSectionCourante =',
                                        '''alwaystrue'' != '),
                                    'instance\(''fr\-form\-instance''\)//',
                                    '//'),
                                '([^\]])//',
                                '$1//xf:instance[@id=&quot;fr-form-instance&quot;]//'),
                            '^//',
                            '//xf:instance[@id=&quot;fr-form-instance&quot;]//')
                        )"
                />
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

</xsl:stylesheet>
