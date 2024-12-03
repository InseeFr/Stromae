<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline" xmlns:oxf="http://www.orbeon.com/oxf/processors"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema">
	
	<!-- Pipeline to redirect the address survey/form/survey unit address -->
	
	<!-- Catching the URI of origin : -->
	<p:processor name="oxf:request">
		<p:input name="config">
			<config stream-type="xs:anyURI">
				<include>/request/request-uri</include>
			</config>
		</p:input>
		<p:output name="data" id="request"/>
	</p:processor>
   
	<!-- prepare the forwarding address-->
	<p:processor name="oxf:unsafe-xslt">
		<p:input name="request" href="#request"/>	
		<p:input name="data" href="../xhtml/erreur.xhtml"/>    
		<p:input name="config">			
			<xsl:stylesheet version="2.0">
				<xsl:template match="/">
					<xsl:apply-templates select="*"/>
				</xsl:template>
				<xsl:template match="node() | @*">
					<xsl:copy>
						<xsl:apply-templates select="node() | @*"/>
					</xsl:copy>
				</xsl:template>
				<xsl:template match="a[@href='assistance']">
					<xsl:copy>
						<xsl:attribute name="href">
							<xsl:value-of select="concat(p:property('url-portail'),p:property('assistance-deconnecte'))"/>	
						</xsl:attribute>
						<xsl:apply-templates select="text()"/>
					</xsl:copy>
				</xsl:template>
			</xsl:stylesheet>
		</p:input>
		<p:output name="data" id="pageErreur"/>
	</p:processor>
			
	<p:processor name="oxf:html-converter">
		<p:input name="config">
			<config>
				<version>5.0</version>
				<encoding>utf-8</encoding>
				<indent>true</indent>
				<indent-amount>0</indent-amount>
			</config>
		</p:input>
		<p:input name="data" href="#pageErreur"/>
		<p:output name="data" id="pageErreurConvertie"/>
	</p:processor>
	
	<!-- Return error-->
	<p:processor name="oxf:http-serializer">
		<p:input name="config">
			<config/>
		</p:input>
		<p:input name="data" href="#pageErreurConvertie"/>
	</p:processor>
	
</p:config>
