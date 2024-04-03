<script>
import Linechart from './lib/Linechart.svelte'
import Barchart from "./lib/Barchart.svelte";
import Bargraph from "./lib/Bargraph.svelte";

const lineChartData = "./data/linechart-data.json";
const barChartData = "./data/barchart-data.json";


</script>

<main>

  <h1>D3 Charts in Svelte</h1>

  <div class="chart">
    <Linechart chartdataUrl={ lineChartData } containerWidth="800" containerHeight="300" chartHeadline="Liniendiagramm" />
  </div>
  <div class="chart">
    <Barchart chartdataUrl={ barChartData } containerWidth="800" containerHeight="300" chartHeadline="Säulendiagramm" />
  </div>
  <div class="chart">
    <Bargraph chartdataUrl={ barChartData } containerWidth="600" containerHeight="400" chartHeadline="Balkendiagramm" />
 </div>



</main>

<style>
</style>
