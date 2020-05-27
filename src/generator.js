// const fs = require('fs');
// const survey = JSON.parse(fs.readFileSync('survey-exemple.json', { encoding: 'utf-8' }))


// console.log(generateResponse(survey));

/**
 * Use proper generator depending on field type
 * @param  {Object} field
 * 
 * @return {Object} generated response
 */
function handleField(field, caseNum) {
  const type = field.type;

  if (type === 'boolean')
    return booleanGenerator(field);

  if (type === 'text')
    return textGenerator(field, caseNum);

  if (type === 'radiogroup')
    return radioGroupGenerator(field);

  if (type === 'dropdown')
    return dropDownGenerator(field);

  if (type === 'checkbox')
    return checkBoxGenerator(field);

  if (type === 'panel')
    return panelGenerator(field);

  if (type === 'rating')
    return ratingGenerator(field);

  if (type === 'multipletext')
    return multipleTextGenerator(field, caseNum);

  if (type === 'matrixdynamic')
    return matrixDynamicGenerator(field, caseNum);


  return {};
}

/**
 * Generate response for the survey
 * @param  {Object} survey
 * 
 * @return {Object} Results
 */
function generateResponse(survey) {
  let results = {};
  survey.pages.forEach((page) => {
    page.elements.forEach((element) => {
        results = {...results, ...handleField(element)}
    });
  });

  return results;
}

/**
 * Generate Response for boolean type
 * @param  {String} {type
 * @param  {String} name
 * @param  {String} labelTrue
 * @param  {String} labelTrue}
 */
function booleanGenerator({type, name, labelTrue, labelFalse}) {
  return {
    [name]: Math.random() > 0.5 ? true : false,
  }
}

/**
 * Generate response for field with type text
 * @param  {String} {type
 * @param  {String} name
 * @param  {String} title
 * @param  {String} isRequired
 * @param  {String} inputType}
 */
function textGenerator({type, name, title, isRequired, inputType}, caseNum) {
  const result = {};

  if (inputType == 'number')
    result[name] = Math.floor(Math.random() * 100);
  else
    result[name] = generateText(name, caseNum);
  
  return result;
}


/**
 * Generate response fo field with type radiogroup
 * @param  {String} {type
 * @param  {String} name
 * @param  {String} title
 * @param  {String} choices}
 */
function radioGroupGenerator({type, name, title, choices}) {
  const possibleResults = extractChoices(choices);

  return {
    [name]: randomItem(possibleResults),
  }
}

/**
 * Generate response fo field with type dropdown
 * @param  {String} {type
 * @param  {String} name
 * @param  {String} title
 * @param  {String} choices}
 */
function dropDownGenerator({type, name, title, choices}) {
  const possibleResults = extractChoices(choices);

  return {
    [name]: randomItem(possibleResults),
  }
}

/**
 * Generate response fo field with type checkbox
 * @param  {String} {type
 * @param  {String} name
 * @param  {String} title
 * @param  {String} choices}
 */
function checkBoxGenerator({type, name, title, choices}) {
  const possibleResults = extractChoices(choices);

  return {
    [name]: randomItems(possibleResults),
  }
}

/**
 * Generate response to panel
 * @param  {Array} {elements}
 */
function panelGenerator({elements}) {
  let results = {};
  elements.forEach((element) => {
    results = {...results, ...handleField(element)}
  })

  return results;
}

/**
 * Generate response for rating
 * @param  {String} {type
 * @param  {String} name
 * @param  {String} rateValues
 * @param  {String} rateMax}
 */
function ratingGenerator({type, rateValues, name, rateMax}) {
  const possibleResults = extractChoices(rateValues); 

  return {
    [name]: randomItem(possibleResults),
  };
}

/**
 * Generate response for multiple text
 * @param  {String} {type
 * @param  {String} name
 * @param  {String} items}
 */
function multipleTextGenerator({type, name, items}, caseNum) {
  const tags = items.reduce((acc, item) => {
    return {...acc, ...{ [item.name]: generateText(item.name, caseNum)}}
  }, {})

  return {
    [name]: tags,
  }
}

/**
 * Generate response for matrix dynamic
 * @param  {String} {type
 * @param  {Name} name
 * @param  {Array} columns}
 */
function matrixDynamicGenerator({type, name, columns, choices}, caseNum) {
  const numRow = Math.floor(Math.random() * 3)
  const rows = [];
  while(rows.length <= numRow) {
    let rowResults = {};
    columns.forEach((field) => {
      const _field = {...field}

      if (_field.cellType)
        _field.type = _field.cellType;
      else
        _field.type = 'dropdown';
      
      if (_field.type === 'dropdown' && !_field.choices)
        _field.choices = choices;
        
      rowResults = {...rowResults, ...handleField(_field, caseNum)}
    })
    rows.push(rowResults);
  }

  return {
    [name]: rows,
  }
}

function generateText(name='', caseNum) {
  return `Generated ${name} ${caseNum? 'case: ' + caseNum : ''}`;
}

/**
 * Pick random value in array
 * @param  {Array} array
 * @returns {Any} item 
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Pick random items
 * @param  {Array} array
 * @param  {Number} {prob=0.5 probability to pick an element
 * @param  {Number} min=0} Min number of selected items
 */
function randomItems(array, {prob=0.5, min=0}={}) {
  const results = new Set();

  while(results.size <= min) {
    for(const item of array) {
      if (Math.random() < prob)
        results.add(item);
    }
  }

  return Array.from(results);
}

/**
 * Extract value from choices
 * @param  {Array} choices
 * 
 * @return {Array<String>} array of possible results
 */
function extractChoices(choices) {
  return choices.map((field) => typeof field == 'string' || typeof field == 'number' ? field : field.value)
}

module.exports = {
  generateResponse,
  handleField,
}



// const randomElement = array[Math.floor(Math.random() * array.length)];


// type: "radiogroup",
// name: "confirmationExec",
// title: {
//   fr: "Je souhaite que la consultation comporte une synthèse / executive summary"
// },
// choices: [
//   {
//     value: "true",
//     text: {
//       fr: "Oui"
//     },
//   },
//   {
//     value: "false",
//     text: {
//       fr: "Non"
//     }
//   }
// ]




// { 
//   type: 'text',
//   name: 'nomSociete',
//   title:
//     { 
//       fr: 'Nom de la société / du groupe ayant un potentiel établissement stable en France' 
//     },
//   isRequired: true 
// }
