import { ref, watchEffect } from 'vue'
import * as todoStorage from '../utils/todoStorage'

export default function useTodoList() {
  const todoRef = ref(todoStorage.getTodoList());
  watchEffect(() => {
    todoStorage.setTodoList(todoRef.value)
  })
  return {
    todoRef
  }
}