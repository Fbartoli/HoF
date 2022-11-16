<template>
  <div v-show="show_input" class="input-field">
    <div class="label-container">
      <label :for="field_data.title">{{ field_data.title }}</label>
      <label v-if="field_data.show_is_required" class="required-indicator" for="field_data.title">*required</label>
      <label v-if="field_data.show_no_pobox" class="required-indicator" for="field_data.title">*PO BOX not allowed</label>
    </div>
    <template v-if="!is_preview">
      <select v-if="field_data.input_field == 'select'" :name="field_data.title" :id="field_data.title" v-model="input_text" @change="update_input" class="">
        <option value="null"></option>
        <option v-for="(option, index) in field_data.options" :key="`dropdown-${field_data.title}-${index}`" :value="option.value">{{ option.name }}</option>
      </select>
      <vue-tel-input v-if="field_data.input_field == 'tel'" :inputOptions="{ placeholder: '' }" :id="field_data.title" :type="field_data.input_type" v-model="input_text" @input="update_input()" @country-changed="country_changed" class=""></vue-tel-input>
      <input v-if="field_data.input_field == 'input'" :id="field_data.title" :type="field_data.input_type" v-model="input_text" @input="update_input()" @focus="input_focused" class="" />
      <div v-if="field_data.input_field == 'textarea'" class="grow-wrap">
        <textarea :name="field_data.title" :id="field_data.title" v-model="input_text" @input="update_input()" onInput="this.parentNode.dataset.replicatedValue = this.value" class=""></textarea>
      </div>
    </template>
    <template v-else>
      <p class="input-preview">{{ input_text }}</p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'StyledField',
  props: {
    field_data: Object,
    input_text_prop: [String, Boolean],
    is_preview: Boolean,
  },
  data() {
    return {
      input_text: '',
    }
  },
  computed: {
    show_input() {
      if (this.is_preview) {
        return this.input_text
      }
      return true
    },
  },
  mounted() {
    this.copy_prop()
  },
  methods: {
    copy_prop() {
      if (this.input_text_prop) {
        this.input_text = this.input_text_prop
      }
    },
    set_input_text(text) {
      this.input_text = text
    },
    update_input() {
      // console.log('update_input', this.field_data.value, this.input_text)
      this.$emit('update_input', this.field_data.value, this.input_text)
    },
    country_changed(country_obj) {
      console.log(country_obj)
      const dial_code = country_obj.dialCode
      console.log(dial_code)
      this.$emit('update_country_code', dial_code)
    },
    input_focused(event) {
      // console.log("focused", event)
    },
  },
}
</script>

<style lang="postcss" scoped>
.input-field {
  @apply w-full flex flex-col items-start justify-center gap-0.5;
  select {
    @apply w-full py-3 px-3;
  }
  input {
    @apply w-full py-3 px-3;
  }
  textarea {
    @apply w-full py-3 px-3;
  }
  .label-container {
    @apply inline-flex items-center gap-2;
    label {
      @apply text-xs;
      &.required-indicator {
        @apply text-warning lowercase;
      }
    }
  }
}
.grow-wrap {
  /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
  width: 100%;
  display: grid;
}
.grow-wrap::after {
  /* Note the weird space! Needed to preventy jumpy behavior */
  content: attr(data-replicated-value) ' ';

  /* This is how textarea text behaves */
  white-space: pre-wrap;

  /* Hidden from view, clicks, and screen readers */
  visibility: hidden;
}
.grow-wrap > textarea {
  /* You could leave this, but after a user resizes, then it ruins the auto sizing */
  resize: none;

  /* Firefox shows scrollbar on growth, you can hide like this. */
  overflow: hidden;
}
.grow-wrap > textarea,
.grow-wrap::after {
  /* Identical styling required!! */
  border: 1px solid black;
  padding: 0.5rem;
  font: inherit;

  /* Place on top of each other */
  grid-area: 1 / 1 / 2 / 2;
}
.vue-tel-input {
  @apply w-full rounded-none shadow-none gap-0 !important;
  border-right-width: 0px !important;
  border-left-width: 0px !important;
  border-top-width: 0px !important;
}
.vti__dropdown-item {
  font-weight: normal !important;
}
</style>
