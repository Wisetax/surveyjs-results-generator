

Deploy as a github page:
https://wisetax.github.io/surveyjs-results-generator/

# DEV
```sh
 npm run watch
 open index.html
```

# DEPLOY

The app is served as a github page linked to the master branch

```sh
npm run build
git push
```


# FIELD

Describe surveyjs type of fields

## Boolean
type: `boolean`

* Survey
```json
 {
  "type": "boolean",
  "name": "confirmationContingentAchatFranchise",
  "title": {
      "fr": "La société (en sa qualité d'acquéreur) bénéficie en France d'un contingent d'achat en franchise (article 275 du code général des impôts)"
  },
  "isRequired": true,
  "labelTrue": {
      "default": "Yes",
      "fr": "Oui"
  },
  "labelFalse": {
      "default": "No",
      "fr": "Non"
  }
},
```

* Result
```json
{"confirmationContingentAchatFranchise": false}
```

## Text
type: `text`

* Survey
```javascript
{ 
  type: 'text',
  name: 'nomSociete',
  title:
    { 
      fr: 'Nom de la société / du groupe ayant un potentiel établissement stable en France' 
    },
  isRequired: true 
}
```

* Result
```json
{ "nomSociete": "This is it" }
```

## Radiogroup
type: `radiogroup`

* Survey
```javascript
{
  type: "radiogroup",
  name: "confirmationExec",
  title: {
    fr: "Je souhaite que la consultation comporte une synthèse / executive summary"
  },
  choices: [
    {
      value: "true",
      text: {
        fr: "Oui"
      },
    },
    {
      value: "false",
      text: {
        fr: "Non"
      }
    }
  ]
}
```

* Result
```json
{"confirmationExec": "true"}
```

## Dropdown
type: `dropdown`

* Survey
```json
{
  "type": "dropdown",
  "name": "langueConsultation",
  "title": {
    "fr": "Je dois rédiger ma consultation"
  },
  "choices": [
    {
      "value": "english",
      "text": {
        "fr": "en anglais"
      }
    },
    {
      "value": "french",
      "text": {
        "fr": "en français"
      }
    }
  ]
}
```

* Result
```json
{ "langueConsultation": "english"}
```

## Matrix Dynamic
type: `matrixdynamic`

* Survey
```json
{
  "type": "matrixdynamic",
  "name": "destinataireConsultations",
  "title": {
    "fr": "Information sur le client / destinataire de la consultation"
  },
  "isRequired": true,
  "columns": [
    {
      "name": "titre",
      "title": {
        "fr": "Formule de salutation"
      },
      "cellType": "dropdown",
      "isRequired": true,
      "choices": [
        {
          "value": "hello",
          "text": {
            "fr": "Bonjour"
          }
        },
        {
          "value": "helloMrs",
          "text": {
            "fr": "Bonjour Madame"
          }
        },
        {
          "value": "helloSir",
          "text": {
            "fr": "Bonjour Monsieur"
          }
        },
        {
          "value": "dearMrs",
          "text": {
            "fr": "Chère Madame"
          }
        },
        {
          "value": "dearSir",
          "text": {
            "fr": "Cher Monsieur"
          }
        },
        {
          "value": "dearLastNameFemale",
          "text": {
            "fr": "Chère + prénom"
          }
        },
        {
          "value": "dearLastNameMale",
          "text": {
            "fr": "Cher +prénom"
          }
        },
        {
          "value": "lawyerFemale",
          "text": {
            "fr": "Chère Confrère"
          }
        },
        {
          "value": "lawyerMale",
          "text": {
            "fr": "Cher Confrère"
          }
        }
      ]
    },
    {
      "name": "firstName",
      "title": {
        "fr": "Prénom"
      },
      "cellType": "text",
      "isRequired": true
    },
    {
      "name": "lastName",
      "title": {
        "fr": "Nom"
      },
      "cellType": "text",
      "isRequired": true
    },
    {
      "name": "emailAddress",
      "title": {
        "fr": "Adresse électronique"
      },
      "cellType": "text",
      "isRequired": true,
      "validators": [
        {
          "type": "email"
        }
      ],
      "inputType": "email"
    }
  ],
  "choices": [
    1,
    2,
    3,
    4,
    5
  ],
  "rowCount": 1,
  "addRowText": {
    "fr": "Ajouter un destinataire"
  },
  "removeRowText": {
    "fr": "Supprimer un destinataire"
  }
}
```

* Result
```json
{
  "destinataireConsultations": [
      {
          "titre": "helloSir",
          "firstName": "Stan",
          "lastName": "Bienaives",
          "emailAddress": "sebastien@gmail.com"
      }
  ],
}
```

## Checkbox
type: `checkbox`

