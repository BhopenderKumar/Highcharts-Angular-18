import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HC_solidGauge from 'highcharts/modules/solid-gauge';
import HC_drilldown from 'highcharts/modules/drilldown';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';

HighchartsMore(Highcharts);
HC_solidGauge(Highcharts);
HC_drilldown(Highcharts);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HighchartsChartModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'highcharts-dashboard-demo';
  speed: number = 80; // Default speed value
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'solidgauge'
    },
    title: {
      text: 'Speed Meter'
    },
    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        shape: 'arc',
        outerRadius: '100%',
        innerRadius: '60%',
        background: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, '#FFF'],
            [1, '#333']
          ]
        }
      } as any
    },
    tooltip: {
      enabled: false
    },
    yAxis: {
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353']  // red
      ],
      min: 0,
      max: 200,
      title: {
        text: 'Speed'
      }
    },
    series: [
      {
        name: 'Speed',
        data: [this.speed],
        type: 'solidgauge'
      }
    ]
  };

  // Method to update speed in the chart
  updateSpeed() {
    const chart = Highcharts.charts[0]; 
    if (chart && chart.series[0]) {
      chart.series[0].setData([this.speed]);
    }
  }
}