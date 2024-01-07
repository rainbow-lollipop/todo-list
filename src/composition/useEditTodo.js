import { ref, computed } from 'vue';

export default function useEditTodo(todoRef) {
  const editingTodoRef = ref(null);
  let oldTodoTitle = null;
  const editTodo = (todo) => {
    oldTodoTitle = todo.title;
    editingTodoRef.value = todo;
  }
  const doneTodo = (todo) => {
    editingTodoRef.value = null;
    const title = todo.title.trim();
    if(title) {
      todo.title = title;
    }else {
      // 文本框为空时，删除
      todoRef.value.splice(todoRef.value.indexOf(todo), 1);
    }
  }
  const cancelEdit = (todo) => {
    editingTodoRef.value = null;
    todo.title = oldTodoTitle;
  }
  const allDoneRef = computed({
    get() {
      return todoRef.value.filter(i => !i.completed).length === 0 && todoRef.value.length!=0
    },
    // set(checked) {
    //   todoRef.value.forEach(i => {
    //     i.completed = checked;
    //   })
    // }
  })
  const setAllChecked = (checked) => {
    todoRef.value.forEach(i => {
      i.completed = checked;
    })
  }

  return {
    editingTodoRef,
    editTodo,
    doneTodo,
    cancelEdit,
    allDoneRef,
    setAllChecked
  }
}