* Survey
```json
{
  "type": "checkbox",
  "name": "natureFonctions",
  "visibleIf": "{typeMoyenHumains} notcontains \"none\"",
  "title": {
    "fr": "Parmi les fonctions suivantes, cochez celles exercées par l'établissement en France"
  },
  "isRequired": true,
  "choices": [
    {
      "value": "support",
      "text": {
        "fr": "support administratif (ex. : liaison, comptabilité, juridique, démarches auprès des autorités)"
      }
    },
    {
      "value": "operationnel",
      "text": {
        "fr": "logistique / opérationnelle (ex. : production, façonnage, R&D, étude, etc...)"
      }
    },
    {
      "value": "vente",
      "text": {
        "fr": "ventes (ex. : relation client, négociation, démarchages) "
      }
    },
    {
      "value": "achat",
      "text": {
        "fr": "achats (ex. : relation fournisseurs, négociations, etc...)"
      }
    }
  ],
  "hasNone": true,
  "noneText": {
    "fr": "aucune fonction / prérogative n'est exercée depuis l'établissement en France"
  }
}

// Alternative choices
 {
   "choices": [
    "prestationDeService",
    "achatPrestationDeService",
    "livraisonBien",
    "acquisitionBien"
  ]
 }
```

* Result
```json
{
  "natureFonctions": [
      "support"
  ],
}
```
## Panel
type: `panel`

Panel are just a namespace for other fields

* Survey
```json
{
  "type": "panel",
  "name": "fonctionAchat",
  "elements": [
    {
      "type": "text",
      "name": "nombreStaffFonctionAchat",
      "title": {
        "fr": "Indiquez le nombre de personnels affectés à l'activité d'achat"
      },
      "isRequired": true,
      "inputType": "number"
    },
    {
      "type": "checkbox",
      "name": "staffFonctionAchats",
      "startWithNewLine": false,
      "title": {
        "fr": "L'équipe achat est composée de "
      },
      "isRequired": true,
      "choices": [
        {
          "value": "autonomie",
          "text": {
            "fr": "purchase manager"
          }
        },
        {
          "value": "execution",
          "text": {
            "fr": "approvisionneur"
          }
        },
        {
          "value": "encadre",
          "text": {
            "fr": "responsable achat / procurement"
          }
        }
      ]
    },
    {
      "type": "checkbox",
      "name": "typeFonctionAchats",
      "startWithNewLine": false,
      "title": {
        "fr": "Fonction de l'équipe achat"
      },
      "isRequired": true,
      "choices": [
        {
          "value": "750",
          "text": {
            "fr": "négocier et signer les contrats de procurement sans en référer au siège"
          }
        },
        {
          "value": "450",
          "text": {
            "fr": "négocier et signer en autonomie une partie des contrats de procurement et se référer aux directives du siège (guidelines / grilles tarifaires) pour les autres"
          }
        },
        {
          "value": "180",
          "text": {
            "fr": "négocier et signer l'ensemble des contrats de procurement selon les directives du siège (guidelines / grilles tarifaires)"
          }
        },
        {
          "value": "50",
          "text": {
            "fr": "assurer la représentation / coordination dans les achats entre les fournisseurs et le siège "
          }
        }
      ]
    }
  ],
  "visibleIf": "{natureFonctions} contains [\"achat\"]",
  "title": {
    "fr": "Description de l'activité achat de l'établissement en France "
  }
}
```

* Result
Results of the childs field are append to the results (what if overlap?)

## Rating
type: `rating`

* Survey
```json
{
  "type": "rating",
  "name": "ponderationAvocat",
  "title": {
    "fr": "Pour la réalisation de ses opérations économiques, l'établissement bénéficie selon vous"
  },
  "rateValues": [
    {
      "value": "execution",
      "text": {
        "fr": "d'aucune autonomie"
      }
    },
    {
      "value": "encadre",
      "text": {
        "fr": "d'une autonomie très réduite"
      }
    },
    {
      "value": "autonomiePartielle",
      "text": {
        "fr": "d'une autonomie partielle"
      }
    },
    {
      "value": "autonomie",
      "text": {
        "fr": "d'une totale autonomie"
      }
    }
  ],
  "rateMax": 4
}
```

* Result
```json
{"ponderationAvocat": "encadre"}
```

## Html
type: `html`

* Survey
```json
{
  "type": "html",
  "name": "precisionFluxEntrepot",
  "html": {
    "fr": "<p>Pour la description des opérations sous entrepôt; il est considéré que : </p>\n<ul>\n<li>les livraisons sont faites départ France ;</li>\n<li> les acquisitions sont faites à destination de France</li>\n\n</ul>"
  }
}
```

* Result
```json
None
```

## Multiple Text
type: `multipletext`

* Survey
```json
{
  "type": "multipletext",
  "name": "tagsConsultation1",
  "title": {
    "fr": "Indiquez ci-après problématique fiscale en 5 mots-clés / tags (ex. : tva / établissement stable / chantier /  capacité / employeur)"
  },
  "items": [
    {
      "name": "tag1",
      "title": {
        "fr": "Tag 1"
      }
    },
    {
      "name": "tag2",
      "title": {
        "fr": "Tag 2"
      }
    },
    {
      "name": "tag3",
      "title": "Tag 3"
    },
    {
      "name": "tag4",
      "title": "Tag 4"
    },
    {
      "name": "tag5",
      "title": "Tag 5"
    }
  ]
}
```

* Result
```json
{"tagsConsultation1": {
      "tag1": "qdq",
      "tag2": "qdq",
      "tag3": "qdq",
      "tag4": "qd",
      "tag5": "qsd"
  }
}
```
