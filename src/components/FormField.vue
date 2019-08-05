<template>
  <input
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      class="form-field"
      :class="{className: className}"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :id="id"
  />
</template>

<script>
    export default {
        name: "FormField",
        props: {
            className: {
                type: String,
                default: ''
            },
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
            type: {
                type: String,
                default: 'text'
            },
            value: String
        }
    }
</script>

<style scoped>
  .form-field {
    border: none;
  }

  .form-field::placeholder {
    color: #939393;
  }
</style>