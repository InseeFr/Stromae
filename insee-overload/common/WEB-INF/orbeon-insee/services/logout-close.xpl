<?xml version="1.0" encoding="UTF-8"?>
<p:config xmlns:p="http://www.orbeon.com/oxf/pipeline" xmlns:oxf="http://www.orbeon.com/oxf/processors">
    
    <p:param name="data" type="output"/>
    
    <p:processor name="oxf:session-invalidator"/>
    
    <p:processor name="oxf:identity">
        <p:input name="data">
            <html>
                <head>
                    <title>Au revoir</title>
                    <!-- Ne fonctionne que :
                    - si le javascript est activé
                    - si le questionnaire a été ouvert depuis le portail avec javascript
                    Sinon la page s'affiche.
                    -->
                    <script type="text/javascript"><![CDATA[window.close();]]></script>
                </head>
                <body>
                    <p>Vous pouvez fermer cette fenêtre</p>
                </body>
            </html>
        </p:input>
        <p:output name="data" ref="data"/>
    </p:processor>
    
</p:config>