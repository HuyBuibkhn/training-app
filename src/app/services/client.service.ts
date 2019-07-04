import { Client } from './../interfaces/client.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry} from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
const data = { 'token': 'be2ff96697734cb6def49878f9763b7d586a0622' };
@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private url = 'http://dev2.pre.ptminder.com/hapi/data/get/clients/';
  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<any> {
    return this.http.post<any>(this.url, data, httpOptions)
      .pipe(
        retry(3),
        tap((clients: any) => {
          this.setClients(clients.result.clients);
        }),
        catchError(this.handleError<any>('getClients', []))
      );
  }

  private setClients(clients: Client[]): void {
    localStorage.setItem('clients', JSON.stringify(clients));
  }
  public getAllClient(): Client[] {
    const clients = JSON.parse(localStorage.getItem('clients'));
    if (!clients) { return; }
    return clients;
  }
  public updateClient(id: any, value: any) {
    console.log(id, value);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
