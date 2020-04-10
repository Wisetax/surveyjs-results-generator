/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/generator.js":
/*!**************************!*\
  !*** ./src/generator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// const fs = require('fs');\n// const survey = JSON.parse(fs.readFileSync('survey-exemple.json', { encoding: 'utf-8' }))\n\n\n// console.log(generateResponse(survey));\n\n/**\n * Use proper generator depending on field type\n * @param  {Object} field\n * \n * @return {Object} generated response\n */\nfunction handleField(field, results={}) {\n  const type = field.type;\n\n  if (results.hasOwnProperty(field.name))\n    return {};\n\n\n\n  if (type === 'text')\n    return textGenerator(field);\n\n  if (type === 'radiogroup')\n    return radioGroupGenerator(field);\n\n  if (type === 'dropdown')\n    return dropDownGenerator(field);\n\n  if (type === 'checkbox')\n    return checkBoxGenerator(field);\n\n  if (type === 'panel')\n    return panelGenerator(field);\n\n  if (type === 'rating')\n    return ratingGenerator(field);\n\n  if (type === 'multipletext')\n    return multipleTextGenerator(field);\n\n  if (type === 'matrixdynamic')\n    return matrixDynamicGenerator(field);\n\n\n  return {};\n}\n\n/**\n * Generate response for the survey\n * @param  {Object} survey\n * \n * @return {Object} Results\n */\nfunction generateResponse(survey) {\n  let results = {};\n  survey.pages.forEach((page) => {\n    page.elements.forEach((element) => {\n        results = {...results, ...handleField(element)}\n    });\n  });\n\n  return results;\n}\n\n/**\n * Generate response for field with type text\n * @param  {String} {type\n * @param  {String} name\n * @param  {String} title\n * @param  {String} isRequired\n * @param  {String} inputType}\n */\nfunction textGenerator({type, name, title, isRequired, inputType}) {\n  const result = {};\n\n  if (inputType == 'number')\n    result[name] = Math.floor(Math.random() * 100);\n  else\n    result[name] = generateText();\n  \n  return result;\n}\n\n\n/**\n * Generate response fo field with type radiogroup\n * @param  {String} {type\n * @param  {String} name\n * @param  {String} title\n * @param  {String} choices}\n */\nfunction radioGroupGenerator({type, name, title, choices}) {\n  const possibleResults = extractChoices(choices);\n\n  return {\n    [name]: randomItem(possibleResults),\n  }\n}\n\n/**\n * Generate response fo field with type dropdown\n * @param  {String} {type\n * @param  {String} name\n * @param  {String} title\n * @param  {String} choices}\n */\nfunction dropDownGenerator({type, name, title, choices}) {\n  const possibleResults = extractChoices(choices);\n\n  return {\n    [name]: randomItem(possibleResults),\n  }\n}\n\n/**\n * Generate response fo field with type checkbox\n * @param  {String} {type\n * @param  {String} name\n * @param  {String} title\n * @param  {String} choices}\n */\nfunction checkBoxGenerator({type, name, title, choices}) {\n  const possibleResults = extractChoices(choices);\n\n  return {\n    [name]: randomItems(possibleResults),\n  }\n}\n\n/**\n * Generate response to panel\n * @param  {Array} {elements}\n */\nfunction panelGenerator({elements}) {\n  let results = {};\n  elements.forEach((element) => {\n    results = {...results, ...handleField(element)}\n  })\n\n  return results;\n}\n\n/**\n * Generate response for rating\n * @param  {String} {type\n * @param  {String} name\n * @param  {String} rateValues\n * @param  {String} rateMax}\n */\nfunction ratingGenerator({type, rateValues, name, rateMax}) {\n  const possibleResults = extractChoices(rateValues); \n\n  return {\n    [name]: randomItem(possibleResults),\n  };\n}\n\n/**\n * Generate response for multiple text\n * @param  {String} {type\n * @param  {String} name\n * @param  {String} items}\n */\nfunction multipleTextGenerator({type, name, items}) {\n  const tags = items.reduce((acc, item) => {\n    return {...acc, ...{ [item.name]: generateText()}}\n  }, {})\n\n  return {\n    [name]: tags,\n  }\n}\n\n/**\n * Generate response for matrix dynamic\n * @param  {String} {type\n * @param  {Name} name\n * @param  {Array} columns}\n */\nfunction matrixDynamicGenerator({type, name, columns, choices}) {\n  const numRow = Math.floor(Math.random() * 3)\n  const rows = [];\n  while(rows.length <= numRow) {\n    let rowResults = {};\n    columns.forEach((field) => {\n      const _field = {...field}\n\n      if (_field.cellType)\n        _field.type = _field.cellType;\n      else\n        _field.type = 'dropdown';\n      \n      if (_field.type === 'dropdown' && !_field.choices)\n        _field.choices = choices;\n        \n      rowResults = {...rowResults, ...handleField(_field)}\n    })\n    rows.push(rowResults);\n  }\n\n  return {\n    [name]: rows,\n  }\n}\n\nfunction generateText() {\n  return \"Generated Text\";\n}\n\n/**\n * Pick random value in array\n * @param  {Array} array\n * @returns {Any} item \n */\nfunction randomItem(array) {\n  return array[Math.floor(Math.random() * array.length)];\n}\n\n/**\n * Pick random items\n * @param  {Array} array\n * @param  {Number} {prob=0.5 probability to pick an element\n * @param  {Number} min=0} Min number of selected items\n */\nfunction randomItems(array, {prob=0.5, min=0}={}) {\n  const results = new Set();\n\n  while(results.size <= min) {\n    for(const item of array) {\n      if (Math.random() < prob)\n        results.add(item);\n    }\n  }\n\n  return Array.from(results);\n}\n\n/**\n * Extract value from choices\n * @param  {Array} choices\n * \n * @return {Array<String>} array of possible results\n */\nfunction extractChoices(choices) {\n  return choices.map((field) => typeof field == 'string' || typeof field == 'number' ? field : field.value)\n}\n\nmodule.exports = {\n  generateResponse,\n  handleField,\n}\n\n\n\n// const randomElement = array[Math.floor(Math.random() * array.length)];\n\n\n// type: \"radiogroup\",\n// name: \"confirmationExec\",\n// title: {\n//   fr: \"Je souhaite que la consultation comporte une synthèse / executive summary\"\n// },\n// choices: [\n//   {\n//     value: \"true\",\n//     text: {\n//       fr: \"Oui\"\n//     },\n//   },\n//   {\n//     value: \"false\",\n//     text: {\n//       fr: \"Non\"\n//     }\n//   }\n// ]\n\n\n\n\n// { \n//   type: 'text',\n//   name: 'nomSociete',\n//   title:\n//     { \n//       fr: 'Nom de la société / du groupe ayant un potentiel établissement stable en France' \n//     },\n//   isRequired: true \n// }\n\n\n//# sourceURL=webpack:///./src/generator.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generator */ \"./src/generator.js\");\n/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_generator__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction surveyOnSamePage(survey) {\n  const uniqPage = {...survey.pages[0]};\n  uniqPage.elements = [];\n\n  survey.pages.forEach((page) => {\n    page.elements.forEach((element) => {\n        uniqPage.elements.push(element);\n    });\n  });\n\n  return {\n    ...survey,\n    pages: [uniqPage],\n  }\n}\n\n\nconst Store = {\n  state: {\n    isGenerated: false,\n    survey: new Survey.Model({}),\n    loaded: false,\n    numberCase: 5,\n    constraints: undefined,\n    constrained: false,\n    loading: false,\n  }\n};\n\n\nnew Vue({\n  el: '#loader',\n  data: {\n    state: Store.state,\n  }\n})\n\nnew Vue({\n  el: '#jsonentry',\n  data: {\n    state: Store.state,\n    json: null,\n  },\n  methods: {\n    generateForm: function(event) {\n      const survey = new Survey.Model(surveyOnSamePage(JSON.parse(this.json)));\n      this.state.survey = survey;\n      this.state.loaded = true;\n    },\n  }\n})\n\nnew Vue({\n    el: '#surveyContainer',\n    data: {\n        state: Store.state\n    }\n});\n\nnew Vue({\n  el: '#generatorButton',\n  data: {\n    state: Store.state,\n  },\n  methods: {\n    generate: function(event) {\n      this.state.loading = true;\n      \n      setTimeout(() => {\n        const dataAsJavascript= JSON.parse(JSON.stringify(this.state.survey.data))\n        if (!this.state.constrained) {\n          this.state.constraints = {...dataAsJavascript};\n          this.state.constrained = true;\n        }\n        \n        const possibleResults = []\n        for(let i=0; i < this.state.numberCase; i++) {\n          this.state.survey.pages[0].elements.forEach((element) => handleElement(element))\n          const data = JSON.parse(JSON.stringify(this.state.survey.data, null, 2));\n  \n          if (i < this.state.numberCase - 1) {\n            this.state.survey.clear();\n            this.state.survey.data = this.state.constraints;\n          }\n  \n          possibleResults.push(data);\n        }\n  \n        console.log(possibleResults);\n  \n        downloadJSONfile(possibleResults);\n        copyToClipboard(JSON.stringify(possibleResults, null, 2));\n        setTimeout(() => {\n          alert('Copied to clipboard');\n        }, 1000)\n  \n        this.state.loading = false;\n\n      }, 0)\n    }\n  }\n})\n\n// function clearSurvey()\n\nfunction downloadJSONfile(storageObj) {\n  var dataStr = \"data:text/json;charset=utf-8,\" + encodeURIComponent(JSON.stringify(storageObj, null, 2));\n  var dlAnchorElem = document.getElementById('downloadAnchorElem');\n  dlAnchorElem.setAttribute(\"href\",     dataStr     );\n  dlAnchorElem.setAttribute(\"download\", \"possible_results.json\");\n  dlAnchorElem.click();\n}\n\n\nfunction copyToClipboard(str) {\n  const el = document.createElement('textarea');\n  el.value = str;\n  document.body.appendChild(el);\n  el.select();\n  document.execCommand('copy');\n  document.body.removeChild(el);\n};\n\nfunction handleElement(element) {\n  if (!element.isVisible || element.isAnswered)\n    return\n\n  if (element.getType() === 'panel')\n    return element.elements.forEach((elem) => handleElement(elem));\n\n  if (element.getType() ==='html')\n    return\n\n  const field = element.getConditionJson()\n\n  if (!field)\n    console.log(element)\n\n  const response = Object(_generator__WEBPACK_IMPORTED_MODULE_0__[\"handleField\"])(field);\n  element.setNewValueInData(response[element.name])\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });