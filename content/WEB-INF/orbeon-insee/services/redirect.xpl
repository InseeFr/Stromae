<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline" xmlns:oxf="http://www.orbeon.com/oxf/processors"
    xmlns:xforms="http://www.w3.org/2002/xforms" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<!-- Pipeline to redirect the url to the form-runner url by retrieving the base model -->
	
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="get-parameters.xpl"/>
		<p:output name="parameters" id="parameters"/>
	</p:processor>
   
   	<!-- The model is not known and has not been brought back through the above pipeline. -->
    <!-- We build the call to the ws which brings the model back thanks to the retrieved parameters -->
	<p:processor name="oxf:xforms-submission">      
		<p:input name="request"><dummy/></p:input>
		<p:input name="submission" transform="oxf:unsafe-xslt" href="#parameters">            
			<xforms:submission xsl:version="2.0" method="get" resource="{p:property('server-exist-orbeon')}/apps/orbeon/{p:property('recuperation-modele-service')}/{/parameters/survey}/{/parameters/surveyUnit}"/>
		</p:input>        
		<p:output name="response" id="modele"/>
	</p:processor>
    
	<!-- We create the url we are redirected to -->
	<p:processor name="oxf:unsafe-xslt">
	    <p:input name="modele" href="#modele"/>	
		<p:input name="data" href="#parameters"/>	    
		<p:input name="config">			
			<redirect-url xsl:version="2.0">
				<server-side>false</server-side>
				<xsl:variable name="modele" select="doc('input:modele')/model/text()"/>			    
				<path-info>
					<xsl:value-of select="p:property('url-orbeon')"/>				    
					<xsl:text>/fr/</xsl:text>
					<xsl:value-of select="/parameters/survey"/>
					<xsl:text>/</xsl:text>
				    <xsl:value-of select="$modele"/>
					<xsl:text>/</xsl:text>
					<!-- Depending on the accessed url, we do not return to the same form-runner url. -->
					<xsl:if test="/parameters/action='repondre'">
						<xsl:text>new</xsl:text>
					</xsl:if>
					<xsl:if test="/parameters/action='visualiser'">
						<xsl:text>edit</xsl:text>
					</xsl:if>
					<xsl:text>?unite-enquete=</xsl:text>
					<xsl:value-of select="/parameters/surveyUnit"/>
				</path-info>
			</redirect-url>			
		</p:input>
		<p:output name="data" id="outxslt"/>
	</p:processor>		
			
	<!-- Redirection -->
	<p:processor name="oxf:redirect">
	    <p:input name="data" href="#outxslt">
		</p:input>
	</p:processor>
	
    
	
</p:config>
