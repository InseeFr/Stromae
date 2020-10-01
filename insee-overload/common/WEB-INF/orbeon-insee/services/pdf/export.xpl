<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
	xmlns:oxf="http://www.orbeon.com/oxf/processors"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:exist="http://exist.sourceforge.net/NS/exist" xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xf="http://www.w3.org/2002/xforms"
	xmlns:xpl="java:org.orbeon.oxf.pipeline.api.FunctionLibrary">

	<!-- We start by retrieving the parameters (campaign, unit, model) of the query -->
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="../get-parameters.xpl"/>
		<p:output name="parameters" id="parameters"/>
	</p:processor>

	<!-- Make pdf -->
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="make-pdf.xpl"/>
		<p:input name="parameters" href="#parameters"/>
		<p:output name="pdf" id="pdf"/>
	</p:processor>

	<!-- Send pdf -->
	<p:processor name="oxf:http-serializer">
		<p:input name="config" transform="oxf:unsafe-xslt" href="#parameters">
			<xsl:stylesheet version="2.0">
				<xsl:template match="/">
					<config>
						<header>
							<name>Content-Disposition</name>
							<value>
								<xsl:value-of
									select="concat(string('attachement; filename='), /parameters/survey, '_', /parameters/surveyUnit, string('.pdf'))"
								/>
							</value>
						</header>
					</config>
				</xsl:template>
			</xsl:stylesheet>
		</p:input>
		<p:input name="data" href="#pdf"/>
	</p:processor>

</p:config>
