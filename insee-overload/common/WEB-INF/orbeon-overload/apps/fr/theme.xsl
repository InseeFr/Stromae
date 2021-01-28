<!--
    Copyright (C) 2009 Orbeon, Inc.
    
    This program is free software; you can redistribute it and/or modify it under the terms of the
    GNU Lesser General Public License as published by the Free Software Foundation; either version
    2.1 of the License, or (at your option) any later version.
    
    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    See the GNU Lesser General Public License for more details.
    
    The full text of the license is available at http://www.gnu.org/copyleft/lesser.html
-->
<!--
    Regular theme for Form Runner.
-->
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:xi="http://www.w3.org/2001/XInclude"
    xmlns:p="http://www.orbeon.com/oxf/pipeline"
    xmlns:xxf="http://orbeon.org/oxf/xml/xforms">
    
    <!-- Just use the plain theme -->
    <xsl:import href="../../config/theme-plain.xsl"/>
    
    <xsl:variable name="path" select="tokenize(p:get-request-path(),'/')"/>
    <xsl:variable name="survey" select="lower-case($path[3])"/>
    <xsl:variable name="modele" select="lower-case($path[4])"/>
    <xsl:variable name="action" select="lower-case($path[5])"/>
    <xsl:variable name="surveyUnit" select="upper-case(p:get-request-parameter('unite-enquete'))"/>
    
    <xsl:variable name="uri-assistance">
        <xsl:choose>
            <xsl:when test="p:property('insee-context')='household'">
                <xsl:value-of select="concat(p:property('url-assistance'),'/',substring-before($survey,'-'),'/contacter-assistance/auth?idue=',$surveyUnit)"/>
            </xsl:when>
            <xsl:when test="p:property('insee-context')='business'">
                <xsl:value-of select="concat(p:property('url-orbeon'),'/contacter/',$survey,'/',$surveyUnit)"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="concat(p:property('url-orbeon'),'/help')"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    
    <xsl:variable name="uri-pdf">        
        <xsl:choose>
            <xsl:when test="p:property('insee-context')='household'">
                <xsl:value-of select="concat('/exporter?survey=',$survey,'&amp;model=',$modele,'&amp;survey-unit=',$surveyUnit)"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:variable name="valeur">
                    <xsl:choose>
                        <xsl:when test="$action='new'">
                            <xsl:value-of select="string('exporter')"/>
                        </xsl:when>
                        <xsl:when test="$action='edit'">
                            <xsl:value-of select="string('imprimer')"/>
                        </xsl:when>
                    </xsl:choose>
                </xsl:variable>
                <xsl:value-of select="concat('/',$valeur,'/',$survey,'/',$surveyUnit,'?modele=',$modele)"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    
    <xsl:variable name="uri-logout">
        <xsl:choose>
            <xsl:when test="p:property('insee-context')='household'">
                <xsl:value-of select="concat(p:property('url-orbeon'),p:property('logout-uri'),'?survey=',substring-before($survey,'-'),'&amp;survey-unit=',$surveyUnit)"/>
            </xsl:when>
            <xsl:when test="p:property('insee-context')='business'">
                <xsl:value-of select="concat(p:property('url-orbeon'),p:property('logout-uri'))"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="concat(p:property('url-orbeon'),p:property('logout-uri'))"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    
    <xsl:template match="/">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:head" priority="10">
        <xsl:copy>
            <xsl:call-template name="head"/>
            <!-- Favicon -->
            <!--            <xhtml:link rel="shortcut icon" href="/ops/images/orbeon-icon-16.ico"/>-->
            <xhtml:link rel="icon" href="/img/icone_statpub.png" type="image/png"/>
            <xhtml:meta name="viewport" content="width=device-width, initial-scale=1"/>
            <xhtml:meta http-equiv="x-ua-compatible" content="IE=edge"/>
            <xhtml:script src="/js/responsive.js" defer="defer"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:body">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>
    
    <!-- We replace this h4 tag (we use the h4 tag to mark question groupings) -->
    <xsl:template match="xhtml:h4[parent::xhtml:div[@class='modal-header']]">
        <xsl:element name="span">
            <xsl:apply-templates select="node() | @*"/>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="xhtml:div[parent::xhtml:div[@class='navbar-inner'] and @class='container']">
        <xsl:copy>
            <xsl:apply-templates select="@*"/>
            <xsl:apply-templates select="*"/>
            <xhtml:div class="menuBandeau">
                <xhtml:button id="menuButton" class="burger" onclick="showMenu()" type="checkbox">Menu ≡</xhtml:button>
                <xhtml:nav id="nav" style="">
                    <!-- <xhtml:a id="myaccount" href="{concat(p:property('url-portail'),p:property('mon-compte'))}" target="_blank">Mon Compte</xhtml:a> -->
                    <xsl:if test="p:property('insee-context')='business'">
                        <xsl:variable name="url1">
                            <xsl:value-of select="//xhtml:a[@id='URLNotice' and parent::xhtml:div[contains(@class,'perso-formulaire')]]/@href"/>
                        </xsl:variable>
                        <xsl:if test="not($url1/text()='')">
                            <xhtml:a id="notice" href="{$url1}" target="_blank">Notice en ligne</xhtml:a>
                        </xsl:if>
                        <xsl:variable name="url2">
                            <xsl:value-of select="//xhtml:a[@id='URLSpecimen' and parent::xhtml:div[contains(@class,'perso-formulaire')]]/@href"/>
                        </xsl:variable>
                        <xsl:if test="not($url2/text()='')">
                            <xhtml:a id="pdf" href="{$url2}" target="_blank">Visualiser le questionnaire PDF</xhtml:a>
                            
                        </xsl:if>
                        <xsl:variable name="url3">
                            <xsl:value-of select="//xhtml:a[@id='URLDiffusion' and parent::xhtml:div[contains(@class,'perso-formulaire')]]/@href"/>
                        </xsl:variable>
                        <xsl:if test="not($url3/text()='')">
                            <xhtml:a id="infodiff" href="{$url3}" target="_blank">Informations de diffusion</xhtml:a>
                        </xsl:if>
                    </xsl:if>
                    
                    <xhtml:a id="contact" href="{$uri-assistance}" target="_blank">Contacter l'assistance</xhtml:a>
                    <xhtml:a id="deconnexion" href="{$uri-logout}">Déconnexion</xhtml:a>
                </xhtml:nav>
            </xhtml:div>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:img[parent::xhtml:div[parent::xhtml:div[@class='navbar-inner'] and @class='container']]">
        <xsl:copy>
            <xsl:apply-templates select="@*[not(name()='alt')]"/>
            <!-- Apostrophe : ' => &#x2019; -->
            <xsl:attribute name="alt" select="'Logo de l&#x2019;institut'"/>
            
        </xsl:copy>
    </xsl:template>
    
    <!-- It replaces the message displayed when javascript is disabled -->
    <xsl:template match="xhtml:div[parent::noscript]">
        <xsl:copy> Vous devez activer javascript si vous souhaitez répondre à cette enquête.
        </xsl:copy>
    </xsl:template>
    
    <!-- This is where we place all the elements that will be moved in this epilogue. We do not copy it -->
    <xsl:template match="//xhtml:div[@class='perso-formulaire']"/>

    <!-- We replace the title of the form by a title where we have the hand on the style -->
    <xsl:template match="xhtml:h1">
        <xsl:copy>
            <xsl:choose>
                <xsl:when test="//xhtml:span[@id='titre-formulaire']">
                    <xsl:copy-of select="//xhtml:span[@id='titre-formulaire']"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node() | @*" mode="ajoutStyleTitre"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:span[parent::xhtml:h1]" mode="ajoutStyleTitre">
        <xsl:copy>
            <xsl:attribute name="class">
                <xsl:value-of select="concat('titre_enquete ',@class)"/>
            </xsl:attribute>
            <xsl:apply-templates select="@id"/>
            <xsl:apply-templates select="node()"/>
        </xsl:copy>
    </xsl:template>
    
    <!-- We move the suffix just after the field -->
    <xsl:template match="xhtml:input[parent::xhtml:span[following-sibling::*[position()=1 and substring-after(name(),':')='span' and contains(@class,'suffixe')]]]">
        <xsl:copy-of select="."/>
        <xsl:copy-of select="./(parent::xhtml:span/following-sibling::xhtml:span[contains(@class,'suffixe')])[1]"/>
    </xsl:template>

    <!-- Suffixes are not copied because they have been moved. -->
    <xsl:template match="xhtml:span[contains(@class,'suffixe')]"/>

    <xsl:template match="xhtml:span[contains(@class,'date')]">
        <xsl:copy>
            <xsl:apply-templates select="@*[not(name()='class')]"/>
            <xsl:attribute name="class" select="replace(@class, 'test-champ-date', 'xforms-type-date')"/>
            <xsl:apply-templates select="node()"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="xhtml:input[parent::xhtml:span[contains(@class,'date')]]">
        <xsl:copy>
            <xsl:apply-templates select="@*[not(name()='class')]"/>
            <xsl:attribute name="class" select="concat(@class, ' xforms-type-date')"/>
            <xsl:apply-templates select="node()"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="xhtml:a[@href='recapitulatifPdf']">
        <xsl:copy>
            <xsl:attribute name="href" select="$uri-pdf"/>
            <xsl:attribute name="target" select="'_blank'"/>
            <xsl:apply-templates select="text()"/>
        </xsl:copy>
    </xsl:template>
    
    <!-- Display of the version number -->
    <xsl:template match="xhtml:div[contains(@class,'fr-orbeon-version')]">
        <xsl:variable name="display-version" select="p:property('affichage-numero')"/>
        <xsl:if test="$display-version">
            <xsl:value-of select="."/>
        </xsl:if>
    </xsl:template>

    <!-- Add uri assitance in error dialog -->
    <xsl:template match="xhtml:div[contains(@class,'xforms-error-dialogs')]//xhtml:a[@id='error-assistance']">
        <xsl:copy>
            <xsl:apply-templates select="@*"/>
            <xsl:attribute name="href" select="$uri-assistance"/>
            <xsl:apply-templates select="text()"/>
        </xsl:copy>
    </xsl:template>
    
    
    <!-- A11y : web accessibility -->
    
    <!-- A11y: Added the attribute role='alert' to vocalize error messages when they occur -->
    <xsl:template match="xhtml:span[@class='xforms-alert']">        
        <xsl:copy>
            <xsl:attribute name="role">alert</xsl:attribute>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>
    
    
    <!-- A11y: Addition of an avoidance link (access to the main content of the page)-->  
    <xsl:template match="xhtml:form[@id='xforms-form']">
        <xhtml:a class="avoidance" href="#fr-view-component">Aller au contenu</xhtml:a>
        <xsl:copy>            
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>    
    
    <!-- A11y: setting up the main content area -->    
    <xsl:template match="xhtml:span[@id='fr-view-component']">        
        <xsl:copy>
            <xsl:attribute name="role">main</xsl:attribute>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>
    
    <!-- A11y: setting up of the navigation area on the previous/next buttons -->
    <xsl:template match="xhtml:span[@class='fr-buttons']">        
        <xsl:copy>
            <xsl:attribute name="role">navigation</xsl:attribute>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>
    
</xsl:stylesheet>
