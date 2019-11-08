import { Component, Input } from '@angular/core';

import { Command } from '@app/shared/models/command.interface';

@Component({
  selector: 'tr-command-summary',
  templateUrl: './command-summary.component.html'
})

export class CommandSummaryComponent {
  @Input() command: Command;
}
