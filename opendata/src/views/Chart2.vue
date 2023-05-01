<template>
  <h1>Location of Squirrels</h1>
  <div class="container">
    <Doughnut v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(Title, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const squirrels = ref('')
async function getSquirrels() {
  let res = await fetch(
    'https://data.cityofnewyork.us/resource/vfnx-vebw.json?$select=highlight_fur_color,location,age'
  )

  let data = await res.json()
  squirrels.value = data
  console.log(data)
}
//   getSquirrels()

const loaded = ref(false)
const chartData = ref({
  labels: ['Above Ground', 'Ground Level'],
  datasets: [
    {
      label: 'Squirrel Height',
      data: [],
      backgroundColor: ['#b4d2fa', '#bef7d4'],
      borderWidth: 2.5
    }
  ]
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  backgroundColor: ['#b4d2fa', '#bef7d4'],
  borderWidth: 2.5
})
onMounted(async () => {
  try {
    await getSquirrels()
    const above_ground = squirrels.value.filter((entry) => entry.location === 'Above Ground')
    const below_ground = squirrels.value.filter((entry) => entry.location === 'Ground Plane')

    chartData.value.datasets[0].data.push(above_ground.length, below_ground.length)

    loaded.value = true
  } catch (e) {
    console.error(e)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Darumadrop+One&display=swap');
* {
  font-family: 'Darumadrop One', cursive;
}
</style>
