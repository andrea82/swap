import { Observable, Subject, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { GithubDataService } from '@app/shared/services/github-data.service';
import { Injectable } from '@angular/core';
import { Tutorial } from '@app/shared/models/tutorial.interface';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  tutorials$: Observable<Tutorial[]>;

  private readonly activeTutorialSubject = new Subject<Tutorial>();
  readonly activeTutorial$ = this.activeTutorialSubject.asObservable();

  public tutorialContent$: Observable<string[]> = this.activeTutorial$.pipe(
    filter((tutorial: Tutorial) => (!!tutorial.content)),
    switchMap((tutorial: Tutorial) => this.githubDataService.fetchTutorial(tutorial.content)),
    map((content: string) => content.split('---'))
  );

  set activeTutorial(tutorial: Tutorial) {
    this.activeTutorialSubject.next({...tutorial});
  }

  constructor(private githubDataService: GithubDataService) { }
}
