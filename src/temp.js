export default {
  name: 'Autocomplete',
  data() {
    return {
    };
  },
  emits: [
    'onStart',
    'onFetch',
    'onSelect:modelValue',
  ],
  props: {
    modelValue: { label: string, value: string}, // previously was `value: String`
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    bgcolor: {
      type: String,
      default: "white"
    },
    selectedBgcolor: {
      type: String,
      default: "lightgrey"
    },
    minLength: {
      type: number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    options: {
      handler(val) {
        this.setOption(val);
      },
      deep: true
    },
    modelValue: {
      handler(val) {
        this.setValue(val);
      },
      deep: true
    },
    name: {
      handler(val) {
        this.name = val;
      },
      deep: true
    },
    placeholder: {
      handler(val) {
        this.placeholder = val;
      },
      deep: true
    },
    bgcolor: {
      handler(val) {
        this.bgcolor = val;
      },
      deep: true
    },
    selectedBgcolor: {
      handler(val) {
        this.selectedBgcolor = val;
      },
      deep: true
    },
    minLength: {
      handler(val) {
        this.minLength = val;
      },
      deep: true
    },
    disabled: {
      handler(val) {
        this.disabled = val;
      },
      deep: true
    },
    required: {
      handler(val) {
        this.required = val;
      },
      deep: true
    }    ,
  },
  methods: {
    setOption(val = []) {
      if(!this.elAutocomplete) {
        let elSelect;
        if(this.$el) {
          elSelect = $(this.$el).find("select.this-is-select2");
        } else {
          elSelect = $(this).find("select.this-is-select2");
        }
        this.select2 = elSelect;
      }

      // this.select2.empty();
      this.select2.select2({
        placeholder: this.placeholder,
        ...this.settings,
        data: val
      });
      this.setValue(this.modelValue);
    },
    setValue(val) {
      if(!this.select2) {
        let elSelect;
        if(this.$el) {
          elSelect = $(this.$el).find("select.this-is-select2");
        } else {
          elSelect = $(this).find("select.this-is-select2");
        }
        this.select2 = elSelect;
      }
      if (val instanceof Array) {
        this.select2.val([...val]);
      } else {
        this.select2.val([val]);
      }
      this.select2.trigger('change');
    }
  },
  mounted() {
    const self = this;
    // console.log("starting the select2 - mounted");
    let xJquery = 0;
    function waitJquery(that) {
      if(typeof window.jQuery === "undefined") {
        xJquery++;

        // if(xJquery == 3) {
        //   let jqueryScript = document.createElement('script');
        //   jqueryScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js');
        //   document.head.appendChild(jqueryScript);
        // }

        // console.log("starting the select2 - waiting xJquery: ", xJquery);

        setTimeout(() => {
          waitJquery(that);
        }, 1000);
      } else {
        let $ = window.jQuery;
        window.$ = $;

        function okGo(that) {
          if(!that.select2) {
            let elSelect;
            if(that.$el) {
              elSelect = $(that.$el).find("select.this-is-select2");
            } else {
              elSelect = $(that).find("select.this-is-select2");
            }
            that.select2 = elSelect;
          }

          that.select2.select2({
            placeholder: that.placeholder,
            ...that.settings,
            data: that.options
          })
          .on('select2:select select2:unselect', ev => {
            that.$emit('update:modelValue', that.select2.val());
            that.$emit('select', ev['params']['data']);
          })
          .on('change', ev => {that.$emit('change', ev);})
          .on('select2:closing', ev => {that.$emit('closing', ev);})
          .on('select2:close', ev => {that.$emit('close', ev);})
          .on('select2:opening', ev => {that.$emit('opening', ev);})
          .on('select2:open', ev => {that.$emit('open', ev);})
          .on('select2:selecting', ev => {that.$emit('selecting', ev);})
          .on('select2:select', ev => {that.$emit('select', ev);})
          .on('select2:unselecting', ev => {that.$emit('unselecting', ev);})
          .on('select2:unselect', ev => {that.$emit('unselect', ev);})
          .on('select2:clearing', ev => {that.$emit('clearing', ev);})
          .on('select2:clear', ev => {that.$emit('clear', ev);});

          if(typeof that.select2.setValue === 'function') {
            that.select2.setValue(that.modelValue);
          } else {
            if(typeof that.setValue === 'function') {
              that.setValue(that.modelValue);
            }
          }
        }

        //somehow in nuxt, it is not a very friendly neighborhood
        function waitUntilAutocompleteLoaded(that) {
          if(!that.select2) {
            let elSelect;
            if(that.$el) {
              elSelect = $(that.$el).find("select.this-is-select2");
            } else {
              elSelect = $(that).find("select.this-is-select2");
            }
            that.select2 = elSelect;
          }
          if(typeof that.select2.select2 === 'undefined') {
            setTimeout(() => {
              waitUntilAutocompleteLoaded(that);
            }, 1000);
          } else {
            okGo(that);
          }
        }
        // waitUntilAutocompleteLoaded(this);
        // okGo(this);

        let xx = 0;
        function reMountedIfNotYet(that) {
          xx++;

          // if(xx == 3) {
          //   let select2Script = document.createElement('script');
          //   select2Script.setAttribute('src','https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js');
          //   document.head.appendChild(select2Script);
          // }




          // console.log("exec reMountedIfNotYet " + xx + ': ', xx)
          setTimeout(() => {
            if(!that.select2) {
            let elSelect;
            if(that.$el) {
              elSelect = $(that.$el).find("select.this-is-select2");
            } else {
              elSelect = $(that).find("select.this-is-select2");
            }
            that.select2 = elSelect;
            }
            if(!that.select2.hasClass("select2-hidden-accessible")) {
              waitUntilAutocompleteLoaded(that);
              reMountedIfNotYet(that);
            }
          }, 1000);
        }

        reMountedIfNotYet(self);
      }
    }

    waitJquery(self);
  },
  beforeUnmount() {
    if(this.select2) {
      if(this.select2.hasClass("select2-hidden-accessible")) {
        this.select2.select2('destroy');
      }
    }
  }
};
