import { Component, Input } from '@angular/core';
import { Credential } from 'src/app/models/credential';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.scss']
})
export class CredentialComponent {
  @Input() credential: Credential
}
