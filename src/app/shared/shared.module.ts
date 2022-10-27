import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { AddUserDialogComponent } from "./add-user-dialog/add-user-dialog.component";
import { AssociateDeviceComponent } from './associate-device/associate-device.component';

@NgModule({
    declarations: [
        AddUserDialogComponent,
        AssociateDeviceComponent,
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
    ],
    exports: [
        AddUserDialogComponent,
    ]
})
export class SharedModule {}