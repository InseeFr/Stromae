<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline"
	xmlns:oxf="http://www.orbeon.com/oxf/processors"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xf="http://www.w3.org/2002/xforms">

	<p:param type="input" name="data"/>
	<p:param type="output" name="data"/>

	<!-- We start by retrieving the parameters (verb, campaign, unit, model and identifier) of the query -->
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="../get-parameters.xpl"/>
		<p:output name="parameters" id="parameters"/>
	</p:processor>
	
	<!-- We retrieve the personalized form -->
	<p:processor name="oxf:pipeline">
		<p:input name="config" href="../personalization/personalization.xpl"/>
		<p:input name="form" href="#data"/>
		<p:input name="parameters" href="#parameters"/>
		<p:output name="personalized-form" id="personalized-form"/>
	</p:processor>

	<!-- we use the url in new to manage access to external users
	and the url in edit to manage access to the managers -->
	<!-- If the path corresponds to an edition, we apply the xsl -->
	<p:choose href="#parameters">
	    <p:when test="/parameters/action='edit'">
	        <p:processor name="oxf:unsafe-xslt">
	            <p:input name="data" href="#personalized-form"/>
	            <p:input name="config">
	                <xsl:stylesheet version="2.0">
	                    <xsl:import href="readonly.xsl"/>
	                </xsl:stylesheet>
	            </p:input>
	            <p:output name="data" ref="data"/>
	        </p:processor>
	    </p:when>
		<p:when test="/parameters/visualize='true'">
			<p:processor name="oxf:unsafe-xslt">
				<p:input name="data" href="#personalized-form"/>
				<p:input name="config">
					<xsl:stylesheet version="2.0">
						<xsl:import href="visualize.xsl"/>
					</xsl:stylesheet>
				</p:input>
				<p:output name="data" ref="data"/>
			</p:processor>
		</p:when>
	    <p:otherwise>
			<p:processor name="oxf:identity">
				<p:input name="data" href="#personalized-form"/>
				<p:output name="data" ref="data"/>
			</p:processor>
		</p:otherwise>
	</p:choose>

</p:config>
