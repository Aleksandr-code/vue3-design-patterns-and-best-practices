<script setup>

import { inject, ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ToDoSummary from '../components/ToDoSummary.vue';
import ToDoFilter from '../components/ToDoFilter.vue';
import ToDoList from '../components/ToDoList.vue';
import ToDoItemForm from '../components/ToDoItemForm.vue';
import todoService from '../services/todo';
import eventBus from "../services/eventBus"

const _items = ref([]),
_item = ref({}),
_filter = ref(''),
$modals = inject('$modals'),
$props = defineProps(["id"]),
$router = useRouter(),
_project_name=ref("")

onMounted(loadProject)

watch(()=>$props.id, loadProject)

function showModal(new_item = true, item = {}) {
    if(new_item){
        _item.value = todoService.getDefault()
    } else {
        _item.value = todoService.makeCopy(item)
    }

    $modals.show('newEditItem').then(() => {
        if(new_item){
            _items.value.push(_item.value)
        } else {
            let index = getIndex(item)
            if(index >= 0) {
                _items.value[index] = _item.value
            } else {
                alert('Error updating this item')
            }
        }
        saveProject()
    }, () => {
        // Обработка отмены
    })
}

function deleteItem(item){
    $modals.show("deleteItem").then(() => {
        let index = getIndex(item)
        if(index >= 0){
            _items.value.splice(index, 1)
            saveProject()
        }
        
    }, () => {
        // Обработка отмены
    })
}

function getIndex(item){
    let index = _items.value.findIndex(it => {
        return it.id = item.id
    })
    if(index == -1){
        return false
    } else {
        return index
    }
}

function toggleStatus(item){
    item.status=todoService.toggleStatus(item.status)
    saveProject()
}

function deleteProject(){
    $modals.show("deleteProject").then(()=>{
        // удаление проекта
        todoService.deleteProject($props.id)
        eventBus.emit("#UpdateProjects")
        $router.push({name:"landing"})
    },()=>{})
}

function loadProject(){
    // Имя проекта
    _project_name.value=todoService.getProjectName($props.id)

    // Items
    _items.value=todoService.loadProject($props.id)
}

function saveProject(){
    todoService.saveProject($props.id, _items.value)
}


</script>

<template>

    <div class="project-container">
        <ToDoSummary :items="_items" class="w3-margin-bottom"></ToDoSummary>

        <div class="w3-margin-bottom">
            <ToDoFilter v-model="_filter" class="flex-grow"></TodoFilter>
        </div>

        <ToDoList v-model="_items" :filter="_filter" @toggle="toggleStatus" @edit="showModal(false, $event)" @delete="deleteItem">
            <button @click="showModal(true)" class="w3-button w3-blue w3-round-xxlarge">
                <i class="fa-solid fa-square-plus"></i>
                New item
            </button>
        </ToDoList>

        <Modal name="newEditItem" title="To Do Item">
            <ToDoItemForm v-model="_item"></TodoItemForm>
        </Modal>

        <Modal name="deleteItem" title="Delete To-Do Item">
            <p>
                This action will delete the item:<br>
                <strong>{{_item.text}}</strong>
            </p>
            <p class="w3-text-red w3-pale-red">
                This action cannot be undone.
            </p>
        </Modal>


    </div>

</template>

<style scoped>
.project-container {
    max-width: 56rem;
    padding: 1rem;
    margin: 0 auto;
}
</style>