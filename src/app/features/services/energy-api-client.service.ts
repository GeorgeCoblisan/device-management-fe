import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class EnergyApiClientService {
    constructor(private httpClient: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${environment.apiUrl}/user`);
    }

    createUser(user: User): Observable<User> {
        return this.httpClient.post<User>(`${environment.apiUrl}/user`, user);
    }

    deleteUser(userId: string): Observable<User> {
        return this.httpClient.delete<User>(`${environment.apiUrl}/user/${userId}`);
    }

    editUser(userId: string, user: User): Observable<User> {
        return this.httpClient.patch<User>(`${environment.apiUrl}/user/${userId}`, user);
    }
}