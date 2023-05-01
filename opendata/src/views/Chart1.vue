<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const squirrels = ref('')
async function getSquirrels() {
  let res = await fetch(
    'https://data.cityofnewyork.us/resource/vfnx-vebw.json?$select=highlight_fur_color,location, age'
  )

  let data = await res.json()
  squirrels.value = data
  console.log(data)
}
//   getSquirrels()

const loaded = ref(false)
const chartData = ref({
  labels: ['Cinnamon', 'White', 'Gray', 'Black'],
  datasets: [
    {
      label: 'Squirrels',
      data: [],
      backgroundColor: ['#825d4a', '#ffffff', '#808080', '#000000'],
      borderWidth: 2.5
    }
  ]
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  backgroundColor: ['#825d4a', '#ffffff', '#808080', '#000000'],
  borderWidth: 2.5
})
onMounted(async () => {
  try {
    await getSquirrels()
    const cinnamon = squirrels.value.filter((entry) => entry.highlight_fur_color === 'Cinnamon')
    const white = squirrels.value.filter((entry) => entry.highlight_fur_color === 'White')
    const gray = squirrels.value.filter((entry) => entry.highlight_fur_color === 'Gray')
    const black = squirrels.value.filter((entry) => entry.highlight_fur_color === 'Black')

    chartData.value.datasets[0].data.push(cinnamon.length, white.length, gray.length, black.length)

    console.log(cinnamon)
    loaded.value = true
  } catch (e) {
    console.error(e)
  }
})
</script>

<style scoped></style>
