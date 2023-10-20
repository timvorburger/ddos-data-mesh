import { Component } from '@angular/core';
import { NavLink } from 'src/app/models/nav-link';
import { NavLinkService } from 'src/app/services/nav-link.service';

@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.scss'],
})
export class ProofComponent {
  public componentLinks: NavLink[];

  constructor(private navLinkService: NavLinkService) {}

  ngOnInit() {
    this.componentLinks =
      this.navLinkService.getComponentNavLinks('proof-requests');
  }
}
