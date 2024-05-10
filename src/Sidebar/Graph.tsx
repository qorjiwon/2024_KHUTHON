import React, { Component } from "react";
import Chart from "react-apexcharts";

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
                    name: "대기",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                },
                {
                    name: "수질",
                    data: [40, 40, 44, 40, 42, 45, 49, 55]
                },
                {
                    name: "토양",
                    data: [20, 30, 34, 38, 44, 44, 44, 50]
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