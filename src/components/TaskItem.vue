<template>
  <div class="container-new-tasks">
    <h3 :class="props.task.is_complete ? 'class-one' : 'class-two'">
      {{ task.title }}
    </h3>
    <p :class="props.task.is_complete ? 'class-one' : 'class-two'">
      {{ task.description }}
    </p>
    <div class="content-buttons">
      <button
        class="button-class-edits-tasks delete"
        @click="showModal = true"
      ></button>
      <!-- El modal emergente -->
      <div class="modal blur-in" v-if="showModal">
        <h2>Are you sure??</h2>
        <p>No hay vuelta atrás</p>
        <button @click="deleteTask">Yes, I am</button>
        <button class="button-cancel-delete" @click="showModal = false">
          NO! Cancel, cancel
        </button>
      </div>
      <button
        class="button-class-edits-tasks completed"
        @click="completeTask"
      ></button>
      <button class="button-class-edits-tasks edit" @click="showInput"></button>
    </div>
    <div class="modal-task-edit bounce-top" v-if="inputContainer">
      <input type="text" v-model="currentTaskTitle" />
      <textarea class="textareaTest" type="text" v-model="currentTaskDescription" />
      <button class="button-class-edits-tasks edit-task" @click="editTask">
        Edit Task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";
// para que el área de textarea se ajuste al texto que se le pone

const getTextareas = () => {
  setTimeout(() => {
  const textarea = document.querySelectorAll("textarea");
  console.log(textarea);
  textarea.forEach((area) => {
    area.addEventListener("keyup", (e) => {
      console.log('estamos entrando en eventListener');
      area.style.height = "6rem";
      let scHeight = e.target.scrollHeight;
      area.style.height = `${scHeight}px`;
    });
  });
}, 1000);}

getTextareas();

// definir emits para pasar lógica y eventos hacia componentes padres

const emit = defineEmits(["taskComplete", "editChild"]);

// funcion para completar tarea que se encarga de enviar la info al padre
// import para traer la animación de confetti
// import confetti from "https://cdn.skypack.dev/canvas-confetti";
const completeTask = () => {
  // console.log("click");
  // función para generar la animación de confetti cuando presionas un botón hay que arreglarlo de manera que solo actúe con la presión del botón de complete
  //   confetti();
  // window.addEventListener("click", () => {
  //   confetti();
  // });

  emit("taskComplete", props.task);
};
// variable para usar tienda de tarea facil
const taskStore = useTaskStore();
// variable para recibir informacion de la tarea mediante prop como .Objeto
const props = defineProps({
  task: Object,
});

// funcion para mostrar y ocultar inputs
const inputContainer = ref(false);
const currentTaskTitle = ref("");
const currentTaskDescription = ref("");
const showInput = () => {
  console.log("click");
  inputContainer.value = !inputContainer.value;
  currentTaskTitle.value = props.task.title;
  currentTaskDescription.value = props.task.description;
  getTextareas();
};
// funcion con validacion + envio de datos y eventos mediane emit
const editTask = () => {
  if (
    currentTaskTitle.value.length === 0 ||
    currentTaskDescription.value.length === 0
  ) {
    alert("Title or Description can not be empty");
  } else {
    const newTaskEdited = {
      title: currentTaskTitle.value,
      description: currentTaskDescription.value,
      id: props.task.id,
    };
    emit("editChild", newTaskEdited);

    inputContainer.value = !inputContainer.value;
  }
};

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

const showModal = ref(false);
const showModalToggle = () => {
  showModal.value = !showModal.value;
};
</script>

<style scoped>
</style>



<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
