import { Component, OnInit } from '@angular/core';
import { Energy } from 'src/app/core/models/energy.model';
import { EnergyApiClientService } from '../services/energy-api-client.service';

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss']
})
export class EnergyComponent implements OnInit {

  energyData!: Energy[];

  chartOptions = {
	  title: {
		  text: "Energy Consumption Chart"
	  },
	  animationEnabled: true,
	  axisY: {
		includeZero: true
	  },
	  data: [{
		type: "column",
		indexLabelFontColor: "#5A5757",
		dataPoints: [
		]
	  }]
	}

  dataArray: { x: number; y: number; }[] = [];

  constructor(private energyApiClient: EnergyApiClientService) { }

  ngOnInit(): void {
  }

  openChart(deviceId: string) {
    this.energyApiClient.getEnergyByDevice(deviceId).subscribe((energy) => {
      this.energyData = energy, this.showChart()});
  }

  private showChart() {
    this.dataArray = [];
    this.energyData.forEach(element => {
      const date = new Date(element.timestamp as unknown as number * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      
      const data = { x: Number(formattedTime.substring(0, 2)), y: +element.consumption };
      this.dataArray.push(data);
    });

    this.chartOptions = {
      title: {
        text: "Energy Consumption Chart"
      },
      animationEnabled: true,
      axisY: {
      includeZero: true
      },
      data: [{
      type: "column",
      indexLabelFontColor: "#5A5757",
      dataPoints: this.dataArray as never
      }]
    };
  }
}
