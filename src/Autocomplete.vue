<template>
  <input ref="elAutoComplete"
    onfocus="this.setSelectionRange(0, this.value.length)"
    :class="elClass ? elClass : ''"
    :name="name"
    :placeholder="placeholder"
    :minLength="minLength ? parseInt(minLength) : 1"
    :disabled=disabled
    :required=required
/>
<!-- <div style="min-height:100px; width:100%; boarder:1px solid orange; background: yellow; color: blue;">
color = {{ color }} <br/>
bgcolor = {{ bgcolor }} <br/>
borderColor = {{ borderColor }} <br/>
selectedColor = {{ selectedColor }} <br/>
selectedBgColor = {{ selectedBgColor }} <br/>
elClass = {{ elClass }} <br/>
</div> -->
</template>
<style>
div.autocomplete[role="listbox"] {
/*
    color: v-bind(color);
    background-color: v-bind(bgcolor);
*/
    color: black;
    background-color: white;

    padding: 5px 12px;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,0.3);
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
outline: 0;
}
div.autocomplete[role="listbox"] > div.selected[role="option"]{
    /* color: v-bind(selectedColor);
    background: v-bind(selectedBgColor); */
    color: #5c5c5c;
    background: #f0f0f0;
}
</style>
<script>
import { ref } from 'vue'
// import autocomplete from 'autocompleter';
import 'https://cdn.jsdelivr.net/npm/autocompleter@7.0.1/autocomplete.js';

export default {
  name: "Autocomplete",
  data() {
    return {
      el: null,
    };
  },
  emits: [
  'change',
  'mounted',
  'select',
  'update:modelValue',
  ],
  setup(props) {
    return {
      "elClass": props["class"],
      "showOnFocus": props["showOnFocus"],
      "name": props["name"],
      "placeholder": props["placeholder"],
      "color": props["color"] ? props["color"] : "black",
      "bgcolor": props["bgcolor"] ? props["bgcolor"] : "white",
      "selectedColor": props["selectedColor"] ? props["selectedColor"] : "black",
      "selectedBgColor": props["selectedBgColor"] ? props["selectedBgColor"] : "lightgrey",
      "borderColor": props["borderColor"] ? props["borderColor"] : "#f0f0f0",
      "minLength": props["minLength"] && parseInt(props["minLength"]) >= 0 ? parseInt(props["minLength"]) : 0,
      "disabled": props["disabled"],
      "required": props["required"],
      "inputIndex": parseInt(props["inputIndex"]),
      "fieldToDropdown": props["fieldToDropdown"] ? props["fieldToDropdown"] : "label",
      "fieldToInput": props["fieldToInput"] ? props["fieldToInput"] : "label",
      "lov": props["lov"] ? props["lov"] : [],
    }
  },
  mounted() {
      this.el = this.$refs.elAutoComplete;
      this.$emit('mounted');
      this.generateEl();
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {}
    }, // previously was `value: String`
    "class": String,
    "showOnFocus": Boolean,
    "name": String,
    "placeholder": String,
    "color": String,
    "bgcolor": String,
    "selectedColor": String,
    "selectedBgColor": String,
    "borderColor": String,
    "minLength": Number,
    "disabled": Boolean,
    "required": Boolean,
    "fieldToDropdown": String,
    "fieldToInput": String,
    "inputIndex": Number,
    "lov": {
      type: Array,
      default: () => []
    },
  },
  watch: {
    lov: {
      handler(val) {
        this.setLov(val);
      },
      deep: true
    },
    modelValue: {
      handler(val) {
        this.setValue(val);
      },
      deep: true
    },
  },
  methods: {
    setLov(vals = []) {
      //GENERATE ulang EL
      // this.select2.select2({
      //   placeholder: this.placeholder,
      //   ...this.settings,
      //   data: vals
      // });

      //set value
      this.setValue(this.modelValue);
    },
    setValue(val) {
      if (val instanceof Object) {
        this.el.value = val.label;
      } else {
        this.el.value = val;
      }
    },
    generateEl() {
      const self = this;
      const el = self.el;

      autocomplete({
          input: el,
          minLength: parseInt(self.$props.minLength),
          showOnFocus: self.showOnFocus,
          fetch: function(text, update) {
                let suggestions = [];
                let lowerText = text.toLowerCase();
                if(text) {
                  suggestions = self.$props.lov.filter(n => n.label.toLowerCase().indexOf(lowerText) >= 0);
                } else {
                  suggestions = self.$props.lov;
                }
                update(suggestions);
                let item = {
                    label: text,
                    value: "",
                }
				        self.$emit('update:modelValue', item);
                self.$emit('change');
          },
          onSelect: function(item) {
              if(self.$props.fieldToInput && typeof item[self.$props.fieldToInput] !== 'undefined') {
                el.value = item[self.$props.fieldToInput];
              } else {
                el.value = item.label;
              }

              self.$emit('update:modelValue', item);
			        self.$emit('change');
              self.$emit('select'); //this should trigger after update
          },
          render: function(item, currentValue) {
              const itemElement = document.createElement("div");
              let value = "";
              if(self.$props.fieldToDropdown && typeof item[self.$props.fieldToDropdown] !== 'undefined') {
                value = item[self.$props.fieldToDropdown];
              } else {
                value = item.label || "";
              }
              itemElement.textContent = value;
              return itemElement;
          }
      });

      el.value = self.$props.modelValue.label; //default value to show 
    },
  },
}
</script>
