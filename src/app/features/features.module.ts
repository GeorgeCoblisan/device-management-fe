import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";

import { FeaturesRoutingModule } from "./features-routing.module";
import { UsersComponent } from "./users/users.component";
import { DevicesComponent } from './devices/devices.component';
import { EnergyComponent } from './energy/energy.component';
import { ChatComponent } from "./chat/chat.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";

// import * as CanvasJSAngularChart from 'src/assets/canvasjs.angular.component';
// var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
    declarations: [
        UsersComponent,
        DevicesComponent,
        EnergyComponent,
        ChatComponent,
        //CanvasJSChart,
    ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
    ],
    exports: [
        UsersComponent,
        DevicesComponent,
        EnergyComponent,
        ChatComponent,
    ]
})
export class FeaturesModule {}