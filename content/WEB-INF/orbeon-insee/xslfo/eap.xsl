<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fr="http://orbeon.org/oxf/xml/form-runner"
    xmlns:xf="http://www.w3.org/2002/xforms" xmlns:xxf="http://orbeon.org/oxf/xml/xforms"
    xmlns:saxon="http://saxon.sf.net/" xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:xhtml="http://www.w3.org/1999/xhtml" exclude-result-prefixes="xs" version="2.0">

    <!-- On importe la xsl commune à toutes les enquêtes -->
  
    <xsl:import href="common.xsl"/> 

    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>

    <!--GTDM EAP2021 ajout de la variable tree pour fr:section (sinon plantait à fr:number fils de fr:section-->
    <xsl:variable name="tree" as="node()">
        <xsl:element name="Tree"/>
    </xsl:variable>
    
    
    <xsl:template match="/">
        <!--<xsl:result-document href="{concat('opt/tomcat/webapps/','eapvoila.xml')}">
            <xsl:copy-of select="root()"/>
	    </xsl:result-document>-->
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
                    <xsl:apply-templates select="//(fr:section|xf:repeat)[parent::xf:case]">
                        <!--GTDM EAP2021 ajout de la variable tree pour fr:section (sinon plantait à fr:number fils de fr:section-->
                        <xsl:with-param name="tree" select="$tree" as="node()" tunnel="yes">
				    <!--<xsl:element name="Tree"></xsl:element>-->
	                    </xsl:with-param>
                    </xsl:apply-templates>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>

    <!-- Partie A00 -->

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-1-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="50%"/>
            <fo:table-column column-width="25%"/>
            <xsl:apply-templates select="xhtml:thead | xhtml:tbody" mode="normal"/>
        </fo:table>
    </xsl:template>

    <xsl:template match="unescaped[ancestor::INSEE-EAP-QG-1-1]" priority="4">
        <xsl:apply-templates select="node()" mode="eap"/>
    </xsl:template>

    <xsl:template match="unescaped[ancestor::INSEE-EAP-QG-2-4]" priority="4">
        <xsl:apply-templates select="node()" mode="eap"/>
    </xsl:template>


    <!-- Partie A01 -->

    <xsl:template name="getLibelleEAP">
        <xsl:param name="nomControl"/>
        <xsl:variable name="nom" select="replace($nomControl,'-control','')"/>
        <xsl:apply-templates
            select="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/label/node()"
            mode="eap"/>
    </xsl:template>

    <xsl:template match="xf:select[@id='MS0-control']" priority="3">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelleEAP">
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

    <xsl:template match="unescaped[ancestor::INSEE-EAP-QG-2-2]" priority="4">
        <xsl:apply-templates select="node()" mode="eap"/>
    </xsl:template>

    <xsl:template match="unescaped[ancestor::CE7]" priority="4">
        <xsl:apply-templates select="node()" mode="eap"/>
    </xsl:template>


    <!--    <xsl:template match="xf:output[@id='INSEE-EAP-QG-1-1-control']" priority="3">
        <xsl:call-template name="getLibelle">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>-->

    <!--    <xsl:template match="xf:output[@bind='INSEE-EAP-QG-5-1-INSEE-EAP-CL-PRODUC-10-entete-1-bind']" priority="2">
        <xsl:value-of select="xf:label"/>            
    </xsl:template>-->

    <!-- Partie B01 -->

    <xsl:template match="unescaped[ancestor::CE9]" priority="4">
        <xsl:apply-templates select="node()" mode="eap"/>
    </xsl:template>


    <!-- Partie B00 -->

    <xsl:template match="xf:output[@id='INSEE-EAP-QG-4-2-INSEE-EAP-CL-CL-EAP-10-6b-control']"
        priority="3">
        <!--<xsl:call-template name="getLibelle">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>-->
        <xsl:value-of
            select="replace(concat('L''écart entre le CA total et sa répartition est de : ',
            number(if (//xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CV1']='') then 0 else //xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CV1'])-
            (number(if (//xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP1']='') then 0 else //xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP1'])+
            number(if (//xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP2']='') then 0 else //xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP2'])+ 
            number(if (//xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP3']='') then 0 else //xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP3'])+ 
            number(if (//xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP5']='') then 0 else //xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP5'])+ 
            number(if (//xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP4']='') then 0 else //xf:instance[@id='fr-form-instance']//INSEE-EAP-SEQ-4/Variable[@idVariable='CP4'])) 
            ,' k€'),'NaN','Erreur')"
        />
    </xsl:template>

    <xsl:template match="unescaped[ancestor::CE0]" priority="4">
        <xsl:apply-templates select="node()" mode="eap"/>
    </xsl:template>

    <!-- Partie C00 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-5-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_C00'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-5-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="11%"/>
            <fo:table-column column-width="11%"/>
            <fo:table-column column-width="11%"/>
            <fo:table-column column-width="11%"/>
            <fo:table-column column-width="11%"/>
            <fo:table-column column-width="11%"/>
            <fo:table-column column-width="11%"/>
            <fo:table-column column-width="11%"/>
            <fo:table-column column-width="11%"/>
            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_C00']"
                    mode="instance"/>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="xf:output[@id='INSEE-EAP-QG-5-1-INSEE-EAP-CL-PRODUC-10-entete-1-control']"
        priority="3">
        <!-- GTDM : suite à évolution de la common : on veut continuer à utiliser l'ancien template getLibelle
       qu'on renomme dans eap.xsl getLibelle2-->
        <!--<xsl:call-template name="getLibelle">-->
        <xsl:call-template name="getLibelle2">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="xf:output[@bind='INSEE-EAP-QG-5-1-INSEE-EAP-CL-PRODUC-10-entete-1-bind']" 
        priority="2">
        <xsl:value-of select="xf:label"/>
    </xsl:template>
      

    <xsl:template match="Groupe[@typeGroupe='CPF45_C00']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="8">
                <fo:block font-size="10pt">
                    <xsl:value-of select="Libelle"/>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <xsl:apply-templates
            select="Groupe[not(Variable[@idVariable='LibellePseudoProduit']) and 
            (Variable[@idVariable='actif']='1' 
            or Variable[@idVariable='VT1']!='' or Variable[@idVariable='VS1']!='' or Variable[@idVariable='VS2']!='' 
            or Variable[@idVariable='VF1']!='' or Variable[@idVariable='VF2']!='' or Variable[@idVariable='VF3']!='' or Variable[@idVariable='VQ1']!='')]"
            mode="instance"/>
        <xsl:apply-templates select="Groupe[Variable[@idVariable='LibellePseudoProduit']]"
            mode="instance"/>
        <fo:table-row>
            <fo:table-cell>
                <fo:block/>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_C00']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="8">
                <fo:block font-size="10pt">
                    <fo:inline>
                        <xsl:value-of select="Libelle"/>
                    </fo:inline>
                    <xsl:if test="Variable[@idVariable='LibellePseudoProduit']/text()">
                        <fo:inline>
                            <xsl:text> : </xsl:text>
                        </fo:inline>
                        <fo:inline color="blue" font-weight="bold">
                            <xsl:value-of select="Variable[@idVariable='LibellePseudoProduit']"/>
                        </fo:inline>
                    </xsl:if>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="2">
                <fo:block font-size="10pt">
                    <xsl:value-of
                        select="replace(Variable[@idVariable='TotalPourcentProduit']/text(),'&#146;','''')"
                    />
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VT1']/text()"/>
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VS1']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VS2']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VF1']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VF2']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VF3']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VQ1']/text()"/>
                <xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='VQ1']/@unite]/LibelleUniteCourt"
                />
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>


    <!-- C01 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-6-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_C01'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-6-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="80%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="20%"/>

            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_C01']"
                    mode="instance"/>
                <fo:table-row>
                    <fo:table-cell>
                        <fo:block/>
                    </fo:table-cell>
                </fo:table-row>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_C01']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="6">
                <fo:block font-size="10pt">
                    <xsl:value-of select="concat(@idGroupe,' - ',Libelle)"/>
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VQ3']/text()"/>
                <xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='VQ3']/@unite]/LibelleUniteCourt"
                />
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>

    <!-- C02 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-7-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_C02'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-7-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="60%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="20%"/>
            <fo:table-column column-width="20%"/>
            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_C02']"
                    mode="instance"/>
                <fo:table-row>
                    <fo:table-cell>
                        <fo:block/>
                    </fo:table-cell>
                </fo:table-row>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_C02']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="6">
                <fo:block font-size="10pt">
                    <xsl:value-of select="concat(@idGroupe,' - ',Libelle)"/>
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VV1']/text()"/>
                <!--<xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='VV1']/@unite]/LibelleUniteCourt"
                />-->
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VT2']/text()"/>
                <!--<xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='VT2']/@unite]/LibelleUniteCourt"
                />-->
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>

    <!-- D00 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-8-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_D00'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-8-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="15%"/>
            <fo:table-column column-width="45%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_D00']"
                    mode="instance"/>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='CPF45_D00']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="5">
                <fo:block font-size="10pt">
                    <xsl:value-of select="Libelle"/>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <xsl:apply-templates
            select="Groupe[not(Variable[@idVariable='LibellePseudoProduit']) and 
            (Variable[@idVariable='actif']='1' 
            or Variable[@idVariable='IT1']!='' 
            or Variable[@idVariable='IR1']!='' or Variable[@idVariable='IR2']!='' or Variable[@idVariable='IR3']!='')]"
            mode="instance"/>
        <xsl:apply-templates select="Groupe[Variable[@idVariable='LibellePseudoProduit']]"
            mode="instance"/>
        <fo:table-row>
            <fo:table-cell>
                <fo:block/>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_D00']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="5">
                <fo:block font-size="10pt">
                    <fo:inline>
                        <xsl:value-of select="Libelle"/>
                    </fo:inline>
                    <xsl:if test="Variable[@idVariable='LibellePseudoProduit']/text()">
                        <fo:inline>
                            <xsl:text> : </xsl:text>
                        </fo:inline>
                        <fo:inline color="blue" font-weight="bold">
                            <xsl:value-of select="Variable[@idVariable='LibellePseudoProduit']"/>
                        </fo:inline>
                    </xsl:if>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="2">
                <fo:block font-size="10pt">
                    <xsl:value-of
                        select="replace(Variable[@idVariable='TotalPourcentProduit']/text(),'&#146;','''')"
                    />
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='IT1']/text()"/>
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='IR1']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='IR2']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='IR3']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>

   
        <!-- GTDM : suite à évolution de la common : 
            - on veut continuer à utiliser l'ancien template getLibelle
       qu'on renomme dans eap.xsl getLibelle2        -->

    <xsl:template match="xf:output[@id='INSEE-EAP-QG-8-1-INSEE-EAP-CL-PRODUC-10-entete-1-control']" priority="3">
        <xsl:call-template name="getLibelle2">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>


    <xsl:template match="xf:output[@bind='INSEE-EAP-QG-8-1-INSEE-EAP-CL-PRODUC-10-entete-1-bind']"
        priority="2">
        <xsl:value-of select="xf:label"/>
    </xsl:template>
    
    
    <!-- E00 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-9-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_E00'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-9-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="15%"/>
            <fo:table-column column-width="45%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_E00']"
                    mode="instance"/>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='CPF45_E00']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="5">
                <fo:block font-size="10pt">
                    <xsl:value-of select="Libelle"/>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <xsl:apply-templates
            select="Groupe[not(Variable[@idVariable='LibellePseudoProduit']) and 
            (Variable[@idVariable='actif']='1' 
            or Variable[@idVariable='RT1']!='' 
            or Variable[@idVariable='RR1']!='' or Variable[@idVariable='RR2']!='' or Variable[@idVariable='RR3']!='')]"
            mode="instance"/>
        <xsl:apply-templates select="Groupe[Variable[@idVariable='LibellePseudoProduit']]"
            mode="instance"/>
        <fo:table-row>
            <fo:table-cell>
                <fo:block/>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_E00']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="5">
                <fo:block font-size="10pt">
                    <fo:inline>
                        <xsl:value-of select="Libelle"/>
                    </fo:inline>
                    <xsl:if test="Variable[@idVariable='LibellePseudoProduit']/text()">
                        <fo:inline>
                            <xsl:text> : </xsl:text>
                        </fo:inline>
                        <fo:inline color="blue" font-weight="bold">
                            <xsl:value-of select="Variable[@idVariable='LibellePseudoProduit']"/>
                        </fo:inline>
                    </xsl:if>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="2">
                <fo:block font-size="10pt">
                    <xsl:value-of
                        select="replace(Variable[@idVariable='TotalPourcentProduit']/text(),'&#146;','''')"
                    />
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='RT1']/text()"/>
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='RR1']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='RR2']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='RR3']/text()"/>
                <xsl:with-param name="unite" select="'%'"/>
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="xf:output[@id='INSEE-EAP-QG-9-1-INSEE-EAP-CL-PRODUC-10-entete-1-control']"
        priority="3">
        <!-- GTDM : suite à évolution de la common : on veut continuer à utiliser l'ancien template getLibelle
       qu'on renomme dans eap.xsl getLibelle2-->
