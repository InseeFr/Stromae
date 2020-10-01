<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:xf="http://www.w3.org/2002/xforms" version="2.0">

    <xsl:param name="instance"/>
    <xsl:param name="informations"/>

    <xsl:template match="/">
        <xsl:apply-templates select="/xhtml:html"/>
    </xsl:template>

    <xsl:template match="node()|@*" mode="#all">
        <xsl:copy>
            <xsl:apply-templates select="node()|@*" mode="#current"/>
        </xsl:copy>
    </xsl:template>

    <!-- When the instance corresponding to the questionnaire data is found, it is replaced by the retrieved instance. -->
    <xsl:template match="form[parent::xf:instance[@id='fr-form-instance']]">
        <xsl:copy-of select="$instance"/>
    </xsl:template>

    <!-- When we find the instance corresponding to the Control data, we apply the templates of the recovered data, in order to perform some treatments -->
    <xsl:template match="InformationsQuestionnaire[parent::xf:instance[@id='donnees-pilotage']]">
        <xsl:apply-templates select="$informations" mode="pilotage"/>
    </xsl:template>

    <!-- DIFFERENT PROCESSING OF THE "PILOTAGE*" DATA -->

    <!-- On modifie la date de retour souhaitée -->
    <xsl:template match="DateRetourSouhaitee" mode="pilotage">
        <xsl:copy>
            <xsl:value-of select="concat(substring(text(),7,2),'/',substring(text(),5,2),'/',substring(text(),1,4))" />
        </xsl:copy>
    </xsl:template>

    <!-- Create an item to display the identification data displayed in the bar -->
    <xsl:template match="UniteEnquetee" mode="pilotage">
        <xsl:copy>
            <xsl:element name="BarreFixe"/>
            <xsl:apply-templates select="*"/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="label[parent::BarreFixe]">
        <xsl:variable name="UniteEnquetee">
            <xsl:copy-of select="$informations/InformationsQuestionnaire/UniteEnquetee"></xsl:copy-of>
        </xsl:variable>
        <label>
            <xsl:value-of select="concat(text(),$UniteEnquetee/UniteEnquetee/LabelUniteEnquetee,' : ',$UniteEnquetee/UniteEnquetee/Identifiant,' - ',$UniteEnquetee/UniteEnquetee/RaisonSociale)"/>
        </label>
    </xsl:template>

    <!-- We create the data that go well for the contact data -->
    <xsl:template match="Contact" mode="pilotage">
        <xsl:copy>
            <xsl:element name="Nom">
                <xsl:value-of select="normalize-space(concat(if (Civilite='2') then ('Monsieur') else (if (Civilite='3') then ('Madame') else ('')),' ',Prenom, ' ',Nom))" />
            </xsl:element>
            <xsl:element name="Mel">
                <xsl:value-of select="AdresseMessagerie"/>
            </xsl:element>
            <xsl:element name="Telephone">
                <xsl:value-of select="if(not(Telephone/text())) then(TelephonePortable/text()) else (Telephone/text())" />
            </xsl:element>
            <xsl:apply-templates select="Adresse" mode="pilotage"/>
        </xsl:copy>
    </xsl:template>

    <!-- We create the data that go well for the address data -->
    <xsl:template match="Adresse" mode="pilotage">
        <xsl:copy>
            <xsl:copy-of select="ComplementAdresse | MentionSpeciale | LibellePays"/>
            <xsl:element name="InformationsVoie">
                <xsl:value-of select="normalize-space(concat(NumeroVoie, ' ', IndiceRepetition, ' ', TypeVoie, ' ', LibelleVoie))" />
            </xsl:element>
            <xsl:element name="Ville">
                <xsl:value-of select="normalize-space(if(not(CodeCedex/text()) or not(LibelleCedex/text())) then (concat(CodePostal, ' ', LibelleCommune)) else (concat(CodeCedex, ' ', LibelleCedex)))" />
            </xsl:element>
        </xsl:copy>
    </xsl:template>

    <!-- Some elements are not copied -->
    <xsl:template match="Habilitations[parent::Contact]" mode="pilotage"/>
    <xsl:template match="MotDePasse[parent::Contact]" mode="pilotage"/>
    <xsl:template match="DerniereModification [parent::*]" mode="pilotage"/>

</xsl:stylesheet>
