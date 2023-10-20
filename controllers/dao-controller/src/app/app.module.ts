import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routeConfig } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { NavCardComponent } from './components/nav-card/nav-card.component';
import { NavCardListComponent } from './components/nav-card-list/nav-card-list.component';
import { NewConnectionComponent } from './components/connections/new-connection/new-connection.component';
import { AcceptConnectionComponent } from './components/connections/accept-connection/accept-connection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectionsComponent } from './components/connections/connections.component';
import { RouterModule } from '@angular/router';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { IssueCredentialsComponent } from './components/credentials/issue-credentials/issue-credentials.component';
import { ComponentNavbarComponent } from './shared/component-navbar/component-navbar.component';
import { ProofComponent } from './components/proof/proof.component';
import { RequestProofComponent } from './components/proof/request-proof/request-proof.component';
import { ViewProofsComponent } from './components/proof/view-proofs/view-proofs.component';
import { ReviewIssuedCredentialsComponent } from './components/credentials/reveiw-issued-credentials/reveiw-issued-credentials.component';
import { ConnectionListComponent } from './components/connections/connection-list/connection-list.component';
import { ConnectionCardComponent } from './components/connections/connection-card/connection-card.component';
import { EmptyListComponent } from './shared/empty-list/empty-list.component';
import { ToDatePipe } from './shared/to-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavCardComponent,
    NavCardListComponent,
    NewConnectionComponent,
    AcceptConnectionComponent,
    ConnectionsComponent,
    CredentialsComponent,
    IssueCredentialsComponent,
    ComponentNavbarComponent,
    ProofComponent,
    RequestProofComponent,
    ViewProofsComponent,
    ReviewIssuedCredentialsComponent,
    ConnectionListComponent,
    ConnectionCardComponent,
    EmptyListComponent,
    ToDatePipe,
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
