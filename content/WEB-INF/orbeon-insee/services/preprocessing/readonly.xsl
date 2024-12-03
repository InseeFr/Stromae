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
    <xsl:template match="xf:send[@submission='enregistrer-deblocage']"/>
    <xsl:template match="xf:send[@submission='enregistrer']"/>
    <xsl:template match="xf:send[@submission='expedier']"/>
    <xsl:template match="xf:send[@submission='expedierPdf']"/>

    <!-- We pass the questionnaire to expedie=no to visualize it. -->
    <xsl:template match="//stromae/util/expedie">
        <expedie>non</expedie>
    </xsl:template>

    <!-- When changing pages, error messages are no longer displayed and the test for the presence of errors is suppressed. -->
    <xsl:template match="xf:action[@ev:event='ChangementPage']">
        <xsl:copy>
            <xsl:apply-templates select="@*"/>
            <xsl:copy-of select="xf:action[@iterate]"/>
            <xf:dispatch name="ChangementPageEffectif" targetid="fr-form-model"/>
            <xf:setvalue ref="instance('fr-form-util')/changementPageEffectue" value="string('true')"/>
        </xsl:copy>
    </xsl:template>

    <!-- Information about the status of the questionnaire is added. -->
    <xsl:template match="xhtml:div[@class=('barreFixe','progress-bar-container')]">
        <xsl:copy>
            <xsl:apply-templates select="node()| @*"/>
        </xsl:copy>
        <xhtml:div class="{@class}">
            <xsl:variable name="infos">
                <xsl:copy-of select="//form/stromae/util"/>
            </xsl:variable>
            <xsl:choose>
                <xsl:when test="not($infos/util/dateHeure/text())">
                    Ce questionnaire n'a jamais été enregistré.
                </xsl:when>
                <xsl:otherwise>
                    <xsl:choose>
                        <xsl:when test="$infos/util/expedie/text()='oui'">
                            <xsl:value-of select="concat('Ce questionnaire a été expédié le ',$infos/util/dateHeure,'.')"/>
                        </xsl:when>
                        <xsl:when test="$infos/util/expedie/text()='non'">
                            <xsl:value-of select="concat('Ce questionnaire a été enregistré le ',$infos/util/dateHeure,'.')"/>
                        </xsl:when>
                    </xsl:choose>
                </xsl:otherwise>
            </xsl:choose>
        </xhtml:div>
    </xsl:template>

</xsl:stylesheet>
