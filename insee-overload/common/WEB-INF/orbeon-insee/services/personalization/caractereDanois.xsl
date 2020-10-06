<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xf="http://www.w3.org/2002/xforms" version="2.0">
    
    <!-- VERRUE POUR CORRIGER LE SOUCI EN PROD SUR ACEMOTRIMT03 -->
    <!-- A SUPPRIMER QUAND ON ARRETE T03 (fin d'année 2016) -->
    <xsl:template priority="2"
        match="text()[contains(.,'&#248;C_MONN&#248;') and ancestor::resource[ancestor::xf:instance[@id='fr-form-resources']]]">
        <xsl:choose>
            <xsl:when test="//Variable[@idVariable='C_MONN']/text()='E'"><xsl:value-of select="replace(.,'&#248;C_MONN&#248;','(Euros)')"/></xsl:when>
            <xsl:when test="//Variable[@idVariable='C_MONN']/text()='G'"><xsl:value-of select="replace(.,'&#248;C_MONN&#248;','(milliers d''euros)')"/></xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="remplacement">
                    <xsl:with-param name="texte" select="."/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <!-- Pour les textes qui sont dans les ressources qui contiennent le caractère danois, on lance le template remplacement -->
    <xsl:template
        match="text()[contains(.,'&#248;') and ancestor::resource[ancestor::xf:instance[@id='fr-form-resources']]]">
        <xsl:call-template name="remplacement">
            <xsl:with-param name="texte" select="."/>
        </xsl:call-template>
    </xsl:template>
    
    <!-- Le template remplacement, ils récupèrent un nom de variable, il remplace la chaîne de texte par la valeur correspondante et continue jusqu'à ce qu'il n'y ait plus de variable -->
    <xsl:template name="remplacement">
        <xsl:param name="texte"/>
        <xsl:variable name="variable">
            <xsl:value-of select="substring-before(substring-after($texte,'&#248;'),'&#248;')"/>
        </xsl:variable>
        <xsl:variable name="valeur">
            <xsl:value-of select="//Variable[@idVariable=$variable]/text()"/>
        </xsl:variable>
        <xsl:variable name="resultat">
            <xsl:value-of select="replace($texte,concat('&#248;',$variable,'&#248;'),$valeur)"/>
        </xsl:variable>
        <xsl:choose>
            <xsl:when test="contains($resultat,'&#248;')">
                <xsl:call-template name="remplacement">
                    <xsl:with-param name="texte" select="$resultat"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="$resultat/text()"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>