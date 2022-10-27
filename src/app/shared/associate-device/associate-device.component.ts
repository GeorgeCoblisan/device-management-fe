import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-associate-device',
  templateUrl: './associate-device.component.html',
  styleUrls: ['./associate-device.component.scss']
})
export class AssociateDeviceComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AssociateDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
