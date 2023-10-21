import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { AgentService } from "src/app/services/agent.service";

@Component({
  selector: "app-accept-connection",
  templateUrl: "./accept-connection.component.html",
  styleUrls: ["./accept-connection.component.scss"],
})
export class AcceptConnectionComponent {
  invitationUrl: string;
  error: string;

  constructor(private agentService: AgentService, private router: Router) {}

  onSubmit() {
    try {
      const url = new URL(this.invitationUrl);
      const invitationParam = url.searchParams.get("c_i");
      if (!invitationParam) {
        throw new Error();
      }
      const invitation = JSON.stringify(
        JSON.parse(atob(invitationParam)),
        null,
        4
      );

      this.agentService
        .receiveInvitation(invitation)
        .pipe(map(() => this.router.navigateByUrl("/connections")))
        .subscribe();
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
