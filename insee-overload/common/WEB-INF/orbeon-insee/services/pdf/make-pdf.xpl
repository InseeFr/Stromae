<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
	xmlns:oxf="http://www.orbeon.com/oxf/processors"
	xmlns:xh="http://www.w3.org/1999/xhtml"
	xmlns:xxf="http://orbeon.org/oxf/xml/xforms"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:exist="http://exist.sourceforge.net/NS/exist" xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xf="http://www.w3.org/2002/xforms"
	xmlns:xpl="java:org.orbeon.oxf.pipeline.api.FunctionLibrary">
	
	<!-- The input parameter tree -->
	<p:param type="input" name="parameters"/>
	<!-- The PDF output (encapsulated in an HTTP response) -->
	<p:param type="output" name="pdf"/>
	
	<!-- We get the corresponding .xhtml form -->
	<p:processor name="oxf:xforms-submission">
		<p:input name="request">
			<dummy/>
		</p:input>
		<p:input name="submission" transform="oxf:unsafe-xslt" href="#parameters">
			<!--<xf:submission xsl:version="2.0" method="get"
                                resource="{p:property('server-exist-orbeon')}/restxq/collectes/formulaire/{/parameters/survey}/{/parameters/modele}"
                        />-->
			<xf:submission xsl:version="2.0" method="get"
				resource="{p:property('server-exist-orbeon')}/rest/db/orbeon/fr/{/parameters/survey}/{/parameters/modele}/form/form.xhtml"
			/>
		</p:input>
		<p:output name="response" id="form"/>
	</p:processor>
	
	<!-- We retrieve the personalized form -->
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="../personalization/personalization.xpl"/>
		<p:input name="form" href="#form"/>
		<p:input name="parameters" href="#parameters"/>
		<p:output name="personalized-form" id="personalized-form"/>
	</p:processor>
	
	<!-- We apply a pre-treatment to clean a little bit what we recovered -->
	<p:processor name="oxf:unsafe-xslt">
		<p:input name="data" href="#personalized-form"/>
		<p:input name="config">
			<xsl:stylesheet version="2.0">
				<xsl:import href="pretraitement.xsl"/>
			</xsl:stylesheet>
		</p:input>
		<p:output name="data" id="cleaned-form"/>
	</p:processor>
	
	<!-- We indicate the path of a resource which corresponds to an xsl named as the source -->
	<p:processor name="oxf:url-generator">
		<p:input name="config" transform="oxf:unsafe-xslt" href="#parameters">
			<xsl:stylesheet version="2.0">
				<xsl:template match="/">
					<config>
						<url>
							<xsl:value-of
								select="concat('oxf:/xslfo/',substring-before(/parameters/survey,'-'),'.xsl')"
							/>
						</url>
					</config>
				</xsl:template>
			</xsl:stylesheet>
		</p:input>
		<p:output name="data" id="ressource"/>
	</p:processor>
	
	<!-- It catches an exception if this resource does not exist.  -->
	<p:processor name="oxf:exception-catcher">
		<p:input name="data" href="#ressource"/>
		<p:output name="data" id="ressource-checked"/>
	</p:processor>
	
	<p:choose href="#ressource-checked">
		<!-- Si la ressource n'existe pas, on lance la xsl générique -->
		<p:when test="/exceptions">
			<p:processor name="oxf:unsafe-xslt">
				<p:input name="data" href="#cleaned-form"/>
				<p:input name="parameters" href="#parameters"/>
				<p:input name="config">
					<xsl:stylesheet version="2.0">
						<xsl:import href="../../xslfo/common.xsl"/>
						<xsl:param name="imgPathAQuoi" select="concat('url(',p:property('url-orbeon'),'/3.1415/img/Insee_formulaire-recensement-bleunuance2.png)')" />
						<xsl:param name="imgPathMariane" select="concat('url(',p:property('url-orbeon'),'/3.1415/img/marianne.png)')" />
						<xsl:param name="imgPathStatPub" select="concat('url(',p:property('url-orbeon'),'/3.1415/img/logo_statpub.png)')" />
						<xsl:param name="imgPathInsee" select="concat('url(',p:property('url-orbeon'),'/3.1415/img/logo4.png)')" />
						<xsl:param name="unite">
							<xsl:choose>
								<xsl:when test="p:property('insee-context')='household'">
									<xsl:value-of select="doc('input:parameters')/parameters/identifiant/text()"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="doc('input:parameters')/parameters/surveyUnit/text()"/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:param>
					</xsl:stylesheet>
				</p:input>
				<p:output name="data" id="pdf-form"/>
			</p:processor>
		</p:when>
		<!-- If the resource exists, we launch the xsl corresponding to this resource -->
		<p:otherwise>
			<p:processor name="oxf:unsafe-xslt">
				<p:input name="data" href="#cleaned-form"/>
				<p:input name="parameters" href="#parameters"/>
				<p:input name="config" transform="oxf:unsafe-xslt" href="#parameters">
					<xsl:stylesheet version="2.0">
						<xsl:template match="/">
							<xsl:element name="xsl:stylesheet">
								<xsl:attribute name="version" select="'2.0'"/>
								<xsl:element name="xsl:import">
									<xsl:attribute name="href"
										select="concat('oxf:/xslfo/',substring-before(/parameters/survey,'-'),'.xsl')"
									/>
								</xsl:element>
								<xsl:element name="xsl:param">
									<xsl:attribute name="name" select="string('unite')"/>
									<xsl:attribute name="select" select="string('doc(''input:parameters'')/parameters/surveyUnit/text()')"/>
								</xsl:element>
							</xsl:element>
						</xsl:template>
					</xsl:stylesheet>
				</p:input>
				<p:output name="data" id="pdf-form"/>
			</p:processor>
		</p:otherwise>
	</p:choose>
	
	<p:processor name="oxf:unsafe-xslt">
		<p:input name="data" href="#pdf-form"/>
		<p:input name="config">
			<parametres xsl:version="2.0">
				<xh:html>
					<xh:head>
						<xf:model id="fr-model" xxf:optimize-get-all="false" xxf:no-updates="true" xxf:local-submission-forward="false">
							<xf:instance xmlns="">
								<xsl:copy-of select="/"/>
							</xf:instance>
							<xf:submission
								id="get-pdf" replace="all" method="post" ref="/"
								resource="{p:property('server-exist-orbeon')}/rest/db/WS/return-pdf.xquery"></xf:submission>
							<xf:send event="xforms-model-construct-done" submission="get-pdf"/>
						</xf:model>
					</xh:head>
				</xh:html>
			</parametres>
		</p:input>
		<p:output name="data" id="gopdf"/>
	</p:processor>
	
	
	<p:processor name="oxf:xforms-to-xhtml">
		<p:input name="annotated-document" href="#gopdf"/>
		
		<!--<p:input name="data"></p:input>
                <p:input name="instance"></p:input>-->
		<p:output name="document" ref="pdf"/>
	</p:processor>
	
</p:config>
