import {handleField} from './generator'


function matrixColumnHasValue(params) {
  if(!params || params.length !== 3) 
    return false;
  const rows = params[0];
  const colName = params[1];
  let values = params[2];
  if (!Array.isArray(values)) {
    values = [values];
  }

  if(!rows || !Array.isArray(rows))
    return false;

  function valueInMatrix(val){
    var row;
    for(var i = 0; i < rows.length; i ++) {
      row = rows[i];
      if(!!row && row[colName] == val)
        return true;
    }
    return false;
  }

  return values.reduce((acc, val) => acc || valueInMatrix(val), false)
}

Survey.FunctionFactory.Instance.register("matrixColumnHasValue", matrixColumnHasValue);

function surveyOnSamePage(survey) {
  const uniqPage = {...survey.pages[0]};
  uniqPage.elements = [];

  survey.pages.forEach((page) => {
    page.elements.forEach((element) => {
        uniqPage.elements.push(element);
    });
  });

  return {
    ...survey,
    pages: [uniqPage],
  }
}


const Store = {
  state: {
    isGenerated: false,
    survey: new Survey.Model({}),
    loaded: false,
    numberCase: 5,
    constraints: undefined,
    constrained: false,
    loading: false,
  }
};


new Vue({
  el: '#loader',
  data: {
    state: Store.state,
  }
})

new Vue({
  el: '#jsonentry',
  data: {
    state: Store.state,
    json: null,
  },
  methods: {
    generateForm: function(event) {
      const survey = new Survey.Model(JSON.parse(this.json));
      survey.isSinglePage = true;
      
      this.state.survey = survey;
      this.state.loaded = true;
    },
  }
})

new Vue({
    el: '#surveyContainer',
    data: {
        state: Store.state
    }
});

new Vue({
  el: '#generatorButton',
  data: {
    state: Store.state,
  },
  methods: {
    generate: function(event) {
      this.state.loading = true;
      
      setTimeout(() => {
        const dataAsJavascript= JSON.parse(JSON.stringify(this.state.survey.data))
        if (!this.state.constrained) {
          this.state.constraints = {...dataAsJavascript};
          this.state.constrained = true;
        }
        
        const possibleResults = []
        for(let i=0; i < this.state.numberCase; i++) {
          this.state.survey.pages[0].elements.forEach((element) => handleElement(element, i))
          const data = JSON.parse(JSON.stringify(this.state.survey.data, null, 2));
  
          if (i < this.state.numberCase - 1) {
            this.state.survey.clear();
            this.state.survey.data = this.state.constraints;
          }
  
          possibleResults.push(data);
        }
  
  
        downloadJSONfile(possibleResults);
        // copyToClipboard(JSON.stringify(possibleResults, null, 2));
        setTimeout(() => {
          alert('Possible Results generated');
        }, 1000)
  
        this.state.loading = false;

      }, 0)
    }
  }
})

// function clearSurvey()

function downloadJSONfile(storageObj) {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj, null, 2));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "possible_results.json");
  dlAnchorElem.click();
}


function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

function handleElement(element, caseNum) {


  if (element.getType() === 'panel') {
    if (!element.isVisible)
      return
    return element.elements.forEach((elem) => handleElement(elem, caseNum));

  }

  if (element.getType() ==='html')
    return

  let defaultCaseForce = isMatrixDropdownDefault(element) || isMultipleTextDefault(element)
  if ((!element.isVisible || element.isAnswered) && !defaultCaseForce)
    return

  const field = element.getConditionJson()


  const preset = element.getPlainData().value ? JSON.parse(JSON.stringify(element.getPlainData().value)) : undefined;

  const response = handleField(field, caseNum, preset);
  element.setNewValueInData(response[element.name])
}

/**
 * Handle multiple text appear as answered when default values are set
 * @param  {Element} element survey js form element
 * 
 */
function isMultipleTextDefault(element) {
  if (element.getType() !== 'multipletext')
    return false

  if (JSON.stringify(element.defaultValue) == JSON.stringify(element.getPlainData().value)) {
    element.clearValue()
    return true;
  }

  return false;
}

/**
 * Handle Matrix Dropdown appear as answered is default values are set
 * @param  {Element} element surveyjs form element
 * 
 */

function isMatrixDropdownDefault(element) {
  // check if type is matricdropdown 
  if (element.getType() !== 'matrixdropdown') {
    return false;
  }

  const defaults = element.columns.reduce((acc, col) => {
    return {[col.name]: col.defaultValue, ...acc}
  }, {})

  const allDefault = Object.keys(defaults).reduce((acc, key) => {
    return acc && defaults[key] !== undefined;
  }, true)

  if (allDefault)
    return true

  if (!element.defaultValue)
    return false;

  if (JSON.stringify(element.defaultValue) == JSON.stringify(element.getPlainData().value)) {
    element.clearValue()
    return true;
  }


  return false;
}


// function handleMultipleText(element) {
//   if (element.getType() !== 'multipletext') {
//     return false;
//   }

//   const default = element.ge
// }