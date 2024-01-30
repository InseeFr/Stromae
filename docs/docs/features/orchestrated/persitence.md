# Persistence

Sauvegarde via une api les données

## DATA

L'objet data est l'objet principal. Voilà un exemple :

```json
{
	"stateData": {
		"state": "INIT",
		"date": null,
		"currentPage": null
	},

	"personalization": [{ "name": "QuiRepond1", "value": "Mme Dupond" }],

	"data": {}
}
```

Il est composé de 3 morceaux :

- `stateData`: donnée relative à l'état du questionnaire

  - `date`: timestamp correspondant à la date du dernier envoi à l'api
  - `state`: `INIT` / `STARTED` / `VALIDATED` : correspond à l'état du questionnaire
    - `INIT`: initié dans la plateforme de collecet
    - `STARTED`: au moins une variable collectée
    - `VALIDATED`: le questionnaire a été validé/expédié (on ne peut pas revenir en arrière sauf lors du mode `review` ou lecture seule)
  - `currentPage`: correspond au pageTag renvoyé par Lunatic.
    - si `null` -> renvoi vers la page welcome `/questionnaire/${xxx}/unite-enquetee/${yyy}/acceuil`
    - si non `null` et stateData.State égale `STARTED` -> renvoi vers le questionnaire `/questionnaire/${xxx}/unite-enquetee/${yyy}`
    - si non `null` et stateData.State égale `VALIDATED` -> renvoi vers la page de fin `/questionnaire/${xxx}/unite-enquetee/${yyy}/fin`

- `personalization`: est un tableau de variable (`name`, `value`) qui permet la personnalisation (au niveau unité-enquêtée) de la page d'accueil.
- `data`: objet complet correspondant aux donnée de Lunatic
