<template>
  <h1>Compilation of Squirrel Data in Central Park</h1>
  <h2>Squirrel Age</h2>
  <div class="container">
    <Pie v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
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
  labels: ['Adult', 'Juvenile'],
  datasets: [
    {
      label: 'Squirrels',
      data: [],
      backgroundColor: ['#faf7c3', '#ece1fc'],
      borderWidth: 2.5
    }
  ]
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  backgroundColor: ['#faf7c3', '#ece1fc'],
  borderWidth: 2.5
})
onMounted(async () => {
  try {
    await getSquirrels()
    const adult = squirrels.value.filter((entry) => entry.age === 'Adult')
    const juvenile = squirrels.value.filter((entry) => entry.age === 'Juvenile')

    chartData.value.datasets[0].data.push(adult.length, juvenile.length)

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
