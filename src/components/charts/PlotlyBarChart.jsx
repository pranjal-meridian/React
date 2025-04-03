import React from 'react';
import * as Plotly from 'plotly.js-dist';
import { useEffect, useRef } from 'react';

function PlotlyBarChart() {
    const chartRef = useRef(null);
    
    useEffect(() => {
        const data = [{
            x: ['01', '02', '03', '04', '05', '06', '07'],
            y: [23, 20, 45, 34, 50, 46, 37],
            type: 'bar',
            marker: {
                color: '#3982FA'
            },
            width: 0.2
        }];
        
        const layout = {
            height: 300,
            margin: { t: 10, b: 30, l: 40, r: 10 },
            xaxis: {
                showgrid: false
            },
            yaxis: {
                showgrid: true,
                gridcolor: '#E2E7E7',
                gridwidth: 1,
                gridstyle: 'dash'
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
        };
        
        Plotly.newPlot(chartRef.current, data, layout, { responsive: true });
        
        return () => {
            Plotly.purge(chartRef.current);
        };
    }, []);
    
    return (
        <div ref={chartRef} className="w-full h-64"></div>
    );
}

export default PlotlyBarChart;