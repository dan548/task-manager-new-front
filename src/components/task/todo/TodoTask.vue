<template>
  <Task v-on:check="$emit('check', $event)"
        v-on:remove="$emit('remove', $event)"
        :id="id"
        checkButtonClassName="unchecked-button"
  >
    <template v-slot:title>
      <slot></slot>
    </template>
    <template v-slot:default>
      <ManipulateButton v-on:click="$emit('edit', {id, text})"
                        button-name="edit"/>
    </template>
  </Task>
</template>

<script>
  import Task from '../Task';
  import ManipulateButton from "../../buttons/ManipulateButton";

    export default {
        name: "TodoTask",
        components: {
            Task, ManipulateButton
        },
        props: {
            id: {
              type: String,
              required: true
            },
            text: {
                type: String
            },
            editType: {
                type: String
            }
        }
    }
</script>

<style lang='scss'>

</style>