import { Component, Input } from '@angular/core';

@Component({
  selector: 'tr-command-documentation',
  templateUrl: './command-documentation.component.html'
})

export class CommandDocumentationComponent {
  @Input() documentation = '';
}
