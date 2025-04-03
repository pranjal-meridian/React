import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function D3LineChart() {
    const svgRef = useRef();
    
    useEffect(() => {
        // Data
        const data = [
            { date: '01', value: 70 },
            { date: '02', value: 50 },
            { date: '03', value: 100 },
            { date: '04', value: 90 },
            { date: '05', value: 60 },
            { date: '06', value: 150 }
        ];
        
        // Clear any previous chart
        d3.select(svgRef.current).selectAll("*").remove();
        
        // Setup dimensions
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 300 - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom;
        
        // Create SVG
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        // X scale
        const x = d3.scalePoint()
            .domain(data.map(d => d.date))
            .range([0, width]);
        
        // Y scale
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);
        
        // Line generator
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);
        
        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));
        
        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y));
        
        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#3982FA")
            .attr("stroke-width", 2)
            .attr("d", line);
    }, []);
    
    return (
        <div className="d3-chart">
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default D3LineChart;