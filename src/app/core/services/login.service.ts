import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class LoginService {
    user!: User;

    users!: User[];

    isLoggedIn = false;

    constructor(private httpClient: HttpClient) {}

    getUser(email: string, password: string): Observable<User> {
        return this.httpClient.get<User>(`${environment.apiUrl}/user/email/${email}/password/${password}`);
    }

    setUser(user: User): void {
        this.user = user;
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUserLogged(): User {
        return JSON.parse(localStorage.getItem('user')!) as User;
    }

    setUsers(users: User[]): void {
        this.users = users;
    }

    getUsers(): User[] {
        return this.users;
    }

    isAuthenticated(): boolean {
        const userLogged = JSON.parse(localStorage.getItem('user')!) as User;
        if (userLogged) {
            return true;
        }

        return false;
    }
}