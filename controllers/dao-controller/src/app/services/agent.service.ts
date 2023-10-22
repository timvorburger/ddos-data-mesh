import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AgentStatus } from '../enums/agent-status';

import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SchemaAttributes, SchemaCreatedResponse, SchemaGETResponse } from '../models/schema';
import { CredentialDefinitionsResponse, CredentialIssueBody } from '../models/credential';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(private http: HttpClient) {}

  getStatus(): Observable<AgentStatus> {
    return this.http.get<any>('/status').pipe(
      switchMap(() => of(AgentStatus.Up)),
      catchError(this.handleError<any>('getStatus', AgentStatus.Down))
    );
  }

  getConnections(): Observable<any[]> {
    return this.http.get<any[]>('/connections').pipe(
      switchMap((response: any) => of(response.results)),
      catchError(this.handleError<any[]>('getConnections', []))
    );
  }

  getSchemas(): Observable<string[]> {
    return this.http.get<SchemaCreatedResponse>('/schemas/created').pipe(
      switchMap((response: SchemaCreatedResponse) => {
        return of(response.schema_ids);
      }),
      catchError(this.handleError<any[]>('getSchemas', []))
    );
  }

  getSchema(schemaId: string): Observable<SchemaAttributes> {
    return this.http.get<SchemaGETResponse>(`/schemas/${schemaId}`).pipe(
      switchMap((response: SchemaGETResponse) => {
        return of(response.schema);
      }),
      catchError(this.handleError<any>('getCredentialDefinitions', []))
    );
  }

  removeConnection(connectionId: string): Observable<any> {
    if (!connectionId) {
      console.error('Must provide a connection ID');
      return throwError(() => new Error('Must provide a connection ID'));
    }
    return this.http.post<any>(`/connections/${connectionId}/remove`, {}).pipe(
      switchMap(() => of(connectionId)),
      catchError(this.handleError<any>('removeConnection', null))
    );
  }

  createInvitation(alias: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('alias', alias);

    return this.http
      .post<any>('/connections/create-invitation?' + params, {})
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.handleError<any>('createInvitation', null))
      );
  }

  receiveInvitation(invitation: any): Observable<any> {
    return this.http
      .post<any>('/connections/receive-invitation', invitation)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.handleError<any>('receiveInvitation', null))
      );
  }

  getCredentials(): Observable<any[]> {
    return this.http.get<any[]>('/credentials').pipe(
      switchMap((response: any) => of(response.results)),
      catchError(this.handleError<any[]>('getCredentials', []))
    );
  }

  getCredentialDefinitions(schemaId: string): Observable<string[]> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('schemaId', schemaId);
    return this.http
      .get<CredentialDefinitionsResponse>(
        '/credential-definitions/created?' + params
      )
      .pipe(
        switchMap((response: CredentialDefinitionsResponse) =>
          of(response.credential_definition_ids)
        ),
        catchError(this.handleError<any[]>('getCredentialDefinitions', []))
      );
  }

  getProofs(): Observable<any[]> {
    return this.http.get<any[]>('/present-proof/records').pipe(
      switchMap((response: any) => of(response)),
      catchError(this.handleError<any[]>('getProofs', []))
    );
  }

  issueCredential(credentialIssueBody: CredentialIssueBody): Observable<any[]> {
    return this.http.post<any[]>('/issue-credential-2.0/send', credentialIssueBody).pipe(
      switchMap((response: any) => of(response)),
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
