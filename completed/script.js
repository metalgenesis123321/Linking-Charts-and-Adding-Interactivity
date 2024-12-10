const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 580 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

let fullRoot, currentRoot, fullData;

// Load the dataset dynamically
d3.csv("steam.csv").then(data => {
    // Preprocess data
    data.forEach(d => {
        d.Average_Playtime = +d.average_playtime;
        d.Release_Date = new Date(d.release_date);
        d.Owners = parseInt(d.owners.split("-")[0]); // Use lower range of owners
    });

    fullData = data;

    // Nest the data into a hierarchical structure
    const nestedData = d3.group(data, d => d.genres, d => d.platforms);
    fullRoot = d3.hierarchy(nestedData)
        .sum(d => d.Owners)
        .sort((a, b) => b.value - a.value);
    currentRoot = fullRoot;

    // Create Treemap and initialize Line Chart with default data
    createTreemap(currentRoot);
    initializeLineChart();
    const defaultGenre = currentRoot.children[0].data[0]; // First genre
    updateLineChart(fullData.filter(d => d.genres === defaultGenre)); // Default line chart data
});

// Create Treemap
function createTreemap(root) {
    const svg = d3.select("#treemap_svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const treemap = d3.treemap()
        .size([width, height])
        .padding(1);
    treemap(root);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const nodes = svg.selectAll("rect")
        .data(root.leaves());

    nodes.enter()
        .append("rect")
        .merge(nodes)
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.ancestors()[1]?.data[0])) // Safely access parent data
        .on("mouseover", (event, d) => showTooltip(event, d))
        .on("mouseout", hideTooltip)
        .on("click", (event, d) => {
            const genre = d.ancestors()[1]?.data[0]; // Get the genre from the hierarchy
            console.log(`Clicked on genre: ${genre}`); // Debugging
            const filteredData = fullData.filter(data => data.genres === genre);
            console.log("Filtered Data for Line Chart:", filteredData); // Debugging
            updateLineChart(filteredData);
        })
        .on("dblclick", (event, d) => {
            console.log(`Double-clicked on: ${d.data[0]}`); // Debugging
            zoomIntoTreemap(d);
        });

    d3.select("#back_button")
        .on("click", () => {
            console.log("Back button clicked"); // Debugging
            resetTreemap();
        });

    nodes.exit().remove();
}

function showTooltip(event, d) {
    const genre = d.ancestors()[1]?.data[0] || "Unknown"; // Safely access parent data
    d3.select("#tooltip")
        .style("opacity", 1)
        .html(`Genre: ${genre}<br>Owners: ${d.value}`)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`);
}

function hideTooltip() {
    d3.select("#tooltip").style("opacity", 0);
}

// Initialize empty Line Chart
function initializeLineChart() {
    const svg = d3.select("#linechart_svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`);

    svg.append("g")
        .attr("class", "y-axis");
}

// Update Line Chart based on Treemap selection
function updateLineChart(filteredData) {
    console.log("Filtered Data for Line Chart:", filteredData); // Debugging

    const svg = d3.select("#linechart_svg");
    svg.selectAll("*").remove(); // Clear the chart before rendering

    if (filteredData.length === 0) {
        console.log("No data available for line chart");
        return; // Exit if no data to render
    }

    const xScale = d3.scaleTime()
        .domain(d3.extent(filteredData, d => d.Release_Date))
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.Average_Playtime)])
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(6));

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    const line = d3.line()
        .x(d => xScale(d.Release_Date))
        .y(d => yScale(d.Average_Playtime));

    svg.append("path")
        .datum(filteredData)
        .attr("d", line)
        .attr("stroke", "steelblue")
        .attr("fill", "none");

    svg.selectAll("circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.Release_Date))
        .attr("cy", d => yScale(d.Average_Playtime))
        .attr("r", 3)
        .attr("fill", "red");
}

// Zoom into Treemap
function zoomIntoTreemap(node) {
    if (!node.children) return;

    currentRoot = node;
    createTreemap(node);
    d3.select("#back_button").style("display", "block");
}

// Reset Treemap
function resetTreemap() {
    currentRoot = fullRoot;
    createTreemap(fullRoot);
    d3.select("#back_button").style("display", "none");
}
