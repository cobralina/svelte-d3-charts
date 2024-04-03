<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  export let chartdataUrl = "https://www.faz.net";
  export let containerWidth = "300";
  export let containerHeight = "200";
  export let chartHeadline = "";
  export let lineColor = "#ffccff";
  export let strokeWidth = 3;

  onMount(() => {
    // SVG Setup
    const svg = d3.select("#linechart");
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
    fetch(chartdataUrl, { headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then((chartData) => {
        // Define scales
        const x = d3.scaleLinear().range([0, containerWidthNumber - 40]);
        const y = d3.scaleLinear().range([height, 0]);

        // Set domain for scales
        x.domain(d3.extent(chartData, (d) => d.year));
        y.domain([
          parseInt(d3.min(chartData, (d) => d.value)),
          d3.max(chartData, (d) => d.value),
        ]);

        // Add x-axis
        g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(7));
        // Add y-axis
        g.append("g").call(d3.axisLeft(y).ticks(4));
        // Add x-grid
        /*     g.append("g")
          .attr("class", "axis-grid")
          .call(
            d3
              .axisBottom(x)
              .tickFormat(d3.format("d"))
              .tickSize(height)
              .tickFormat("")
              .ticks(7)
          ); */
        // Add y-grid
        g.append("g")
          .attr("class", "axis-grid")
          .call(
            d3
              .axisLeft(y)
              .tickFormat(d3.format("d"))
              .tickSize(-containerWidth + 40)
              .tickFormat("")
              .ticks(4)
          );
        // Define line generator
        const line = d3
          .line()
          .x((d) => x(d.year))
          .y((d) => y(d.value));
     
          //add Bigger Hover-Line
          g.append("path")
          .datum(chartData)
          .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke", "#ffffff")
          .attr("stroke-opacity", 0.1)
          .attr("stroke-width", 20)
          .attr("style", "cursor:pointer")
          .attr("d", line)
          // Tooltip Functions
          .on("mouseover", (e) => {
            tooltip.transition().duration(200).style("opacity", 1);
          })
          .on("mousemove", (e) => {
            const [xMouse, yMouse] = d3.pointer(e);
            const bisect = d3.bisector((d) => d.year).right;
            const index = bisect(chartData, x.invert(xMouse));
            const d = chartData[index];

            tooltip
              .attr("transform", `translate(${x(d.year)-10},${y(d.value)})`)
              .select("text")
              .text(`${d.year}: ${d.value}`);
          })
          .on("mouseout", () => {
            tooltip.transition().duration(200).style("opacity", 0);
          });
             // Add the visible line
        g.append("path")
          .datum(chartData)
          .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke", lineColor)
          .attr("stroke-width", strokeWidth)
          .attr("d", line);

        // Tooltip
        let tooltip = g
          .append("g")
          .attr("id", "tooltip")
          .style("opacity", 0)
          .style("pointer-events", "none");

        tooltip
          .append("rect")
          .attr("rx", 2)
          .attr("width", 80)
          .attr("height", 30)
          .attr("fill", "#e9e9e9")
          .attr("id", "tooltip-background");
        tooltip
          .append("text")
          .attr("x", 10)
          .attr("y", 20)
          .attr("id", "tooltip-value")
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten:", error);
      });
  });

  const containerWidthNumber = +containerWidth;
  const containerHeightNumber = +containerHeight;
</script>

<div>
    <h2>
        { chartHeadline }
    </h2>
  <svg
    id="linechart"
    width={containerWidthNumber}
    height={containerHeightNumber}
    color="#666666"
  ></svg>
</div>

<style>
</style>
