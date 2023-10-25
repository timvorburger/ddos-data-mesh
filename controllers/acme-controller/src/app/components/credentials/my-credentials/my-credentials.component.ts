import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Credential } from 'src/app/models/credential';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-my-credentials',
  templateUrl: './my-credentials.component.html',
  styleUrls: ['./my-credentials.component.scss']
})
export class MyCredentialsExchangeComponent {
  credentials: Credential[] = [];
  
  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.agentService
      .getCredentials()
      .pipe(
        map((resp: Credential[]) => {
          
        this.credentials = resp;
        
        })
      ).subscribe();
  }

}
