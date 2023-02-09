import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", () => {
  // Esta tienda utiliza el Composition API
  const tasksArr = ref(null);
  // conesguir tareas de supabase
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    return tasksArr.value;
  };
  // añadir tareas de supabase
  const addTask = async (title, description) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
      },
    ]);
  };
  // completar tarea de supabase -apuntando al valor booleano is_complete

  // const { data, error } = await supabase
  // .from('tasks')
  // .update({ other_column: 'otherValue' })
  // .eq('some_column', 'someValue')

  const completeTask = async (valorBooleano, id) => {
    
    let { data: tasks, error } = await supabase.from('tasks')
    .update({is_complete: valorBooleano})
    .match({id: id})

  }

  // editar tarea en supabase
  const editTaskSupabase = async (title, id, description) => {
    
    let { data: tasks, error } = await supabase.from('tasks')
    .update({title: title, description: description})
    .match({id: id})

  }

  // borrar tareas de supabase
  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };
  return { tasksArr, fetchTasks, addTask, deleteTask, completeTask, editTaskSupabase, };
});
