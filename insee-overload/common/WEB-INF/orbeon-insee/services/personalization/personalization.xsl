<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:xf="http://www.w3.org/2002/xforms" version="2.0">

    <!-- We import the xsl which allows to replace the danish character in the variables -->
    <xsl:include href="caractereDanois.xsl"/>

    <xsl:template match="/">
       <xsl:apply-templates select="/xhtml:html"/>
    </xsl:template>

    <xsl:template match="node()|@*">
        <xsl:copy>
            <xsl:apply-templates select="node()|@*"/>
        </xsl:copy>
    </xsl:template>

    <!-- In addition, both labels are modified to incorporate the date
    The priority is more important than what is done in the included xsl -->
    <xsl:template match="label[contains(text(),'&#248;DATE_RETOUR_SOUHAITEE&#248;') and ancestor::xf:instance[@id='fr-form-resources']]" priority="2">
        <xsl:copy>
            <xsl:if test="//xf:instance[@id='donnees-pilotage']//DateRetourSouhaitee/text()">
                <xsl:value-of select="replace(text(),'&#248;DATE_RETOUR_SOUHAITEE&#248;',//xf:instance[@id='donnees-pilotage']//DateRetourSouhaitee/text())" />
            </xsl:if>
        </xsl:copy>
    </xsl:template>

    <!-- And the labels to incorporate the type of unit -->
    <xsl:template match="label[contains(text(),'&#248;LabelUniteEnquetee&#248;') and ancestor::xf:instance[@id='fr-form-resources']]" priority="2">
        <xsl:copy>
            <xsl:variable name="valeur">
                <xsl:value-of select="//xf:instance[@id='donnees-pilotage']//UniteEnquetee/LabelUniteEnquetee/text()" />
            </xsl:variable>
            <xsl:value-of select="replace(text(),'&#248;LabelUniteEnquetee&#248;',$valeur)" />
        </xsl:copy>
    </xsl:template>
    
    <!-- Display of the logo according to the Source in Pilotage database  -->
    <xsl:template match="xhtml:img[parent::xhtml:div[contains(@class, 'container')]]">
        <xsl:copy>
            <xsl:choose>
                <xsl:when test="//xf:instance[@id = 'donnees-pilotage']//Logo/text() != ''">
                    <xsl:apply-templates select="@*[not(name() = 'src')]"/>
                    <xsl:attribute name="src"
                        select="concat('/img/',//xf:instance[@id = 'donnees-pilotage']//Logo/text())"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="@*"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:apply-templates select="node()"/>
        </xsl:copy>
    </xsl:template>

</xsl:stylesheet>
