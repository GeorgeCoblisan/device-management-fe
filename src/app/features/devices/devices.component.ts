import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { Socket } from 'ngx-socket-io';

import { Observable, Subject, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { Device } from 'src/app/core/models/device.model';
import { User } from 'src/app/core/models/user.model';
import { LoginService } from 'src/app/core/services/login.service';
import { AssociateDeviceComponent } from 'src/app/shared/associate-device/associate-device.component';
import { EnergyApiClientService } from '../services/energy-api-client.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit, OnChanges, OnDestroy {
  userLogged!: User;

  users!: User[];

  devices!: Device[];

  userEmail!: string;

  private reloadDevices$ = new Subject();

  @Output() chartOpen: EventEmitter<string> = new EventEmitter();

  @Input() chartOptions: any;

  devices$: Observable<Device[]> = this.reloadDevices$.pipe(
    startWith(undefined),
    switchMap(() => this.energyApiClient.getDevices())
  );

  //notification$ = this.socket.fromEvent<any>('notification');

  //data$ = this.socket.fromEvent<any>('data');

  private subscriptions: Subscription = new Subscription();

  constructor(
    private energyApiClient: EnergyApiClientService,
    private loginService: LoginService,
    private dialog: MatDialog,
    //private socket: Socket,
  ) {}

  ngOnInit(): void {
    this.userLogged = this.loginService.getUserLogged();

    this.energyApiClient.getUsers().subscribe((users) => this.users = users);

    if (this.userLogged.role === 'admin') {
      this.reloadDevices$.next(0);
    } else if (this.userLogged.role === 'client') {
      this.energyApiClient
        .getDevicesByUserId(this.userLogged.id)
        .subscribe((devices) => (this.devices = devices));
    }

    // this.subscriptions.add(
    //   this.notification$.pipe().subscribe((data) => {
    //     alert('Maximum limit has been exceeded for this device!');
    //     console.log(data);
    //   })
    // );

    // this.subscriptions.add(
    //   this.data$.pipe().subscribe((data) => {
    //     alert(data);
    //     console.log(data);
    //   })
    // );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getUserByDevice(userId: string): string {
    if (this.users) {
      return this.users.find((user) => user.id === userId)?.email!;
    }
    return "";
  }

  associateDevice(deviceId: string): void {
    const dialogRef = this.dialog.open(AssociateDeviceComponent, {
      width: '400px',
      data: { email: this.userEmail, message: 'Associate device to a user'},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userEmail = result.email;
      console.log(this.userEmail);
      const userId = this.loginService.getUsers().find((user) => user.email === this.userEmail)?.id;
      if (userId) {
        this.energyApiClient.associateDevice(deviceId, userId).subscribe(() => this.refreshDevices());
      }
      else {
        alert('This user does not exit!');
      }
    });
  }

  refreshDevices(): void {
    this.reloadDevices$.next(0);
  }

  openChart(deviceId: string) {
    this.chartOpen.emit(deviceId);
  }

  // getNotification() {
  //   return this.socket.fromEvent('notification');
  // }

  startPolling(): void {
    console.log("Start polling");
    this.subscriptions.add(this.energyApiClient.startPolling().subscribe());
  }
}
