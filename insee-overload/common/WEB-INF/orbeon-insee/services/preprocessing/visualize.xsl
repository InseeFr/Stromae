<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xf="http://www.w3.org/2002/xforms"
    xmlns:xxf="http://orbeon.org/oxf/xml/xforms"
    xmlns:ev="http://www.w3.org/2001/xml-events"
    xmlns:xhtml="http://www.w3.org/1999/xhtml" exclude-result-prefixes="xs" version="2.0">

    <xsl:output method="xml" encoding="UTF-8" indent="yes"/>
    <xsl:strip-space elements="*"/>

    <xsl:template match="/">
        <xsl:copy>
            <xsl:apply-templates select="*"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="node() | @*">
        <xsl:copy>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>

    <!-- The call to "post" methods is removed. -->
    <xsl:template match="xf:send[@submission='enregistrer']"/>
    <xsl:template match="xf:send[@submission='expedier']"/>
    <xsl:template match="xf:send[@submission='expedierPdf']"/>

    <!-- add missing attribute to xf:submission -->
    <xsl:template match="xf:submission[@id='enregistrer' or @id='expedier']">
        <xsl:copy>
            <xsl:copy-of select="@*"/>
            <xsl:attribute name="resource"/>
            <xsl:apply-templates/>
        </xsl:copy>
    </xsl:template>

</xsl:stylesheet>
