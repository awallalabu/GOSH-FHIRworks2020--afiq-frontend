import React from 'react';
import Chart from 'chart.js';

export default class DrawChart extends React.Component{
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.chart = undefined;
        this.state = {
            color: this.props.color,
        }
    }

    componentDidUpdate(){
        let ctx = this.props.id;
        if (this.chart !== undefined || this.props.color !== this.state.color) {
            this.chart.destroy();
        }
        this.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: this.props.chart ,

            // The data for our dataset
            data: {
                labels: this.props.labels,
                datasets: [{
                    borderColor : 'grey',
                    data: this.props.data,
                    backgroundColor: this.props.color,
                }],
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: this.props.title,
                    position: 'top',
                    fontSize: 25,
                },
            },
        }
        );
    }

    render() {
        return (
            <div>
                <canvas
                    id={this.props.id}
                    ref={this.chartRef}
                />
            </div>
        );
    }
}