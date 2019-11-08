import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CachingService } from '@app/shared/services/caching.service';
import { Command } from '@app/shared/models/command.interface';
import { GithubContent } from '@app/shared/models/github-content.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutorial } from '@app/shared/models/tutorial.interface';
import { environment } from '@app/../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GithubDataService {
  private redisDocPath = environment.redisDocRepo.path;
  private tutorialsPath = environment.patternsRepo.path;

  constructor(private http: HttpClient, private cachingService: CachingService) { }

  /**
   * Fetch all available commands from remote git repo
   */
  fetchCommands() {
    const endpoint = this.getEndpoint(this.redisDocPath, environment.redisDocRepo.json);

    return this.http.get<GithubContent>(endpoint).pipe(
      map((contentFile) => {
        const decodedCommands: Command[] = JSON.parse(atob(contentFile.content));
        return Object.keys(decodedCommands).map((key) => ({ key, ...decodedCommands[key]}));
      }),
      catchError(() => of([]))
    );
  }

  /**
   * Fetch documentation relative to input command
   * @param command name of command
   */
  fetchDocumentation(command: string) {
    const headers = this.cachingService.cacheableHeaderObj;
    const file = environment.redisDocRepo.doc.replace('_file', command.replace(' ', '-').toLowerCase());
    const endpoint = this.getEndpoint(this.redisDocPath, file);

    return this.http.get<GithubContent>(endpoint, { headers }).pipe(
        map((contentFile) => atob(contentFile.content)),
        catchError(() => of('No documentation found'))
      );
  }

  /**
   * Fetch available tutorial list
   *
   * @returns Observable<Tutorial[]>
   */
  fetchTutorials(): Observable<Tutorial[]> {
    const endpoint = this.getEndpoint(this.tutorialsPath, environment.patternsRepo.json);

    return this.http.get<GithubContent | string>(endpoint).pipe(
        map((contentFile: any) => {
          const decodedTutorials: Tutorial[] = JSON.parse(atob(contentFile.content));
          return Object.keys(decodedTutorials).map((key) => ({ key, ...decodedTutorials[key]}));
        }),
        catchError(() => of([]))
      );
  }

  /**
   * Fetch active tutorial content file
   * @param key the key of active tutorial
   *
   * @returns Observable<string>
   */
  fetchTutorial(key: string): Observable<string> {
    const headers = this.cachingService.cacheableHeaderObj;
    const endpoint = this.getEndpoint(this.tutorialsPath, `${key}.md`);

    return this.http.get<GithubContent | string>(endpoint, { headers }).pipe(
        map((contentFile: any) => atob(contentFile.content)),
        catchError(() => of('No pattern found'))
      );
  }

  /**
   * Format url for http request
   * @param repo repo path where fetch from
   * @param file file path to get
   */
  private getEndpoint(repo: string, file: string): string {
    return environment.githubEndpoint.replace('_repo_', repo).replace('_file_', file);
  }
}
