<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:fr="http://orbeon.org/oxf/xml/form-runner"
    xmlns:xf="http://www.w3.org/2002/xforms"
    xmlns:xxf="http://orbeon.org/oxf/xml/xforms"
    xmlns:saxon="http://saxon.sf.net/" exclude-result-prefixes="xs" version="2.0">

    <xsl:output name="output" method="xml" indent="yes"/>

    <xsl:template match="/">
        <xsl:apply-templates select="*"/>
    </xsl:template>

    <xsl:template match="node() | @*">
        <xsl:copy>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>

    <!-- We delete some elements that we don't want to see in output -->
    <xsl:template match="xf:case[parent::xf:switch[parent::fr:body] and child::fr:section[@name='ACCUEIL' or @name='VALIDATION' or @name='CONFIRMATION' or @name='FIN']]"/>
    <xsl:template match="xxf:dialog"/>
    <xsl:template match="fr:buttons"/>

    <!-- We reconstitute all the xml tags escaped in the resources part because we will need to process them afterwards -->
    <!-- These tags are surrounded by an unescaped tag to make sure that there is a root element -->
    <xsl:template match="text()[ancestor::xf:instance[@id='fr-form-resources'] and contains(.,'&lt;')]">
        <xsl:copy-of select="saxon:parse(concat('&lt;unescaped&gt;',replace(.,'&amp;','&amp;amp;'),'&lt;/unescaped&gt;'))" />
    </xsl:template>

</xsl:stylesheet>
