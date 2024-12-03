<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fr="http://orbeon.org/oxf/xml/form-runner"
    xmlns:xf="http://www.w3.org/2002/xforms" xmlns:xxf="http://orbeon.org/oxf/xml/xforms"
    xmlns:saxon="http://saxon.sf.net/" xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:xhtml="http://www.w3.org/1999/xhtml" exclude-result-prefixes="xs" version="2.0">
    
    <!-- On importe la xsl commune à toutes les enquêtes -->
<!--              !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!A MODIFIER LORS DE LA LIVRAISON !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    <xsl:import href="common.xsl"/>-->
    <xsl:import href="common.xsl"/>
    
    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>
    
    <!-- optimisation de la largeur des colonnes des tableaux dynamiques ; largeurs identiques au questionnaire d'initialisation -->
    <xsl:template match="xhtml:table[descendant::xf:repeat]/xhtml:thead/xhtml:tr/xhtml:th" mode="encadre">
        <fo:table-cell border="1px solid black" padding="1px" display-align="center" number-rows-spanned="1" number-columns-spanned="1">
            <xsl:attribute name="width">
                <xsl:choose>
                    <xsl:when test="count(../xhtml:th)=5 and following-sibling::xhtml:th/following-sibling::xhtml:th">
                        <xsl:value-of select="'50mm'"/>
                    </xsl:when>
                    <xsl:when test="count(../xhtml:th)=5">
                        <xsl:value-of select="'40mm'"/>
                    </xsl:when>
                    <xsl:when test="count(../xhtml:th)=3 and not(preceding-sibling::xhtml:th)">
                        <xsl:value-of select="'205mm'"/>
                    </xsl:when>
                    <xsl:when test="not(preceding-sibling::xhtml:th)">
                        <xsl:value-of select="'165mm'"/>
                    </xsl:when>
                    <xsl:when test="not(preceding-sibling::xhtml:th/preceding-sibling::xhtml:th)">
                        <xsl:value-of select="'20mm'"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="'40mm'"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
            <fo:block font-size="10pt">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>
    
    
    
    <!-- Aligner à gauche les contenus des variables _LIB -->
    <xsl:template match="xhtml:td[not(preceding-sibling::xhtml:th) and not(preceding-sibling::xhtml:td)]" mode="encadre">
        <fo:table-cell border="1px solid black" padding="1px" display-align="center" text-align="left" number-rows-spanned="1" number-columns-spanned="1">
            <fo:block font-size="10pt">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>

    <!-- Gestion de l'expression relevant du _LIB collecté -->
    <xsl:template match="xf:textarea[ends-with(@id,'_LIB-control')]" priority="2">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        
        <!-- On récupère l'expression relevant -->
        <xsl:variable name="niveau">
            <xsl:call-template name="getResponse">
                <xsl:with-param name="nom" select="concat('Variable[@idVariable=''',replace(@id,'_LIB-control','_niveau'),''']')"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:if test="$niveau = ''">
            <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
                <fo:block color="blue" font-weight="bold">
                    <xsl:variable name="response">
                        <xsl:call-template name="getResponse">
                            <xsl:with-param name="nom" select="concat('Variable[@idVariable=''',replace(@id,'-control',''),''']')"/>
                            <xsl:with-param name="tree" select="$tree" as="node()"/>
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:value-of select="$response"/>
                </fo:block>
            </fo:block>
        </xsl:if>
    </xsl:template>

    <!-- Affichage du _CO du fichier de personnalisation : à supprimer -->
   <!-- <xsl:template match="xf:output[ends-with(@id,'_CO-control')]" priority="2">
        <xsl:param name="tree" as="node()" tunnel="yes"/>

        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" font-weight="normal">
            <xsl:call-template name="getResponse">
                <xsl:with-param name="nom" select="concat('Variable[@idVariable=''',replace(@id,'-control',''),''']')"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </fo:block>
    </xsl:template>
-->
    <!-- Affichage du libellé _LIB personnalisé par la variable _NIVEAU (avec gestion du filtre) -->

    <xsl:template match="span[contains(@class,'¤')]">
        <xsl:param name="tree" tunnel="yes" as="node()"/>
        
       <!-- 1) récupérer le nom de la variable entre ¤ : _niveau
        2) récupérer la valeur de cette variable correspondant à la ligne en cours : code0, intertitre2, etc.
        3) suivant la valeur, mettre les bons attributs au fo:inline-->

        <xsl:variable name="niveau_variable" select="replace(@class,'¤','')"/>
        
        <xsl:variable name="niveau_valeur">
            <xsl:call-template name="getResponse">
                <xsl:with-param name="nom" select="concat('Variable[@idVariable=''',$niveau_variable,''']')"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </xsl:variable>
        <!-- Si la donnée est préremplie, alors la variable _niveau prend une valeur -> on affiche -->
        <xsl:if test="$niveau_valeur != ''">
            <fo:block>
                <xsl:if test="$niveau_valeur='titre0' or $niveau_valeur='titre1' or $niveau_valeur='titre2'
                    or $niveau_valeur='intertitre0' or $niveau_valeur='intertitre1' or $niveau_valeur='intertitre2'">
                    <xsl:attribute name="font-weight" select="'bold'"/>
                </xsl:if>
                <xsl:if test="$niveau_valeur='ventilation0' or $niveau_valeur='ventilation1' or $niveau_valeur='ventilation2'
                    or $niveau_valeur='code0' or $niveau_valeur='code1' or $niveau_valeur='code2' or $niveau_valeur='code3'">
                    <xsl:attribute name="font-weight" select="'normal'"/>
                </xsl:if>
                <xsl:if test="$niveau_valeur='ventilation0' or $niveau_valeur='ventilation1' or $niveau_valeur='ventilation2'
                    or $niveau_valeur='intertitre0' or $niveau_valeur='intertitre1' or $niveau_valeur='intertitre2'">
                    <xsl:attribute name="font-style" select="'italic'"/>
                </xsl:if>
                <xsl:if test="$niveau_valeur='code1' or $niveau_valeur='titre1' or $niveau_valeur='intertitre1'
                    or $niveau_valeur='ventilation1'">
                    <xsl:attribute name="text-indent" select="'2mm'"/>
                </xsl:if>
                <xsl:if test="$niveau_valeur='code2' or $niveau_valeur='titre2' or $niveau_valeur='intertitre2'
                    or $niveau_valeur='ventilation2'">
                    <xsl:attribute name="text-indent" select="'4mm'"/>
                </xsl:if>
                <xsl:if test="$niveau_valeur='code3'">
                    <xsl:attribute name="text-indent" select="'6mm'"/>
                </xsl:if>
                <xsl:call-template name="getResponse">
                    <xsl:with-param name="nom" select="concat('Variable[@idVariable=''',replace($niveau_variable,'_niveau','_LIB'),''']')"/>
                    <xsl:with-param name="tree" select="$tree" as="node()"/>
                </xsl:call-template>
            </fo:block>            
        </xsl:if>
    </xsl:template>
    
   
</xsl:stylesheet>