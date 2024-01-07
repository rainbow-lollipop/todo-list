const TODO_KEY = 'toDoList';

export function getTodoList() {
  const list = localStorage.getItem(TODO_KEY);
  if(list) {
    return JSON.parse(list)
  }
  return [];
}

export function setTodoList(toDos) {
  localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

export function getRandomId() {
  return Date.now() + Math.random().toString(16).substring(2, 4);
}

export function filter(toDos, visibility='All') {
  if(visibility === 'All') {
    return toDos 
  }else if(visibility === 'Active') {
    return toDos.filter(item => !item.completed)
  }else if(visibility === 'Completed') {
    return toDos.filter(item => item.completed)
  }
  throw new Error('你传的visibility不合法')
}