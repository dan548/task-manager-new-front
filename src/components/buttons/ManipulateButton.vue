<template>
  <button v-on:click="$emit('click')"
          class="manipulate-button"
          :class="buttonClass"
  >
  </button>
</template>

<script>
    export default {
        name: "ManipulateButton",
        props: {
          buttonName: {
              type: String,
              required: true
          }
        },
        data: function () {
            return {
              buttonClass: this.buttonName.split(' ').map(x => x + '-button').join(' ')
            }
        }
    }
</script>

<style lang="scss">
  .manipulate-button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;

    cursor: pointer;
    height: 14px;
    visibility: hidden;
  }
</style>

<style scoped lang="scss">
  .edit-button {
    background: transparent url("./images/pencil.png") no-repeat;
    width: 14px;

    &:hover {
      background: transparent url("./images/pencil_blue.png") no-repeat;
    }
  }

  .submit-button {
    background: transparent url("./images/baseline-done-24px.png") no-repeat;
    width: 14px;
  }

  .remove-button {
    background: transparent url("./images/delete.png") no-repeat;
    width: 11px;

    &:hover {
      background: transparent url("./images/delete_red.png") no-repeat;
    }
  }
</style>