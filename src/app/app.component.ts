import { BehaviorSubject, Observable } from 'rxjs';

import { CommandService } from '@app/shared/services/command.service';
import { Component } from '@angular/core';
import { Output } from '@app/shared/models/response.interface';
import { RedisConnectService } from '@app/shared/services/redis-connect.service';
import { Tutorial } from '@app/shared/models/tutorial.interface';
import { TutorialService } from '@app/shared/services/tutorial.service';

@Component({
  selector: 'tr-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  responses: Output[] = [];
  selectedDoc: string;
  activeTutorial: Tutorial;
  newCommandForInput: string;
  resetCommand$: Observable<number> = this.redisConnectService.execCommandTime$;

  constructor(
    public commandService: CommandService,
    public tutorialService: TutorialService,
    private redisConnectService: RedisConnectService) {
      this.redisConnectService.response$.subscribe((response: Output) => this.updateResponses(response));
    }

  /**
   * Set current command as the active one
   * @param command String
   */
  selectActiveCommand(command: string) {
    this.commandService.activeCommand = command;
  }

  /**
   * Write command on text input
   * @param command String
   */
  writeCommand(command: string) {
    this.newCommandForInput = command;
    this.selectActiveCommand(command);
  }

  /**
   * Set new active tutorial
   * @param tutorial Tutorial
   */
  selectTutorial(tutorial: Tutorial) {
    this.activeTutorial = tutorial;
    this.tutorialService.activeTutorial = tutorial;
  }

  /**
   * Send command to server and update responses
   * @param commandString String
   */
  runCommand(commandString: string) {
    const newCommand: Output = {valid: true, output: commandString.toUpperCase(), type: 'command'};
    this.updateResponses(newCommand);
    this.redisConnectService.send(commandString);
    const [first, ...second] = commandString.split(' ');
    this.selectActiveCommand(first);
  }

  private updateResponses(command: Output) {
    const commands = [];
    Object.assign(commands, [...this.responses, command]);
    this.responses = commands;
  }
}
