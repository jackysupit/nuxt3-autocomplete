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

2. now it's available on your template. here is a working example
``` javascript
// use it
<template>
    <div class="row">
        <div class="col-md-3 bg-danger">
        </div>
        <div class="col-md-3 bg-warning">
            <Autocomplete :lov="countries" class="form-control" v-model="selected"/>
        </div>
        <div class="col-md-3 bg-info">
            selected: {{selected}}
        </div>
        <div class="col-md-3 bg-success">
            {{countries}}

            <button class="btn btn-primary" @click="tambah">Tambah</button>
        </div>
        </div>
</template>
<script setup lang="ts">
    const defaultCountries = [
        { label: 'United Kingdom', value: 'UK' },
        { label: 'United States', value: 'US' }
    ];
    const countries = ref(defaultCountries);

    const tambah = () =>{
        countries.value = [
        { label: 'United Kingdom', value: 'UK' },
        { label: 'United States', value: 'US' },
        { label: 'Indonesia', value: 'ID' },
    ]
        console.log("countries: ", countries);
    }

    const selected = ref();
</script>
```
