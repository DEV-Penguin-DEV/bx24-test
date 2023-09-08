<template>
  <h1 class="main-title">BX24 TEST</h1>

  <div class="tasks">
    <div class="tasks__controlers">
      <div class="add-new-task">
        <input
          class="tasks__input add-new-task__input"
          type="text"
          placeholder="Task name"
          ref="taskName"
        />
        <button class="tasks__button add-new-task__button" @click="addTask">
          Add task
        </button>
      </div>

      <div class="add-new-task">
        <input
          class="tasks__input add-new-task__input"
          type="text"
          placeholder="Task ID"
          ref="taskId"
        />
        <button class="tasks__button add-new-task__button" @click="removeTask">
          Remove task
        </button>
      </div>
    </div>

    <ul class="tasks__list">
      <li class="task" v-for="(task, index) in tasks" :key="index">
        <h2 class="task__title">{{ task.title }}</h2>
        <p class="task__text">Task ID: {{ task.id }}</p>
        <p class="task__text">Task STATUS: {{ task.status }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import BX24API from "../bx24";
export default {
  data() {
    return {
      tasks: [],
    };
  },
  async mounted() {
    const promisArray = await getTasks();
    this.tasks = Array.from(promisArray);
  },

  methods: { addTask, removeTask },
};

async function addTask() {
  const taskName = this.$refs.taskName.value;
  const result = await BX24API.callMethod(
    "tasks.task.add",
    {
      fields: {
        TITLE: taskName,
        DESCRIPTION: "Test description",
        RESPONSIBLE_ID: 1,
      },
    },
    () => {}
  );
  this.$refs.taskName.value = "";
  const promisArray = await getTasks();
  this.tasks = Array.from(promisArray);
  return result;
}

async function removeTask() {
  const taskId = this.$refs.taskId.value;
  const result = await BX24API.callMethod(
    "tasks.task.delete",
    { taskId: taskId },
    function () {}
  );
  this.$refs.taskId.value = "";
  const promisArray = await getTasks();
  this.tasks = Array.from(promisArray);
  return result;
}

async function getTasks() {
  const result = await BX24API.callMethod(
    "tasks.task.list",
    {
      select: ["ID", "TITLE", "STATUS"],
      order: { ID: "asc" },
    },
    function () {}
  );
  return result.result.tasks;
}
</script>

<style lang="scss" scoped>
.tasks {
  display: flex;
  gap: 25px;
  margin: 0 auto;
  justify-content: center;
  align-items: flex-start;
}

.tasks__controlers {
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 20%;
}

.add-new-task {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tasks__input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: none;
  border-bottom: 1px solid black;
}

.task__text {
  text-align: left;
  font-size: 12px;
}

.task__title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.tasks__list {
  min-width: 60%;
  min-height: 40px;
  border-radius: 10px;
  border: 2px solid lightgreen;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px 15px;
}

.tasks__button {
  color: white;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 0;
  box-sizing: border-box;

  width: 100%;
  display: block;
  background-color: rgb(86, 193, 229);
  transition: 0.5s;

  &:hover {
    background-color: rgb(38, 176, 222);
    transition: 0.5s;
  }
}

.task {
  padding: 10px;
  border-radius: 20px;
  border: 2px solid lightgreen;
  min-width: 150px;
}
</style>
