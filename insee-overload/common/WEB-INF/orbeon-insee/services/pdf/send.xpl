<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
	xmlns:oxf="http://www.orbeon.com/oxf/processors"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ev="http://www.w3.org/2001/xml-events"
	xmlns:exist="http://exist.sourceforge.net/NS/exist" xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xf="http://www.w3.org/2002/xforms"
	xmlns:xpl="java:org.orbeon.oxf.pipeline.api.FunctionLibrary">
	
	<!-- We start by retrieving the parameters (campaign, unit, model) of the query -->
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="../get-parameters.xpl"/>
		<p:output name="parameters" id="parameters"/>
	</p:processor>
	
	<!-- Makes pdf -->
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="make-pdf.xpl"/>
		<p:input name="parameters" href="#parameters"/>
		<p:output name="pdf" id="pdf"/>
	</p:processor>
	
	<!-- We create a temporary file -->
	<p:processor name="oxf:file-serializer">
		<p:input name="config" transform="oxf:unsafe-xslt" href="#parameters">
			<config xsl:version="2.0">
				<url><xsl:value-of select="concat('oxf:/temp/',/parameters/survey,'_',/parameters/surveyUnit,'.pdf')"/></url>
				<make-directories>true</make-directories>
				<append>false</append>
			</config>
		</p:input>
		<p:input name="data" href="#pdf"/>
	</p:processor>
	
	<!-- It is referenced in an xml element -->
	<p:processor name="oxf:unsafe-xslt">
		<p:input name="data" href="#parameters"/>
		<p:input name="config">
			<fichier xsl:version="2.0" xsi:type="xs:anyURI"><xsl:value-of select="concat('oxf:/temp/',/parameters/survey,'_',/parameters/surveyUnit,'.pdf')"/></fichier>
		</p:input>
		<p:output name="data" id="fichier"/>
	</p:processor>
	
	
	<!-- We send it to the database -->
	<p:processor name="oxf:xforms-submission">
		<p:input name="submission" transform="oxf:unsafe-xslt" href="#parameters">
			<xf:submission xsl:version="2.0" method="put" replace="none"
				serialization="application/octet-stream"
				media-type="application/pdf"
				resource="{p:property('oxf.fr.persistence.exist.exist-uri')}/{/parameters/survey}/{/parameters/modele}/pdf/{/parameters/survey}_{/parameters/surveyUnit}.pdf"
			/>
		</p:input>
		<p:input name="request" href="#fichier"/>
		<p:output name="response" id="response"/>
	</p:processor>
	
	<!-- We add this step so that the generation, sending and deletion of the file is done in the correct order. -->
	<p:processor name="oxf:unsafe-xslt">
		<p:input name="data" href="#response"/>
		<p:input name="fichier" href="#fichier"/>
		<p:input name="config">
			<fichier xsl:version="2.0">
				<xsl:copy-of select="doc('input:fichier')/fichier/text()"/>
			</fichier>
		</p:input>
		<p:output name="data" id="fichierSuppression"/>
	</p:processor>
	
	<!-- We delete the generated pdf -->
	<p:processor name="oxf:file">
		<p:input name="config" transform="oxf:unsafe-xslt" href="#fichierSuppression">
			<config xsl:version="2.0">
				<delete>
					<url><xsl:value-of select="/fichier"/></url>
				</delete>
			</config>
		</p:input>
	</p:processor>	

</p:config>
