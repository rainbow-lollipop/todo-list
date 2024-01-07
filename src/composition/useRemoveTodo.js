export default function useRemoveTodo (todoRef) {
  const removeOne = (todo) => {
    todoRef.value.splice(todoRef.value.indexOf(todo), 1);
  }
  const removeCompleted = () => {
    todoRef.value = todoRef.value.filter(i => !i.completed)
  }
  return {
    removeOne,
    removeCompleted
  }
}