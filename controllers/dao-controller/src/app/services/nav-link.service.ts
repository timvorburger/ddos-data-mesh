import { Injectable } from '@angular/core';
import { NavLink } from '../models/nav-link';
import * as navLinksJson from 'src/data/nav_links.json';

@Injectable({
  providedIn: 'root'
})
export class NavLinkService {
  navLinks: NavLink[] = [];

  constructor() {
    
  }

  getNavLinks(): NavLink[] {
    this.navLinks = navLinksJson;
    this.navLinks.map(nav => console.log(nav));
    return this.navLinks;
  }

}
