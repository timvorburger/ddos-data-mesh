import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AgentStatus } from '../enums/agent-status'

import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  getStatus(): Observable<AgentStatus> {
    return this.http.get<any>('/status')
      .pipe(
        switchMap(() => of(AgentStatus.Up)),
        catchError(this.handleError<any>('getStatus', AgentStatus.Down))
      );
  }

  getConnections(): Observable<any[]> {
    return this.http.get<any[]>('/connections')
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.handleError<any[]>('getConnections', []))
      );
  }

  removeConnection(connectionId: string): Observable<any> {
    if (!connectionId) {
      console.error('Must provide a connection ID');
      return throwError(() => new Error('Must provide a connection ID'));
    }
    return this.http.post<any>(`/connections/${connectionId}/remove`, {})
      .pipe(
        switchMap(() => of(connectionId)),
        catchError(this.handleError<any>('removeConnection', null))
      );
  }

  createInvitation(alias: string): Observable<any> {

    const params: URLSearchParams = new URLSearchParams();
    params.set("alias", alias)

    return this.http.post<any>('/connections/create-invitation?' + params, {})
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.handleError<any>('createInvitation', null))
      );
  }

  receiveInvitation(invitation: any): Observable<any> {
    console.log("receive invitation", invitation)
    return this.http.post<any>('/connections/receive-invitation', invitation)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.handleError<any>('receiveInvitation', null))
      );
  }

  getCredentials(): Observable<any[]> {
    return this.http.get<any[]>('/credentials')
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.handleError<any[]>('getCredentials', []))
      );
  }

  getProofs(): Observable<any[]> {
    return this.http.get<any[]>('/present-proof/records')
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.handleError<any[]>('getProofs', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Prevent application from completely erroring out.
      return of(result as T);
    };
  }
}