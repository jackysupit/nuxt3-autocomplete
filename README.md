This is an autocomplete for nuxt3 based on autocompleter

## How to use
---
### Install
``` cmd
// npm install
npm install nuxt3-autocomplete --save
```

### Use as component
1. make a plugin
``` javascript
// plugins/autocomplete.client.ts
import Autocomplete from 'nuxt3-autocomplete';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Autocomplete", Autocomplete, {});
});
```

2. now it's available on your template
``` javascript
// use it
<template>
  <div>
    <Autocomplete  />
    <h4>Value: {{ myValue }}</h4>
  </div>
</template>
<script setup lang="ts">
  const myChangeEvent = (event) => {
    console.log("myChangeEvent: ", event);
  }
  const mySelectEvent = (e) => {
    console.log("mySelectEvent: ", event);
  }
  const myOptions = [
    {id: 1, text: 'apple'},
    {id: 2, text: 'berry'},
    {id: 3, text: 'cherry'},
  ]
  const myValue = ref();
</script>
```
