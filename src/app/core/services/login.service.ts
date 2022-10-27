import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class LoginService {
    user!: User;

    users!: User[];

    constructor(private httpClient: HttpClient) {}

    getUser(email: string, password: string): Observable<User> {
        return this.httpClient.get<User>(`${environment.apiUrl}/user/email/${email}/password/${password}`);
    }

    setUser(user: User): void {
        this.user = user;
    }

    getUserLogged(): User {
        return this.user;
    }

    setUsers(users: User[]): void {
        this.users = users;
    }

    getUsers(): User[] {
        return this.users;
    }
}