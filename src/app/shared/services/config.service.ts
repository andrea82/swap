import { CommandService } from '@app/shared/services/command.service';
import { GithubDataService } from '@app/shared/services/github-data.service';
import { Injectable } from '@angular/core';
import { TutorialService } from '@app/shared/services/tutorial.service';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  constructor(
    private githubDataService: GithubDataService,
    private commandService: CommandService,
    private tutorialService: TutorialService) { }

  init() {
    this.commandService.setCommands();
    this.tutorialService.tutorials$ = this.githubDataService.fetchTutorials();
  }
}
