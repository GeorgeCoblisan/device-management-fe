import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";

import { FeaturesRoutingModule } from "./features-routing.module";
import { UsersComponent } from "./users/users.component";
import { DevicesComponent } from './devices/devices.component';
import { EnergyComponent } from './energy/energy.component';

import * as CanvasJSAngularChart from 'src/assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;


@NgModule({
    declarations: [
        UsersComponent,
        DevicesComponent,
        EnergyComponent,
        CanvasJSChart,
    ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        MatCardModule,
        MatButtonModule,
    ],
    exports: [
        UsersComponent,
        DevicesComponent,
        EnergyComponent,
    ]
})
export class FeaturesModule {}