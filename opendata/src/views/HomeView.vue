<template>
  <div>{{ squirrels }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const squirrels = ref('')
async function getSquirrels() {
  let res = await fetch(
    'https://data.cityofnewyork.us/resource/vfnx-vebw.json?$select=highlight_fur_color,above_ground_sighter',
    {
      method: 'GET',
      headers: {
        'X-AppToken': 'L97vo28lyzPVrGAECkG5sfwe'
      }
    }
  )
  let data = await res.json()
  console.log(data)
  squirrels.value = await data
}
getSquirrels()
</script>

<style scoped></style>
