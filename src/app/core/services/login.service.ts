import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class LoginService {
    constructor(private httpClient: HttpClient) {}

    getUser(email: string, password: string): Observable<User> {
        return this.httpClient.get<User>(`${environment.apiUrl}/user/email/${email}/password/${password}`);
    }
}