<!--        <xsl:call-template name="getLibelle">-->
            <xsl:call-template name="getLibelle2">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="xf:output[@bind='INSEE-EAP-QG-9-1-INSEE-EAP-CL-PRODUC-10-entete-1-bind']"
        priority="2">
        <xsl:value-of select="xf:label"/>
    </xsl:template>

    <!-- I00 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-10-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_I00'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-10-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="20%"/>
            <fo:table-column column-width="60%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_I00']"
                    mode="instance"/>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='CPF45_I00']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="3">
                <fo:block font-size="10pt">
                    <xsl:value-of select="Libelle"/>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>



        <xsl:apply-templates
            select="Groupe[not(Variable[@idVariable='Reliquat']) and not(Variable[@idVariable='LibellePseudoProduit']) and 
            (Variable[@idVariable='actif']='1' 
            or Variable[@idVariable='VG1']!='' 
            or Variable[@idVariable='VQ2']!='')]"
            mode="instance"/>
        <xsl:apply-templates
            select="Groupe[not(Variable[@idVariable='Reliquat']) and Variable[@idVariable='LibellePseudoProduit'] and 
            (Variable[@idVariable='actif']='1' 
            or Variable[@idVariable='VG1']!='' 
            or Variable[@idVariable='VQ2']!='')]"
            mode="instance"/>
        <xsl:apply-templates select="Groupe[Variable[@idVariable='Reliquat']]" mode="instance"/>
        <fo:table-row>
            <fo:table-cell>
                <fo:block/>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template
        match="Groupe[@typeGroupe='EAP_Produit_I00'][not(Variable[@idVariable='Reliquat'])]"
        mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <fo:inline>
                        <xsl:value-of select="Libelle"/>
                    </fo:inline>
                    <xsl:if test="Variable[@idVariable='LibellePseudoProduit']/text()">
                        <fo:inline>
                            <xsl:text> : </xsl:text>
                        </fo:inline>
                        <fo:inline color="blue" font-weight="bold">
                            <xsl:value-of select="Variable[@idVariable='LibellePseudoProduit']"/>
                        </fo:inline>
                    </xsl:if>
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VG1']/text()"/>
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VQ2']/text()"/>
                <xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='VQ2']/@unite]/LibelleUniteCourt"
                />
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_I00'][Variable[@idVariable='Reliquat']]"
        mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <xsl:value-of select="@idGroupe"/>
                </fo:block>
            </fo:table-cell>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="1">
                <fo:block font-size="10pt">
                    <fo:inline>
                        <xsl:value-of select="Libelle"/>
                    </fo:inline>
                    <xsl:if test="Variable[@idVariable='LibellePseudoProduit']/text()">
                        <fo:inline>
                            <xsl:text> : </xsl:text>
                        </fo:inline>
                        <fo:inline color="blue" font-weight="bold">
                            <xsl:value-of select="Variable[@idVariable='LibellePseudoProduit']"/>
                        </fo:inline>
                    </xsl:if>
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VG1']/text()"/>
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VQ2']/text()"/>
                <xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='VQ2']/@unite]/LibelleUniteCourt"
                />
            </xsl:call-template>
        </fo:table-row>
        <!--ici-->
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="4">
                <fo:block font-size="10pt">
                    <xsl:value-of
                        select="replace(Variable[@idVariable='TotalPourcentProduit']/text(),'&#146;','''')"
                    />
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <!--ala-->
    </xsl:template>

    <xsl:template match="xf:output[@id='INSEE-EAP-QG-10-1-INSEE-EAP-CL-PRODUC-10-entete-1-control']"
        priority="3">
        <!-- GTDM : suite à évolution de la common : on veut continuer à utiliser l'ancien template getLibelle
       qu'on renomme dans eap.xsl getLibelle2-->
