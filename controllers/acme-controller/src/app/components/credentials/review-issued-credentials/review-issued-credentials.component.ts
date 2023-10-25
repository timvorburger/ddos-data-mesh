import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Initiator } from 'src/app/enums/roles';
import { CredentialExchangeRecord } from 'src/app/models/credential';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-review-issued-credentials',
  templateUrl: './review-issued-credentials.component.html',
  styleUrls: ['./review-issued-credentials.component.scss'],
})
export class ReviewIssuedCredentialsExchangeComponent {
  receivedCredentialRecords: CredentialExchangeRecord[] = [];
  issuedCredentialRecords: CredentialExchangeRecord[] = [];

  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.agentService
      .getCredentialExchangeRecords()
      .pipe(
        map((resp: CredentialExchangeRecord[]) => {
          resp.forEach((cr: CredentialExchangeRecord) => {
            cr.initiator === Initiator.SELF
              ? this.issuedCredentialRecords.push(cr)
              : this.receivedCredentialRecords.push(cr);
          });
        })
      )
      .subscribe();
  }
}
