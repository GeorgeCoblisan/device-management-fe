import { NgModule } from "@angular/core";

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthComponent } from "./auth/auth.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from "./core-routing.module";
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
    declarations: [
        AuthComponent,
        HomeComponent,
        ToolbarComponent,
    ],
    imports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        CommonModule,
        CoreRoutingModule,
        MatToolbarModule,
    ],
    exports: [
        AuthComponent,
        HomeComponent,
        ToolbarComponent,
    ]
})
export class CoreModule {}