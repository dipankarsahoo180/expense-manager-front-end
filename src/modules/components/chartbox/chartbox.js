import { LightningElement } from "lwc";
import Chart from 'chart.js/auto'
export default class Chartbox extends LightningElement{
    chart
    chartLoaded = false
    renderedCallback(){
        if(this.chartLoaded){
            return
        }
        const elem = this.template.querySelector('.chart')
        if(elem){
            this.renderChart()
        }
    }

    renderChart(){
        const elem = this.template.querySelector('.chart')
        const config = {
            type: 'doughnut',
            data: {
                labels: [
                  'Red',
                  'Blue',
                  'Yellow'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]
              }
          };
        const canvas = document.createElement('canvas')
        elem.appendChild(canvas)
        const ctx = canvas.getContext('2d')
        this.chart = new Chart(ctx, config)
        this.chartLoaded = true
    }
}