<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
	xmlns:oxf="http://www.orbeon.com/oxf/processors" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!-- Pipeline to redirect the support url to the portal url -->

	<!-- We start by retrieving the parameters (campaign, unit) of the request -->
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="get-parameters.xpl"/>
		<p:output name="parameters" id="parameters"/>
	</p:processor>
	
	<!-- We create the url we are redirected to -->
	<p:processor name="oxf:unsafe-xslt">
		<p:input name="data" href="#parameters"/>
		<p:input name="config">
			<redirect-url xsl:version="2.0">
				<xsl:choose>
					<xsl:when test="p:property('insee-context')='business'">
						<server-side>false</server-side>
						<path-info>
							<xsl:value-of select="concat(p:property('url-portail'),p:property('assistance-connecte'))"/>				    
						</path-info>
						<parameters>
							<parameter>
								<name>campagne</name>
								<value><xsl:value-of select="/parameters/survey"/></value>
							</parameter>
							<parameter>
								<name>uniteEnquete</name>
								<value><xsl:value-of select="/parameters/surveyUnit"/></value>
							</parameter>
						</parameters>
					</xsl:when>
					<xsl:when test="p:property('insee-context')='household'">
						<server-side>false</server-side>  
						<path-info><xsl:value-of select="'/error'"/></path-info>
					</xsl:when>
					<xsl:when test="p:property('insee-context')='default'">
						<server-side>false</server-side>  
						<path-info><xsl:value-of select="'/error'"/></path-info>
					</xsl:when>
				</xsl:choose>
			</redirect-url>			
		</p:input>
		<p:output name="data" id="outxslt"/>
	</p:processor>		
	
	<!-- On le renvoie -->
	<p:processor name="oxf:redirect">
		<p:input name="data" href="#outxslt"/>
	</p:processor>

</p:config>
