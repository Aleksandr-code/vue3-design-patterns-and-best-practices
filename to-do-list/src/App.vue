<script setup>
  import ToDos from "@components/ToDos.vue";
  import {inject, ref} from "vue"

  const $modals = inject("$modals"),
  _result = ref("")

  function showModal() {
    _result.value = "";
    $modals.show("myModal").then(() => {
        _result.value = "Modal accepted"
    }, () => {
        _result.value = "Modal cancelled"
    })
}

</script>

<template>
  <div class="app w3-light-gray">
    <ToDos />
    <div class="test">
      <button @click="showModal">
            Show modal
      </button>
      <div>{{_result}}</div>
      <Modal name="myModal" title="Modal example">
              Some important content here
      </Modal>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  padding: 5rem;
}
</style>
