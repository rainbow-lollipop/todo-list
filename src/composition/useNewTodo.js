import { ref } from 'vue'
import { getRandomId } from '../utils/todoStorage'

export default function useNewTodo(todoRef) {
  const newTodoRef = ref("");
  const addTodo = () => {
    const value = newTodoRef.value && newTodoRef.value.trim();
    if(!value) {
      return
    }
    const obj = {
      id: getRandomId(),
      title: newTodoRef.value,
      completed: false
    }
    todoRef.value.push(obj);
    newTodoRef.value = "";
  }
  return {
    newTodoRef,
    addTodo
  }
}