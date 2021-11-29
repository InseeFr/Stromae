# Stromae

Web application for the management of questionnaires powered by Lunatic (https://github.com/InseeFr/Lunatic)

## Style overload

You have two ways to overload the stromae styles. These methods are done through the `metadata.json` file. You can of course combine these two methods.

### External style sheets

You can add external style sheet to html page in order to overload styles. You juste have to pass an styleSheets array of URL of external stylesheet.

Here is an example below :

```json
{
    "inseeContext": "...",
    ...,
    "style": {

        "styleSheets": [
            "https://mylink.to.my/stylesheet_1.css",
            "https://mylink.to.my/stylesheet_2.css"
        ]
    }
}
```

_**Notice :**_ Your style sheets have to be served as "text/css" file (not octet-stream). Please use static server like nginx, apache, github pages, ...

### Define main colors

Thanks to the `metadata.json` file, you can also define the main colors of the application. You have to respect the expect object called "theme".

Here you have a example :

```json
{
    "inseeContext": "...",
    ...,
    "style": {
        "theme": {
            "palette": {
                "type": "light",
                "primary": {
                    "main": "#0f417a" //only hexacolor
                },
                "secondary": {
                    "main": "#ffc400" //only hexacolor
                }
            }
        },

        "styleSheets": [...]
    }
}
```

_For more details, you can see [Material-UI customization here](https://mui.com/customization/theming)._

## Generic Pages overload

In Stromae, there is 3 generic pages :

- The welcome page
- The validation page
- The end page

Thanks the `metadata.json`, you can customize these pages.

These pages can be written in [VTL](https://github.com/InseeFr/Trevas-JS) x [Markdown](https://fr.wikipedia.org/wiki/Markdown).

### Welcome Page

There is 4 part for this page :

- title : the title of page
- body : Array, each item is a line
- legalTermsTitle : title of the box
- legalTermsBody : body of the box (array)

### Validation Page

There is 2 part for this page :

- title : the title of page
- body : Array, each item is a line

### End Page

There is 4 part for this page :

- title : title of the page
- body : Array, each item is a line
- pdfMessage : A sentence near to the "download" button (deposit proof),
- youCanQuit: the last sentence, to tell the user that he can logout and quit (if null, there is no logout button on this page)

## Main Logo

You can overload the mainLogo in the `metadata.json` file.
You juste write the url of image in the file like this :

```json
{
    "inseeContext": "...",
    ...,
    "mainLogo" : "https://static.insee.fr/static/img/Logo_Insee_TailleMINI.jpg"
}
```

You have an full example of metadata.json file [here](./public/static/metadata/full.json).
