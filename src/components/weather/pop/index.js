/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import { Line } from 'react-chartjs-2';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default ({data}) => {
    const {
        hourly,
        getTime,
        tempRound,
    } = data;
    const lineChartLabels = [];
	const lineChartValues = [];
	hourly.forEach((item,idx) => {
        // Use modulus operator to get every n4 from array
        if(idx % 4 === 0){
            let label;
            if(idx === 0){
                label = 'NOW';
            }else{
                label = getTime(item.dt, false, true, false);
            }
            lineChartLabels.push(label);
            lineChartValues.push(tempRound(item.pop));
        }
	});

    // ChartJS datalabels plugin
    Chart
    .plugins
    .register(ChartDataLabels);
    Chart
    .helpers
    .merge(
        Chart.defaults.global.plugins.datalabels, {
            color: '#fff',
            anchor: 'start',
            align: 'end',
            clamp: true,
            font: {
                size: 18,
            },
            formatter: function(value) {
                return `${value}%`;
            },
        },
    );

    return(
        <Line id='pop-line-chart' data={{
            labels: lineChartLabels,
            datasets: [
                {
                    data: lineChartValues,
                    fill: false,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: 1,
                    borderDash: [3, 5],
                    pointBorderWidth: 9,
                    pointbORDERColor: 'rgba(255, 255, 255, .1)',
                    pointBackgroundColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255, 255, 255, 0.35)',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 20,
                },
            ],
        }}
        height={50}
        options={{
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 25,
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true
                        },
                    },
                ],
                xAxes: [
                    {
                        gridLines: {
                            color: 'rgba(255,255,255,0.25)',
                            drawBorder: false,
                            borderColor: 'rgba(255,255,255,0.25)',
                            zeroLineColor: 'rgba(255,255,255,0.25)',
                        },
                        ticks: {
                            fontColor: '#fff',
                        },
                    },
                ],
            },
        }}
        />
    );
}