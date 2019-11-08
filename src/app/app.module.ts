import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '@app/app.component';
import { CacheInterceptor } from '@app/core/interceptors/cache-interceptor';
import { HeaderComponent } from '@app/core/components/header/header.component';
import { CommandDocumentationComponent } from '@app/features/command/command-documentation/command-documentation.component';
import { CommandLineComponent } from '@app/features/command/command-line/command-line.component';
import { CommandListComponent } from '@app/features/command/command-list/command-list.component';
import { CommandSummaryComponent } from '@app/features/command/command-summary/command-summary.component';
import { TutorialListComponent } from '@app/features/tutorial/tutorial-list/tutorial-list.component';
import { TutorialContentComponent } from '@app/features/tutorial/tutorial-content/tutorial-content.component';
import { ConfigService } from '@app/shared/services/config.service';
import { MarkdownPipe } from '@app/shared/pipes/markdown.pipe';
import { SearchFilterPipe } from '@app/shared/pipes/search-filter.pipe';
import { CommandOutputComponent } from '@app/features/command/command-output/command-output.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkdownPipe,
    CommandListComponent,
    CommandSummaryComponent,
    CommandDocumentationComponent,
    TutorialListComponent,
    HeaderComponent,
    TutorialContentComponent,
    CommandLineComponent,
    CommandOutputComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => {
        return () => configService.init();
      },
      deps: [ ConfigService ],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
