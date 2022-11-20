<template>
  <input ref="elAutoComplete"
    :class="elclass ? elclass : ''"
    :name="name"
    :placeholder="placeholder"
    :minLength="minLength ? minLength : 1"
    :disabled=disabled
    :required=required
/>
</template>
<style>
div.autocomplete[role="listbox"] {
    color: v-bind(color);
    background-color: v-bind(bgcolor);

    padding: 5px 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-clip: padding-box;
    border: 1px solid v-bind(bgcolor);
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
outline: 0;
}
div.autocomplete[role="listbox"] > div.selected[role="option"]{
    color: v-bind(selectedColor);
    background: v-bind(selectedBgColor);
}
</style>
<script>
import { ref } from 'vue'
import autocomplete from 'autocompleter';

let elAutocomplete =  ref();
const emit = defineEmits([
  'onFetch',
  'onMounted',
  'onSelect:modelValue',
])

const onStart = () => {
  emit('onStart');
}
const onFetch = (text, update) => {
  emit('onFetch', text, update);
}
const onSelect = (item) => {
  emit('onSelect', item);
}

const color = ref("black");
const bgcolor = ref("white");
const selectedColor = ref("black");
const selectedBgColor = ref("lightgrey");
const borderColor = ref("#fefefe");


export default {
  props: {
    "class": String,
    "name": String,
    "placeholder": String,
    "color": String,
    "bgcolor": String,
    "selectedColor": String,
    "selectedBgColor": String,
    "borderColor": String,
    "minLength": number,
    "disabled": Boolean,
    "required": Boolean,
  },
  setup(props) {
    // const name =  ref("");
    // const placeholder =  ref("");
    // const bgcolor =  ref("white");
    // const selectedBgColor =  ref("lightgrey");
    // const minLength =  ref(1);
    // const disabled =  ref(false);
    // const required =  ref(false);

    return {
      onFetch: null,
      onSelect: null,
    }
  },

  mounted() {
    emit('onMounted');
    autocomplete({
        input: elAutoComplete.value,
        minLength: 1,
        fetch: function(text, update) {
            if(typeof this.onFetch === 'function') {
                this.onFetch(text, update);
            } else {
                text = text.toLowerCase();
                var suggestions = countries.filter(n => n.label.toLowerCase().indexOf(text) >= 0);
                update(suggestions);
            }
            emit('onFetch');
        },
        onSelect: function(item) {
            buah.value = item.label;
            if(this.onSelect === 'function') {
                this.onSelect(item);
            }
            emit('onSelect:modelValue', item);
        }
    });
  }
}
</script>
