<template>
  <button :type="buttonType"
          :disabled="disabled"
          class="create-button"
          :class="className"
  >
    {{ value }}
  </button>
</template>

<script>
    export default {
        name: "CreateButton",
        props: {
            value: {
                type: String,
                default: 'Create'
            },
            className: {
                type: String,
                default: ''
            },
            buttonType: {
                type: String,
                default: 'submit',
                validator: value => {
                    return ['button', 'reset', 'submit'].indexOf(value) !== -1;
                }
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style module lang="scss">
  .create-button {
    background: #50d5ad url("./images/create-btn-icon.png") 10% center no-repeat;
    width: 130px;
    height: 30px;
    border-radius: 15px;
    font-size: 15px;
    color: #ffffff;
    font-weight: 500;
    border: none;

    &:disabled {
      background-color: #bdbdbd;
    }
  }
</style>