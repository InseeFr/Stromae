# Stromae V3

Web application for the management of questionnaires powered by Lunatic (https://github.com/InseeFr/Lunatic)

## View a survey

You can view a questionnaire in stromae by going to `https://url-of-application/visualize`.

Then you just have to add the survey url, metadata url (not mandatory), data url (not mandatory) and nomenclatures urls.

Nomenclatures are not mandatory too, they are used by suggester component to allow autocompletion on large lists.

You must add nomenclature as follow :

```json
{
"idNomenclature1":"https://url_of_the_nomenclature1.json",
"idNomenclature2":"https://url_of_the_nomenclature2.json",
...
}
```

with "idNomenclature1" is the nomenclature id given in the survey for suggester component.

## Style

We use the [French design system](https://www.systeme-de-design.gouv.fr)

## Generic Pages, optional pages and components overload

There is 3 generic pages :

- The welcome page
- The validation page
- The post submit page

You can add also specify additional optional page in the `metadata.json`.

There is 2 generic components :

- The Header
- The Footer

Thanks the `metadata.json`, you can customize these pages and components.
You must follow the [rules](https://www.systeme-de-design.gouv.fr/elements-d-interface/) of the French design system when you customize those components.

These pages can be written in [VTL](https://github.com/InseeFr/Trevas-JS) x [Markdown](https://fr.wikipedia.org/wiki/Markdown).
