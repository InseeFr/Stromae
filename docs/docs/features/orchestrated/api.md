# Appels Api


## Données de l'unités enquêtées

Une unité enquêtée est décrit par 2 objets dans dans l'orchestrateur:
- l'objet `stateData`, qui est un objet contenant les informations à propos de l'état de l'unité enquêtée.
- l'objet `data`, qui est l'objet renvoyé par Lunatic, contenant toutes les données collectées


### État de l'unité (stateData)


| Type | Route | Description | Sécurisé par Bearer token | Exemple de réponse |
|-|-|-|-|-|
|GET|`/api/survey-unit/${surveyUnitId}/state-data` |  Récupère l'objet "data" |oui | ```json {}``` |
|PUT|`/api/survey-unit/${surveyUnitId}/state-data` | Envoie l'objet "data" | oui |```json {}``` |

### Données (data)

| Type | Route | Description | Sécurisé par Bearer token | Exemple de réponse |
|-|-|-|-|-|
|GET|`/api/survey-unit/${surveyUnitId}/data` | Récupère l'objet "data" |oui | ```json {}``` |
|PUT|`/api/survey-unit/${surveyUnitId}/data` |  Envoie l'objet "data" |oui | ```json {}``` |

### Paradonnées


| Type | Route | Description | Sécurisé par Bearer token | Exemple de réponse |
|-|-|-|-|-|
|POST|`/api/paradata`  Le corps de la requête renvoie toute l'information nécessaire | oui | ```json {}``` |

### Preuve de dépôt

La preuve de dépôt est un fichier au format PDF téléchargeable une fois le questionnaire validé par le répondant.

| Type | Route | Description | Sécurisé par Bearer token | Exemple de réponse |
|-|-|-|-|-|
|GET|`/api/survey-unit/${surveyUnitId}/deposit-proof` | Récupère le blob du PDF | oui |Fichier PDF  |


## Données de questionnaire

### Modèle de questionnaire

| Type | Route | Description | Sécurisé par Bearer token| Exemple de réponse |
|-|-|-|-|-|
|GET|`/api/questionnaire/${surveyId}` | Récupère le modèle de questionnaire Lunatic |oui  | ```json {}``` |

### Ressources

| Type | Route | Description | Sécurisé par Bearer token | Exemple de réponse |
|-|-|-|-|-|
|GET|`/api/nomenclature/${nomenclatureId}` | Récupère la nomenclature |oui ? | ```json {}``` |


## Données de l'enquête

### Metadonnées

| Type | Route | Description | Sécurisé par Bearer token | Exemple de réponse |
|-|-|-|-|-|
|GET|`/api/questionnaire/${surveyId}/metadata` |  Récupère le fichier "metadata" |non | ```json {}``` |