<!--        <xsl:call-template name="getLibelle">-->
            <xsl:call-template name="getLibelle2">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="xf:output[@id='INSEE-EAP-QG-10-1-INSEE-EAP-CL-PRODUC-1300-1-control']"
        priority="3">
        <!-- GTDM : suite à évolution de la common : on veut continuer à utiliser l'ancien template getLibelle
       qu'on renomme dans eap.xsl getLibelle2-->
        <!--<xsl:call-template name="getLibelle">-->
        <xsl:call-template name="getLibelle2">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="xf:output[@bind='INSEE-EAP-QG-10-1-INSEE-EAP-CL-PRODUC-10-entete-1-bind']"
        priority="2">
        <xsl:value-of select="xf:label"/>
    </xsl:template>

    <!-- F00 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-11-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_F00'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-11-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="90%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="0%"/>
            <fo:table-column column-width="10%"/>
            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_F00'][not(Variable[@idVariable='Reliquat'])]"
                    mode="instance"/>
                <fo:table-row>
                    <fo:table-cell>
                        <fo:block/>
                    </fo:table-cell>
                </fo:table-row>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_F00'][Variable[@idVariable='Reliquat']]"
                    mode="instance"/>
                <fo:table-row>
                    <fo:table-cell>
                        <fo:block/>
                    </fo:table-cell>
                </fo:table-row>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template
        match="Groupe[@typeGroupe='EAP_Produit_F00'][not(Variable[@idVariable='Reliquat'])]"
        mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="6">
                <fo:block font-size="10pt">
                    <xsl:value-of select="concat(@idGroupe,' - ',Libelle)"/>
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VH1']/text()"/>
                <!--<xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='VH1']/@unite]/LibelleUniteCourt"
                />-->
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_F00'][Variable[@idVariable='Reliquat']]"
        mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="6">
                <fo:block font-size="10pt">
                    <xsl:value-of
                        select="concat(@idGroupe,' - ',Libelle, ' : ',Variable[@idVariable='LibellePseudoProduit'])"
                    />
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='VH1']/text()"/>
                <!--<xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='VH1']/@unite]/LibelleUniteCourt"
                />-->
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
        </fo:table-row>
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="7">
                <fo:block font-size="10pt">
                    <xsl:value-of
                        select="replace(Variable[@idVariable='TotalPourcentProduit']/text(),'&#146;','''')"
                    />
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <!-- G06 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-12-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_G06'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-12-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="20%"/>
            <fo:table-column column-width="60%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_G06']"
                    mode="instance"/>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='CPF45_G06']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="3">
                <fo:block font-size="10pt">
                    <xsl:value-of select="concat(@idGroupe,' - ',Libelle)"/>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <xsl:apply-templates select="Groupe" mode="instance"/>
        <fo:table-row>
            <fo:table-cell>
                <fo:block/>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_G06']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="2">
                <fo:block font-size="10pt">
                    <xsl:value-of select="concat(@idGroupe,' - ',Libelle)"/>
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='MA1']/text()"/>
                <!--<xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='MA1']/@unite]/LibelleUniteCourt"
                />-->
                <xsl:with-param name="unite" select="'k€'"/>
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>

    <!-- G07 -->

    <xsl:template
        match="fr:section[@id='INSEE-EAP-SEQ-13-control'][not(//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='EAP_Produit_G07'])]"/>

    <xsl:template match="xhtml:table[@name='INSEE-EAP-QG-13-1']" priority="3">
        <fo:table table-layout="fixed" width="100%" space-before="6px" start-indent="10px">
            <fo:table-column column-width="20%"/>
            <fo:table-column column-width="60%"/>
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="10%"/>
            <xsl:apply-templates select="xhtml:thead" mode="encadre"/>
            <fo:table-body>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-instance']//Groupe[@typeGroupe='CPF45_G07']"
                    mode="instance"/>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='CPF45_G07']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="3">
                <fo:block font-size="10pt">
                    <xsl:value-of select="concat(@idGroupe,' - ',Libelle)"/>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <xsl:apply-templates select="Groupe" mode="instance"/>
        <fo:table-row>
            <fo:table-cell>
                <fo:block/>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EAP_Produit_G07']" mode="instance">
        <fo:table-row>
            <fo:table-cell border="1px solid black" display-align="center" padding="1px"
                number-columns-spanned="2">
                <fo:block font-size="10pt">
                    <xsl:value-of select="concat(@idGroupe,' - ',Libelle)"/>
                </fo:block>
            </fo:table-cell>
            <xsl:call-template name="case_instance">
                <xsl:with-param name="variable" select="Variable[@idVariable='CM1']/text()"/>
                <!--<xsl:with-param name="unite"
                    select="//xf:instance[@id='eap-util']//Unite[@idUnite=current()/Variable[@idVariable='CM1']/@unite]/LibelleUniteCourt"
                />-->
                <xsl:with-param name="unite" select="'tonnes'"/>
            </xsl:call-template>
        </fo:table-row>
    </xsl:template>


    <xsl:template name="case_instance">
        <xsl:param name="variable"/>
        <xsl:param name="unite"/>

        <fo:table-cell border="1px solid black" display-align="center" padding="1px"
            number-columns-spanned="1">
            <fo:block font-size="10pt">
                <xsl:if test="$variable!=''">
                    <fo:inline color="blue" font-weight="bold">
                        <xsl:value-of select="$variable"/>
                        <xsl:text> </xsl:text>
                    </fo:inline>
                    <fo:inline>
                        <xsl:value-of select="$unite"/>
                    </fo:inline>
                </xsl:if>
            </fo:block>
        </fo:table-cell>
    </xsl:template>

    <xsl:template match="xf:output[@value='']" priority="3">
        <xsl:value-of select="xf:label/@ref"/>
    </xsl:template>


    <!-- On fait disparaître les messages d'aide au remplissage -->
    <xsl:template match="xf:output[@class='aide15']" priority="3"/>
    

    <!-- On a parsé un libellé pour récupérer son contenu -->
    <xsl:template match="unescaped" mode="eap">
        <xsl:apply-templates select="node()" mode="eap"/>
    </xsl:template>



    <!-- Pour l'instant, s'il y a une balise à l'intérieur d'unescaped, c'est toujours p -->
    <xsl:template match="p[parent::unescaped]" mode="eap">
        <xsl:apply-templates select="node()" mode="eap"/>
    </xsl:template>

    <xsl:template match="br[parent::unescaped]" mode="eap">
        <fo:block/>
    </xsl:template>

    <!-- Et s'il y a une balise à l'intérieur de la balise p, c'est la balise br -->
    <xsl:template match="br[parent::p]" mode="eap">
        <xsl:text>&#160;</xsl:text>
    </xsl:template>

    <xsl:template match="text()" mode="eap">
        <xsl:value-of select="replace(.,'&#x27A1;','')"/>
        <!--<xsl:value-of select="."></xsl:value-of>-->
    </xsl:template>
    
    <!--    ajout GTDM pour surcharger common.xsl gérant les boucles-->
    <!--    recopie de bouts de la common au 30/11/2018 qui marchent pour EMB :
        1/le template getLibelle a été modifié dans la nouvelle common => 
            - on renomme l'ancienne getLibelle2
            - on réécrit les templates qui font appel à getLibelle en appelant désormais getLibelle2       
        2/les templates nommés getReponse et getLabelReponse n'existent plus dans la nouvelle common => on les récupère
    )-->
    <xsl:template name="getLibelle2">
        <xsl:param name="nomControl"/>
        <xsl:variable name="nom" select="replace($nomControl,'-control','')"/>
        <xsl:choose>
            <xsl:when test="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/label/text()='custom label'">
                <xsl:apply-templates
                    select="//xf:bind[@id='fr-form-resources-bind']/xf:bind[@ref='resource[@xml:lang=''fr'']']//xf:bind[@id=concat($nom,'-resource-fr-bind-label')]"
                />
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates
                    select="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/label/node()"
                />
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <!-- Marqueur des grandes parties -->
    <xsl:template match="fr:section">
        <fo:block font-family="{$style}" font-size="15pt" font-weight="bold" space-before="13px"
            break-after="page">
            <fo:inline color="{$couleurs/module/police/text()}"
                background-color="{$couleurs/module/fond/text()}" padding="2px">
                <xsl:call-template name="getLibelle2">
                    <xsl:with-param name="nomControl" select="@id"/>
                </xsl:call-template>
            </fo:inline>
            <xsl:apply-templates select="*"/>
        </fo:block>
    </xsl:template>
    
    
    
    <!-- Marqueur des sous-parties -->
    <xsl:template match="xhtml:div[@class='paragraphe']">
        <fo:block font-family="{$style}" font-weight="normal" font-size="13pt" space-before="6px">
            <fo:inline background-color="{$couleurs/paragraphe/text()}" padding="2px">
                <xsl:call-template name="getLibelle2">
                    <xsl:with-param name="nomControl">
                        <xsl:value-of select="xhtml:h3/xf:output/@id"/>
                    </xsl:with-param>
                </xsl:call-template>
            </fo:inline>
            <xsl:apply-templates select="*[not(name()='xhtml:h3')]"/>
        </fo:block>
    </xsl:template>
    
    <!-- Marqueur des regroupements -->
    <xsl:template match="xhtml:div[@class='regroupement']">
        <fo:block font-family="{$style}" font-size="12pt" space-before="6px">
            <xsl:call-template name="getLibelle2">
                <xsl:with-param name="nomControl">
                    <xsl:value-of select="xhtml:h4/xf:output/@id"/>
                </xsl:with-param>
            </xsl:call-template>
            <xsl:apply-templates select="*[not(name()='xhtml:h4')]"/>
        </fo:block>
    </xsl:template>
    
    <!-- Le titre du questionnaire -->
    <xsl:template match="xf:output[@id='titre-formulaire']" priority="3">
        <xsl:call-template name="getLibelle2">
            <xsl:with-param name="nomControl">
                <xsl:value-of select="@id"/>
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>
    
    <!-- Permet l'affichage des données d'identification -->
    <xsl:template match="xf:output[parent::xhtml:div[@class='framePerso']]" priority="2">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" font-weight="normal">
            <xsl:call-template name="getLibelle2">
                <xsl:with-param name="nomControl">
                    <xsl:value-of select="@id"/>
                </xsl:with-param>
            </xsl:call-template>
        </fo:block>
        <fo:block color="blue" font-weight="bold">
            <xsl:variable name="nom">
                <xsl:value-of select="replace(@id, '-control','')"/>
            </xsl:variable>
            <xsl:value-of select="//xf:instance[@id='donnees-pilotage']//*[name()=$nom]"/>
        </fo:block>
    </xsl:template>
    
    <!-- Les textes qui ne correspondent pas à des warnings ni à une consigne -->
    <xsl:template match="xf:output[not(contains(@class,'consigne')) and not(xf:alert[@level='warning'])]">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" font-weight="normal">
            <xsl:if test="contains(@class,'tableau') or contains(@class,'Tableau')">
                <xsl:attribute name="start-indent" select="string('10px')"/>
            </xsl:if>
            
            <xsl:call-template name="getLibelle2">
                <xsl:with-param name="nomControl">
                    <xsl:value-of select="@id"/>
                </xsl:with-param>
            </xsl:call-template>
        </fo:block>
    </xsl:template>
    
    <!-- Les champs -->
    <xsl:template match="xf:textarea|xf:input">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle2">
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
                <xsl:if
                    test="following-sibling::*[position()=1 and name()='xhtml:span' and @class='suffixe'] and not($reponse='')">
                    <xsl:text> </xsl:text>
                    <xsl:value-of
                        select="following-sibling::xhtml:span[@class='suffixe' and position()=1]/text()"/>
                    <xsl:text> </xsl:text>
                </xsl:if>
            </fo:block>
        </fo:block>
        
    </xsl:template>
    
    
    <xsl:template match="xf:select|xf:select1">
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle2">
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
    
    
    <!-- réponse au format date -->
    <xsl:template match="xf:select1[contains(@id,'-layout-') and not(preceding-sibling::xf:select1[contains(@id,'-layout-')])]">
        
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle2">
                    <xsl:with-param name="nomControl" select="@id"/>
                    
                </xsl:call-template>
            </fo:block>
            <fo:block color="blue" font-weight="bold">
                <xsl:for-each select="../xf:select1[contains(@id,'-layout-')]">
                    <xsl:variable name="response-code">
                        <xsl:call-template name="getResponse">
                            <xsl:with-param name="nom" select="replace(@id,'-control','')"/>
                            
                        </xsl:call-template>
                    </xsl:variable>
                    <xsl:if test="$response-code != ''">
                        <xsl:value-of select="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=replace(current()/@id,'-control','')]
                            /item[child::value/text()=$response-code]/label/text()"/>
                        <xsl:text> </xsl:text>                        
                    </xsl:if>
                </xsl:for-each>
            </fo:block>
        </fo:block>
    </xsl:template>
    
    <!-- réponse au format durée -->
    <xsl:template match="xf:input[contains(@id,'-layout-') and not(preceding-sibling::xf:input)]">
        
        <fo:block font-family="{$style}" font-size="10pt" space-before="6px" start-indent="10px">
            <fo:block>
                <xsl:call-template name="getLibelle2">
                    <xsl:with-param name="nomControl" select="@id"/>
                    
                </xsl:call-template>
            </fo:block>
            <fo:block color="blue" font-weight="bold">
                <xsl:for-each select="../xf:input">
                    <xsl:variable name="response">
                        <xsl:call-template name="getResponse">
                            <xsl:with-param name="nom" select="replace(@id,'-control','')"/>
                            
                        </xsl:call-template>                        
                    </xsl:variable>
                    <xsl:if test="$response != ''">
                        <xsl:value-of select="$response"/>
                        <xsl:if test="following-sibling::*[position()=1 and name()='xhtml:span' and @class='suffixe-double-duree']">
                            <xsl:text> </xsl:text>
                            <xsl:value-of select="following-sibling::xhtml:span[@class='suffixe-double-duree'][1]/text()"/>
                            <xsl:text> </xsl:text>
                        </xsl:if>                        
                    </xsl:if>
                </xsl:for-each>
            </fo:block>
        </fo:block>
    </xsl:template>
    
    <xsl:template name="getReponse">
        <xsl:param name="nom"/>
        
        <xsl:value-of select="//xf:instance[@id='fr-form-instance']//Variable[@idVariable=$nom]"/>
        <!-- Pour l'export des variables, on met en commentaire la ligne qui précède et on sort cette ligne du commentaire -->
        <!--<xsl:value-of select="$nom"/>-->
    </xsl:template>
    
    <xsl:template name="getLabelReponse">
        <xsl:param name="nom"/>
        <xsl:param name="codeReponse"/>
        
        <xsl:choose>
            <!-- label sans balises xhtml -->
            <xsl:when test="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/item[child::value/text()=$codeReponse]/label/text()!=''">
                <xsl:value-of select="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/item[child::value/text()=$codeReponse]/label/text()"/>
            </xsl:when>
            <!-- label avec balises xhtml -->
            <xsl:when test="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/item[child::value/text()=$codeReponse]/label/node()">
                <xsl:apply-templates select="//xf:instance[@id='fr-form-resources']/resources/resource[@xml:lang='fr']//*[name()=$nom]/item[child::value/text()=$codeReponse]/label/node()"/>
            </xsl:when>
            <!-- pas de label -->
            <xsl:otherwise>
                <xsl:text>Coché</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
        <!-- Pour l'export des variables, on met en commentaire tout ce qui précède, sauf les xsl:param et on sort cette ligne du commentaire -->
        <!--<xsl:value-of select="$nom"/>-->
    </xsl:template>
    
    <!-- On dégage tous les champs qui sont non relevant (regroupés dans des xf:group) -->
    <xsl:template match="xf:group">
        <!-- On récupère le bind du champ -->
        <xsl:variable name="bind">
            <xsl:value-of select="@bind"/>
        </xsl:variable>
        <!-- On récupère l'expression relevant -->
        <xsl:variable name="relevant">
            <!-- On fait bien attention à faire le remplacement suivant pour bien pointer sur l'instance et pas sur les ressources par exemple -->
            <xsl:value-of
                select="replace(//xf:bind[@id=$bind]/@relevant,'(instance\(''fr\-form\-instance''\))?//','//xf:instance[@id=&quot;fr-form-instance&quot;]//')"
            />
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
        <!-- Pour l'export des variables, on met en commentaire tout ce qui précède et on sort cette ligne du commentaire -->
        <!--<xsl:apply-templates select="*"/>-->
    </xsl:template>
    
</xsl:stylesheet>
