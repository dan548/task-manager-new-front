<template>
  <article class="task">
    <div :class="$style['check-title-keeper']">
      <CheckButton :class="checkButtonClassName"
                   v-on:click="$emit('check', id)"
      />
      <slot name="title"></slot>
    </div>
    <div :class="$style['button-keeper']">
      <slot></slot>
      <ManipulateButton v-on:click="$emit('remove', id)"
                        buttonName="remove"/>
    </div>
  </article>
</template>

<script>
    import CheckButton from "../buttons/CheckButton";
    import ManipulateButton from "../buttons/ManipulateButton";

    export default {
        name: "Task",
        components: {
          CheckButton, ManipulateButton
        },
        props: {
            id: {
              type: String,
              required: true
            },
            checkButtonClassName: {
                type: String,
                required: true
            }
        }
    }
</script>

<style module>
  .button-keeper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 4%;
    flex-grow: 2;
  }

  .check-title-keeper {
    display: flex;
    font-size: 15px;
    font-weight: lighter;
    flex-grow: 1.5;
    flex-shrink: 5;
    flex-basis: 90%;
  }
</style>

<style lang="scss">
  .task__title {
    margin: 0;
    border: 0 none;
    font: inherit;
    caret-color: #97e3cc;
    width: 100%;
    text-align: left;
  }

  .task {
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    border: 0.25px solid rgba(0,0,0,0.1);
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: 15px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      box-shadow: 0 1px 3px #97e3cc;
      border: 0.25px solid #97e3cc;

      .manipulate-button {
        visibility: visible;
      }
    }
  }
</style>