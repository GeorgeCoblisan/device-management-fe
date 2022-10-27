import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";

import { FeaturesRoutingModule } from "./features-routing.module";
import { UsersComponent } from "./users/users.component";
import { DevicesComponent } from './devices/devices.component';


@NgModule({
    declarations: [
        UsersComponent,
        DevicesComponent,
    ],
    imports: [
        CommonModule,
        FeaturesRoutingModule,
        MatCardModule,
        MatButtonModule,
    ],
    exports: [
        UsersComponent
    ]
})
export class FeaturesModule {}