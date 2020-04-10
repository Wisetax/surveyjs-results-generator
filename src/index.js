import {handleField} from './generator'

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
      const survey = new Survey.Model(surveyOnSamePage(JSON.parse(this.json)));
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
          this.state.survey.pages[0].elements.forEach((element) => handleElement(element))
          const data = JSON.parse(JSON.stringify(this.state.survey.data, null, 2));
  
          if (i < this.state.numberCase - 1) {
            this.state.survey.clear();
            this.state.survey.data = this.state.constraints;
          }
  
          possibleResults.push(data);
        }
  
        console.log(possibleResults);
  
        downloadJSONfile(possibleResults);
        copyToClipboard(JSON.stringify(possibleResults, null, 2));
        setTimeout(() => {
          alert('Possible Results Copied to clipboard');
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

function handleElement(element) {
  if (!element.isVisible || element.isAnswered)
    return

  if (element.getType() === 'panel')
    return element.elements.forEach((elem) => handleElement(elem));

  if (element.getType() ==='html')
    return

  const field = element.getConditionJson()

  if (!field)
    console.log(element)

  const response = handleField(field);
  element.setNewValueInData(response[element.name])
}