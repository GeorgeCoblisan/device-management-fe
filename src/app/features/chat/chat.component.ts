import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Observable, startWith, Subject, switchMap } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/core/services/login.service';
import { EnergyApiClientService } from '../services/energy-api-client.service';
import {
  ChatMessageResponseList,
} from './models/chat-message-response';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  userLogged!: User;

  private reloadMessages$ = new Subject();

  messages$: Observable<ChatMessageResponseList> = this.reloadMessages$.pipe(
    startWith(undefined),
    switchMap(() =>
      this.energyApiClientService.getMessage({
        username: this.userLogged.firstName,
      })
    )
  );

  constructor(
    private energyApiClientService: EnergyApiClientService,
    private loginService: LoginService,
    private matSnackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userLogged = this.loginService.getUserLogged();
    setInterval(() => {
      this.reloadMessages$.next(0);
      this.messages$.pipe(first()).subscribe((res) => {
        const m = res.messages[res.messages.length - 1];
        if (m.message.username === this.userLogged.firstName) {
            if (m.message.seen === 'true' && m.message.typing === 'false') {
                this.matSnackBar.open("SEEN", "Okay!", {
                    duration: 4000,
                    horizontalPosition: "center",
                    verticalPosition: "top",
                  });
                this.energyApiClientService.editMessage(m.message.message, 'false', 'false').pipe(
                    first()
                ).subscribe();
            }
            if (m.message.seen === 'true' && m.message.typing === 'true') {
                this.matSnackBar.open("TYPING", "Okay!", {
                    duration: 4000,
                    horizontalPosition: "center",
                    verticalPosition: "top",
                  });
                this.energyApiClientService.editMessage(m.message.message, 'false', 'false').pipe(
                    first()
                ).subscribe();
            }
        }
    });
    }, 1000);
  }

  ngOnDestroy(): void {}

  onClickInput(): void {
    this.messages$.pipe(first()).subscribe((res) => {
        console.log(res.messages);
        const m = res.messages[res.messages.length - 1];
        if (m.message.username !== this.userLogged.firstName) {
            this.energyApiClientService.editMessage(m.message.message, 'true', 'false').pipe(
                first()
            ).subscribe();
        }
    });
  }

  onKeyUp(event: any): void {
    this.messages$.pipe(first()).subscribe((res) => {
        console.log(res.messages);
        const m = res.messages[res.messages.length - 1];
        if (m.message.username !== this.userLogged.firstName) {
            this.energyApiClientService.editMessage(m.message.message, 'true', 'true').pipe(
                first()
            ).subscribe();
        }
    });
  }

  send(event: any): void {
    this.energyApiClientService
      .sendMessage({
        username: this.userLogged.firstName,
        message: event.target.value.toString(),
        seen: "false",
        typing: "false"
      })
      .subscribe();

    event.target.value = '';
    this.reloadMessages$.next(0);
  }
}
