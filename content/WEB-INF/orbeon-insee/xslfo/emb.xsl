<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fr="http://orbeon.org/oxf/xml/form-runner"
    xmlns:xf="http://www.w3.org/2002/xforms" xmlns:xxf="http://orbeon.org/oxf/xml/xforms"
    xmlns:saxon="http://saxon.sf.net/" xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:xhtml="http://www.w3.org/1999/xhtml" exclude-result-prefixes="xs" version="3.0">

    <!-- On importe la xsl commune à toutes les enquêtes -->
    
    <xsl:import href="common.xsl"/>
    
    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>

    <xsl:template match="/">
        <!-- debug pdd -->
        <!--<xsl:result-document href="{concat('','embvoila.xml')}">
            <xsl:copy-of select="root()"/>
        </xsl:result-document>-->
	<!-- fin debug pdd -->


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
                        <xsl:with-param name="tree" as="node()" tunnel="yes">
                            <xsl:element name="Tree"></xsl:element>
                        </xsl:with-param>
                    </xsl:apply-templates>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>

    <xsl:template match="xf:repeat[parent::xf:case]" priority="2">
        <xsl:apply-templates
            select="//xf:instance[@id='fr-form-instance']/form/Groupe[@idGroupe='GroupePrincipal']/Groupe"
            mode="instance"/>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EMB_GroupeNatureVariable']" mode="instance">
        <fo:block font-family="{$style}" font-size="16pt" font-weight="bold" space-before="13px"
            break-after="page">
            <fo:inline  color="{$couleurs/module/police/text()}" background-color="{$couleurs/module/fond/text()}" padding="2px">
                <xsl:value-of select="Libelle"/>
            </fo:inline>
            <xsl:apply-templates select="Groupe" mode="instance"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EMB_Activite']" mode="instance">
        <fo:block font-family="{$style}" font-weight="normal" font-size="14pt" space-before="6px">
            <fo:inline background-color="{$couleurs/paragraphe/text()}" padding="2px">
                <xsl:value-of select="@idGroupe"/>
                <xsl:text> - </xsl:text>
                <xsl:value-of select="Libelle"/>
            </fo:inline>
            <xsl:apply-templates select="Groupe" mode="instance"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EMB_Produit']" mode="instance">
        <fo:block font-family="{$style}" font-weight="normal" font-size="12pt" space-before="6px">
            <fo:inline padding="2px">
                <xsl:value-of select="@idGroupe"/>
                <xsl:text> - </xsl:text>
                <xsl:value-of select="Libelle"/>
            </fo:inline>
            <xsl:apply-templates select="Groupe" mode="instance"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="Groupe[@typeGroupe='EMB_NatureVariable']" mode="instance">
        <fo:block font-family="{$style}" font-weight="normal" font-size="10pt" space-before="6px">
            <xsl:apply-templates select="Variable" mode="instance"/>
        </fo:block>
    </xsl:template>

    <xsl:template match="Variable" mode="instance">
        <xsl:variable name="identifiant">
            <xsl:value-of select="@idVariable"/>
        </xsl:variable>
        <xsl:variable name="unite">
            <xsl:value-of select="@unite"/>
        </xsl:variable>
        <!-- On parse le libellé variable qui contient des balises xml unescaped -->
        <xsl:variable name="valeur">
            <xsl:apply-templates
                select="saxon:parse(concat('&lt;unescaped&gt;',replace(//xf:instance[@id='emb-util']//Variable[@idVariable=$identifiant]/LibelleVariable,'&amp;','&amp;amp;'),'&lt;/unescaped&gt;'))"
                mode="emb"
            />
        </xsl:variable>
        <fo:inline>
            <xsl:value-of
                select="concat($valeur,' : ')"
            />
        </fo:inline>
        <xsl:if test="text()">
            <fo:inline color="blue" font-weight="bold">
                <xsl:value-of select="text()"/>
                <xsl:text> </xsl:text>
            </fo:inline>
            <fo:inline>
                <xsl:value-of
                    select="//xf:instance[@id='emb-util']//Unite[@idUnite=$unite]/LibelleUniteLong"
                />
            </fo:inline>
        </xsl:if>
    </xsl:template>
    
    <!-- On a parsé un libellé pour récupérer son contenu -->
    <xsl:template match="unescaped" mode="emb">
        <xsl:apply-templates select="node()" mode="emb"/>
    </xsl:template>
    
    <!-- Pour l'instant, s'il y a une balise à l'intérieur d'unescaped, c'est toujours p -->
    <xsl:template match="p[parent::unescaped]" mode="emb">
        <xsl:apply-templates select="node()" mode="emb"/>
    </xsl:template>
    
    <!-- Et s'il y a une balise à l'intérieur de la balise p, c'est la balise br -->
    <xsl:template match="br[parent::p]" mode="emb">
        <xsl:text>&#160;</xsl:text>
    </xsl:template>
    
    <xsl:template match="text()" mode="emb">
        <xsl:value-of select="."/>
    </xsl:template>
    
    
<!--    ajout GTDM pour surcharger common.xsl gérant les boucles-->
<!--    recopie de bouts de la common au 30/11/2018 qui marchent pour EMB :
        1/le template getLibelle a été modifié dans la nouvelle common=>
        - on renomme l'ancienne getLibelle2
        - on reprend les bouts de l'ancienne common qui utilisent ce template et on appelle getLibelle2
      
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
    
</xsl:stylesheet>
