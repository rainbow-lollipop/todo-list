import { ref, onMounted, onUnmounted, computed } from 'vue'
import { filter } from '../utils/todoStorage'

const valueHash = ['All', 'Active', 'Completed'];

export default function useFilter(todoRef) {
  const visibilityRef = ref('All');
  
  const hashchangeFun = () => {
    const reg = /#\/?/;
    const hash = location.hash.replace(reg, '');
    if(valueHash.includes(hash)) {
      visibilityRef.value = hash;
    }else {
      location.hash = "";
      visibilityRef.value = 'All';
    }
  }
  onMounted(() => {
    window.addEventListener("hashchange", hashchangeFun);
  })
  onUnmounted(() => {
    window.removeEventListener("hashchange", hashchangeFun);
  })
  const filterToDosRef = computed(() => {
    return filter(todoRef.value, visibilityRef.value);
  })

  const filterUndoRef = computed(() => {
    return filter(todoRef.value, 'Active').length;
  })

  return {
    visibilityRef,
    filterToDosRef,
    filterUndoRef
  }
}