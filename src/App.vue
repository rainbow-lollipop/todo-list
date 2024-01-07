<template>
  <div>
    <div class="app-title">ToDos</div>
    <div class="list-container">
      <div class="input-box">
        <div>
          <input 
            type="checkbox"
            :checked="allDoneRef"
            @input="$event => setAllChecked($event.target.checked)"
          />
          <!-- v-model="allDoneRef" -->
          <!-- @change="setAllCompleted($event.target.checked)" -->
        </div>
        <input
          autofocus=""
          autocomplete=""
          placeholder="What needs to de done?"
          class="todo-input"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
          style="width: 95%;"
        />
      </div>
      <div class="list-box">
        <div v-for="item in filterToDosRef" :key="item.id" class="list-item">
          <span>
            <div :class="{editing: item === editingTodoRef}">
              <input type="checkbox" v-model="item.completed"/>
              <span 
                style="margin-left: 10px;" 
                :class="{completed: item.completed}"
                @dblclick="editTodo(item)"
              >
                {{ item.title }}
              </span>
            </div>
            <input 
              v-model="item.title"
              @blur="doneTodo(item)"
              @keyup.enter="doneTodo(item)"
              @keyup.escape="cancelEdit(item)"
              class="editInput" type="text"
            />
          </span>
          <span class="del-icon" @click="removeOne(item)">X</span>
          <!-- <span v-if="item.completed" class="success-tip">完成</span>
          <span v-else class="none-tip">未完成</span> -->
        </div>
      </div>
      <div class="bottom-info" v-show="todoRef.length > 0">
        <span style="line-height: 32px;user-select: none;">{{ filterUndoRef }} item{{ filterUndoRef===1?"":"s" }} left</span>
        <div>
          <span class="hover-text" :class="{ active: visibilityRef === 'All' }">
            <a href="#/All">ALL</a>
          </span>
          <span class="hover-text" :class="{ active: visibilityRef === 'Active' }">
            <a href="#/Active">Active</a>
          </span>
          <span class="hover-text" :class="{ active: visibilityRef === 'Completed' }">
            <a href="#/Completed">Completed</a>
          </span>
        </div>
        <div style="line-height: 32px;">
          <span class="hover-text" @click="removeCompleted">Clear completed</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useTodoList from './composition/useTodoList'
import useNewTodo from './composition/useNewTodo'
import useFilter from './composition/useFilter'
import useEditTodo from './composition/useEditTodo'
import useRemoveTodo from './composition/useRemoveTodo'

export default {
  setup() {
    const { todoRef } = useTodoList();
    return {
      todoRef,
      ...useNewTodo(todoRef),
      ...useFilter(todoRef),
      ...useEditTodo(todoRef),
      ...useRemoveTodo(todoRef)
    }
  }
}
</script>

<style>
  .app-title {
    width: 100%;
    text-align: center;
    color: #a77069;
    font-size: 32px;
    margin: 20px 0;
  }
  .list-container {
    width: 600px;
    /* height: 400px; */
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  }
  .input-box {
    display: flex;
  }
  .input-box div:nth-child(1) {
    margin: 0 auto;
    line-height: 60px;
  }
  .todo-input {
    width: 100%;
    border: none;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-size: 28px;
    border-bottom: 1px solid #eee;
  }
  .todo-input:focus {
    border: none;
  }
  .list-item {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 40px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  .success-tip {
    color: green;
    font-size: 14px;
  }
  .none-tip {
    color: red;
    font-size: 14px;
  }
  .completed {
    text-decoration: line-through;
    color: #999;
  }
  .bottom-info {
    /* height: 40px; */
    display: flex;
    justify-content: space-between;
    padding: 15px;
    color: #999;
    font-size: 14px;
  }
  .bottom-info div:nth-child(1) span {
    margin-right: 100px;
  }
  .bottom-info div:not(:nth-child(1)) span {
    margin: 0 10px;
    cursor: pointer;
    display: inline-block;
  }
  .bottom-info div:not(:nth-child(1)) span.active { 
    border: 1px solid #ddd;
    padding: 5px;
  }
  .editInput {
    width: 450px;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    display: none;
  }
  .editing {
    display: none;
  }
  .editing+input{
    display: inline-block;
  }
  .del-icon {
    color: #ddd;
    cursor: pointer;
  }
  .hover-text:hover {
    color: #333;
  }
</style>
