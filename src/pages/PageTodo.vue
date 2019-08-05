<i18n>
  {
    "en": {
      "addTask": {
        "placeholder": "Type your new task",
        "button": "Create"
      }
    },
    "ru": {
      "addTask": {
        "placeholder": "Введите новую задачу",
        "button": "Создать"
      }
    }
  }
</i18n>

<template>
  <fragment>
    <form
        class="form"
        v-on:submit.prevent="$_submit_"
    >
      <FormField
          v-model="value"
          :placeholder="$t('addTask.placeholder')"
      />
      <CreateButton
          type="submit"
          :value="$t('addTask.button')"
          :disabled="disableCreate"
      />
    </form>
    <div :class="$style['task-list']">
      <TodoTask v-for="item in this.taskList"
                :key="item.id + idTypeMap.get(item.id).type.charAt(0) + idTypeMap.get(item.id).text.length"
                :id="item.id"
                v-on:remove="remove"
                v-on:check="onCheck"
                v-on:edit="function(payload) {return idTypeMap.get(item.id).func(payload)}"
                :edit-type="idTypeMap.get(item.id).type"
                :text="idTypeMap.get(item.id).text"
      >
        <h3 class="task__title" v-if="taskId !== item.id || !isEditing">{{ item.text }}</h3>
        <input v-focus v-else v-model="editValue" type="text" class="task__title"/>
      </TodoTask>
    </div>
  </fragment>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";
    import { Fragment } from 'vue-fragment';
    import FormField from "../components/FormField";
    import CreateButton from "../components/buttons/CreateButton";
    import TodoTask from "../components/task/todo/TodoTask";

    export default {
        name: "PageTodo",
        components: {
            Fragment, FormField, CreateButton, TodoTask
        },
        data() {
            return {
                value: "",
                editValue: "",
                locale: "en"
            };
        },
        methods: {
            $_submit_() {
              this.createTask(this.value);
              this.value = '';
            },
            remove(id) {
              this.deleteTask(id);
            },
            onCheck(id) {
              this.markTaskDone(id);
              this.moveToDone();
            },
            onTaskEdit(payload) {
                const {id, text} = payload;
                this.startEditing(id, text);
                this.editValue = text;
            },
            onTaskSubmit(payload) {
                if (this.cacheText === this.editValue) {
                    this.submitTaskNoPatch();
                } else {
                    this.submitTask({"id": payload.id, "value": this.editValue});
                }
            },
            getItemText(item) {
                return this.taskId !== item.id ? item.text : ((this.cacheText !== '' && !this.isEditing) ? this.cacheText : this.editValue);
            },
            getItemEditType(id) {
                return this.isEditing && this.taskId === id ? 'submit' : 'edit';
            },
            getItemEditFunction(id) {
                return this.isEditing && this.taskId === id ? this.onTaskSubmit : this.onTaskEdit;
            },
            ...mapActions({
                whoami: "user/whoAmI",
                createTask: "todo/createTask",
                getList: "todo/getList",
                getTask: "todo/getTask",
                deleteTask: "todo/deleteTask",
                markTaskDone: "todo/markTaskDone",
                startEditing: "todo/startEditing",
                submitTask: "todo/submitTask",
                submitTaskNoPatch: "todo/submitTaskNoPatch"
            }),
            ...mapMutations("done", {
                moveToDone: "TASK_DONE"
            })
        },
        computed: {
            ...mapState({
                authorized: state => state.user.authorized,
                processing: state => state.user.processing,
                taskLocation: state => state.todo.taskLocation,
                taskList: state => state.todo.taskList,
                error: state => state.todo.error,
                isList: state => state.todo.isList,
                taskId: state => state.todo.taskId,
                isEditing: state => state.todo.isEditing,
                cacheText: state => state.todo.cacheText
            }),
            idItemMapEntries: function() {
                return this.taskList.map(task => [task.id, task]);
            },
            idTypeMap: function() {
                return new Map(this.idItemMapEntries.map(elem => {
                    const text = this.getItemText(elem[1]);
                    const type = this.getItemEditType(elem[0]);
                    const func = this.getItemEditFunction(elem[0]);
                    return [elem[0], {text, type, func}];
                }));
            },
            disableCreate: function() {
                return !this.value;
            }
        },
        created: function() {
            this.whoami();
            this.getList();
        },
        watch: {
            authorized: function (newVal) {
                if (!newVal) {
                    this.$router.replace("/login");
                } else {
                    this.getList();
                }
            },
            error: function (newVal) {
                if (newVal != null && newVal.message === '403') {
                    this.$router.replace("/login");
                }
            },
            isList: function (newVal) {
                if (!newVal) {
                    this.getList();
                }
            },
            taskLocation: function(location) {
                if (location) {
                    this.getTask(location);
                }
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        }
    }
</script>

<style module>
  .task-list {
    margin-top: 15px;
  }
</style>