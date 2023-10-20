import { Component } from '@angular/core';
import { NavLink } from 'src/app/models/nav-link';
import { NavLinkService } from 'src/app/services/nav-link.service';

@Component({
  selector: 'app-credentials-component',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent {
  public componentLinks: NavLink[]

  constructor (private navLinkService: NavLinkService){}

  ngOnInit() {
    this.componentLinks = this.navLinkService.getComponentNavLinks("credentials");
  }
}
