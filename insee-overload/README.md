# Surcharge d'orbeon

## common folder

It is all that is common between the orbeon stromae, "household" and "business" context.

### Organisation

- **META-INF** folder

  - context.xml : is used to define where the folder for orbeon proerties is located

- **WEB-INF** folder

  - **orbeon-insee** folder
    - **config** : properties-local.xml : properties orbeon overloaded
    - **css** : commonEnglish common css
    - **img** : images used in surveys
    - **js** : responsive.js : js script to make the burger menu responsive (import by theme.xsl)
    - **services** : xpl pipeline used by orbeon
    - **xhtml** : error.xhtml : error page
    - **xslfo** : xsl sheet applied to surveys

* **orbeon-overload > apps > fr** folder
  - error-dialog.xml : overload of the inactivity window (overloads all error windows it seems to me)
  - theme.xsl : overload the orbeon theme (transfo xsl executed just before rendering the xhtml -> html)

## default folder

A single folder : WEB-INF

- Adding the file **web.xml**
- Adding the file **keycloak.json** (for business et household only)
- Adding the file orbeon-insee > **page-flow.xml** : file to describe which pipeline(s) to use according to the uri (the path).
