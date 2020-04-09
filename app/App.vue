<template>
  <div class='header'>
    SurveyJs Results Generator (by Wisetax)
  </div>

  <div id='jsonentry' >
    
    <span class='instructions'>Paste Here the json from surveyjs</span>
    <textarea v-model="json" placeholder="Paste survey here"> </textarea>
    <button v-on:click="generateForm">Create Form</button>
  </div>

  <div id="surveyContainer">
    <survey :survey="state.survey"></survey>
  </div>

  <div id='generatorButton'>
    <button v-on:click="generate">Generate</button>
  </div>
</template>

<script>
</script>
