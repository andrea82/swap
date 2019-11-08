import { Component } from '@angular/core';

@Component({
  selector: 'tr-header',
  templateUrl: './header.component.html',
  styles: [
    `
      :host {
        background: #222;
        color: white;
        padding: 1rem;
      }

      a {
        color:white;
      }
    `
  ]
})
export class HeaderComponent {
  title = 'Redis Patterns';
}
