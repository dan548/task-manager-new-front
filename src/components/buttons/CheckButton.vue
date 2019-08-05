<template>
  <button v-on:click="$emit('click')"
          :class="$style['check-button'] + ' ' + buttonClass"
  >
  </button>
</template>

<script>
    export default {
        name: "CheckButton",
        props: {
            buttonType: {
                type: String
            }
        },
        data: function () {
            return {
                buttonClass: this.buttonType ? this.buttonType.split(' ').map(x => x + '-button').join(' ') : ''
            }
        }
    }
</script>

<style module>
  .check-button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;

    cursor: pointer;
    width: 14px;
    height: 14px;
    margin: 0.3em 1em 0 0.5em;
  }
</style>

<style scoped lang="scss">
  .unchecked-button {
    background: transparent url("./images/O.png") no-repeat;

    &:hover {
      background: transparent url("./images/O_hover.png") no-repeat;
    }
  }

  .checked-button {
    background: transparent url("./images/done_task_gray.png") no-repeat;
    pointer-events: none;
  }
</style>

