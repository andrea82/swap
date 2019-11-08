import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { Tutorial } from '@app/shared/models/tutorial.interface';

@Component({
  selector: 'tr-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss']
})
export class TutorialListComponent {
  @Input() tutorials$: Observable<Tutorial[]>;
  @Output() selected = new EventEmitter<Tutorial>();
  current: Tutorial;

  select(tutorial: Tutorial) {
    this.current = tutorial;
    this.selected.emit(tutorial);
  }
}
