import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  map,
} from 'rxjs';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-accept-connection',
  templateUrl: './accept-connection.component.html',
  styleUrls: ['./accept-connection.component.scss'],
})
export class AcceptConnectionComponent {

  invitationUrl: string;
  error: string;

  constructor(private agentService: AgentService, private router: Router){}

  onSubmit() {

    try{
      const invitation = JSON.stringify(JSON.parse(atob(this.invitationUrl)), null, 4);
    
      this.agentService.receiveInvitation(invitation)
      .pipe(
          map(() => this.router.navigateByUrl('/connections'))
        )
    } catch(e: any) {
      if(e instanceof SyntaxError) this.error = "URL is malformed"
      else this.error = e.message
    }
  }
}
