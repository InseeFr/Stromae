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
    
    <xsl:template match="xhtml:td[not(preceding-sibling::xhtml:th) and not(preceding-sibling::xhtml:td)]" mode="encadre">
        <fo:table-cell border="1px solid black" padding="1px" display-align="center" text-align="left" number-rows-spanned="1" number-columns-spanned="1">
            <fo:block font-size="10pt">
                <xsl:apply-templates select="*"/>
            </fo:block>
        </fo:table-cell>
    </xsl:template>

    <xsl:template match="xf:input[@id='REPARTITION_CA1-control']" priority="2">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        
        <xsl:variable name="code">
            <xsl:call-template name="getResponse">
                <xsl:with-param name="nom" select="'Variable[@idVariable=''REPARTITION_CA2'']'"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:if test="$code = ''">
            <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
                <fo:block color="blue" font-weight="bold">
                    <xsl:variable name="response">
                        <xsl:call-template name="getResponse">
                            <xsl:with-param name="nom" select="'Variable[@idVariable=''REPARTITION_CA1'']'"/>
                            <xsl:with-param name="tree" select="$tree" as="node()"/>
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:value-of select="$response"/>
                </fo:block>
            </fo:block>
        </xsl:if>
    </xsl:template>

    <xsl:template match="xf:output[@id='output-REPARTITION_CA1-control']" priority="2">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        
        <xsl:variable name="code">
            <xsl:call-template name="getResponse">
                <xsl:with-param name="nom" select="'Variable[@idVariable=''REPARTITION_CA2'']'"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:if test="$code != ''">
            <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
                <xsl:variable name="response">
                    <xsl:call-template name="getResponse">
                        <xsl:with-param name="nom" select="'Variable[@idVariable=''REPARTITION_CA1'']'"/>
                        <xsl:with-param name="tree" select="$tree" as="node()"/>
                    </xsl:call-template>
                </xsl:variable>
                <xsl:value-of select="$response"/>
            </fo:block>
        </xsl:if>
    </xsl:template>
    
 <!--   <xsl:template match="xf:output[@id='REPARTITION_CA2-control']" priority="2">
        <xsl:param name="tree" as="node()" tunnel="yes"/>
        
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" font-weight="normal">
            <xsl:call-template name="getResponse">
                <xsl:with-param name="nom" select="'Variable[@idVariable=''REPARTITION_CA2'']'"/>
                <xsl:with-param name="tree" select="$tree" as="node()"/>
            </xsl:call-template>
        </fo:block>
    </xsl:template>-->
   
    
</xsl:stylesheet>