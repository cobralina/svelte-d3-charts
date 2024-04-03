<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  export let chartdataUrl = "https://www.faz.net";
  export let containerWidth = "300";
  export let containerHeight = "200";
  export let chartHeadline = "";
  export let barColor = "#ffccff";

  onMount(() => {
    // SVG Setup
    const svg = d3.select("#barchart");
    const margin = { top: 20, right: 50, bottom: 40, left: 30 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .attr("viewBox", "0 0 " + containerWidth + " 400")
      .attr("width", containerWidth);

    // Fetch Data
    fetch(chartdataUrl)
      .then((response) => response.json())
      .then((data) => {
        // Define scales
        const x = d3
          .scaleBand()
          .domain(data.map((d) => d.year))
          .range([0, width])
          .padding(0.1);
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.value)])
          .nice()
          .range([height, 0]);

        // Add x-axis
        g.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));

        // Add y-axis
        g.append("g").call(d3.axisLeft(y).ticks(4));

        // Add bars
        g.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d) => x(d.year))
          .attr("y", (d) => y(d.value))
          .attr("width", x.bandwidth())
          .attr("height", (d) => height - y(d.value))
          .attr("fill", barColor);

        // Add value labels
        g.selectAll(".value-label")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "value-label")
          .attr("x", (d) => x(d.year) + x.bandwidth() / 2)
          .attr("y", (d) => y(d.value) + 25)
          .attr("text-anchor", "middle")
          .text((d) => d.value);
      })
      .catch((error) => console.error("Fehler beim Abrufen der Daten:", error));
  });

  const containerWidthNumber = +containerWidth;
  const containerHeightNumber = +containerHeight;
</script>

<div>
  <h2>
    {chartHeadline}
  </h2>
  <svg
    id="barchart"
    width={containerWidthNumber}
    height={containerHeightNumber}
    color="#666666"
  ></svg>
</div>

<style>
</style>
