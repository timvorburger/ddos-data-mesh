import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routeConfig } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { NavCardComponent } from './components/nav/nav-card/nav-card.component';
import { NavCardListComponent } from './components/nav/nav-card-list/nav-card-list.component';
import { NewConnectionComponent } from './components/connections/new-connection/new-connection.component';
import { AcceptConnectionComponent } from './components/connections/accept-connection/accept-connection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectionsComponent } from './components/connections/connections.component';
import { RouterModule } from '@angular/router';
import { IssueCredentialsExchangeComponent } from './components/credentials/issue-credentials/issue-credentials.component';
import { ComponentNavbarComponent } from './shared/component-navbar/component-navbar.component';
import { ProofComponent } from './components/proof/proof.component';
import { RequestProofComponent } from './components/proof/request-proof/request-proof.component';
import { ViewProofsComponent } from './components/proof/view-proofs/view-proofs.component';
import { ReviewIssuedCredentialsExchangeComponent } from './components/credentials/review-issued-credentials/review-issued-credentials.component';
import { ConnectionListComponent } from './components/connections/connection-list/connection-list.component';
import { ConnectionCardComponent } from './components/connections/connection-card/connection-card.component';
import { EmptyListComponent } from './shared/empty-list/empty-list.component';
import { ToDatePipe } from './shared/pipes/to-date.pipe';
import { CredentialFormComponent } from './components/credentials/credential-form/credential-form.component';
import { CredentialsExchangeListComponent } from './components/credentials/credentials-exchange-list/credentials-exchange-list.component';
import { CredentialsExchangeComponent } from './components/credentials/credential-exchange/credential-exchange.component';
import { MyCredentialsExchangeComponent } from './components/credentials/my-credentials/my-credentials.component';
import { CredentialsRouteComponent } from './components/credentials/credentials-route.component';
import { CredentialComponent } from './components/credentials/credential/credential.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavCardComponent,
    NavCardListComponent,
    NewConnectionComponent,
    AcceptConnectionComponent,
    ConnectionsComponent,
    CredentialsExchangeComponent,
    IssueCredentialsExchangeComponent,
    ComponentNavbarComponent,
    ProofComponent,
    RequestProofComponent,
    ViewProofsComponent,
    ReviewIssuedCredentialsExchangeComponent,
    ConnectionListComponent,
    ConnectionCardComponent,
    EmptyListComponent,
    ToDatePipe,
    CredentialsRouteComponent,
    CredentialFormComponent,
    CredentialsExchangeListComponent,
    CredentialsExchangeComponent,
    MyCredentialsExchangeComponent,
    CredentialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routeConfig),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
