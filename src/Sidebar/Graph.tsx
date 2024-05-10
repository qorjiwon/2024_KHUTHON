import React, { Component } from "react";
import Chart from "react-apexcharts";

type ChartData = {
    options: {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    },
    series: [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]
};

export const Graph = () => {
    const tempChartData = {
        state: {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: ['2023.9', '2023.10', '2023.11', '2023.12', '2024.1', '2024.2', '2024.3', '2024.4']
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        }
    }
    
    return (
        <div className={'LineChart'}>
            <Chart
                options={tempChartData.state.options}
                series={tempChartData.state.series}
                type="line"
                width={"400"}
            />
        </div>
    )
}