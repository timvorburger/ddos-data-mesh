import { Component, Input } from '@angular/core';
import { Attribute } from 'src/app/models/credential';

@Component({
  selector: 'app-credential-form',
  templateUrl: './credential-form.component.html',
  styleUrls: ['./credential-form.component.scss'],
})
export class CredentialFormComponent {
  @Input() attributes: Attribute[];
  formAttributes: Attribute[] = [];
  formModal: any;
  modalError: string;

  ngOnInit() {
    this.attributes.forEach((att) => {
      const formAttribute: Attribute = {
        ...att,
        selected: false,
      };
      this.formAttributes.push(formAttribute);
    });
  }

  addCredentialAttributeToForm() {}

  handleRemove(attName: string) {
    const att = this.formAttributes.find(
      (el: Attribute) => el.name === attName
    );
    if (att != undefined) {
      (att.value = ''), (att.selected = false);
    }
  }

  addAttribute(attName: string) {
    const att = this.formAttributes.find(
      (el: Attribute) => el.name === attName
    );
    if (att != undefined) {
      att.selected = true;
    }
  }

  // getFormAttributes
}
