import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Tutorial } from '../../../shared/models/tutorial.interface';

enum Paginator {
  FIRST_PAGE,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  LAST_PAGE
}
@Component({
  selector: 'tr-tutorial-content',
  templateUrl: './tutorial-content.component.html',
  styleUrls: ['./tutorial-content.component.scss']
})
export class TutorialContentComponent {
  @Input('tutorialContent') set newStep(data: Array<string>) {
    this.steps = data;
    this.currentStep = 0;
  }
  @Input() activeTutorial: Tutorial;
  @Output() help = new EventEmitter<string>();
  @Output() run = new EventEmitter<string>();

  currentStep: number;
  steps: Array<string>;
  paginator = Paginator;

  /**
   *  On click occurs emits run or help event based on elemnt target hash
   */
  @HostListener('click', ['$event'])
    onClick(targetElement) {
      if (targetElement.target.nodeName !== 'A') {
        return;
      }

      const command = targetElement.target.innerText;
      if (targetElement.target.hash === '#run') {
        this.run.emit(command);
      } else {
        this.help.emit(command);
      }
    }

  /**
   * Navigate to new page of pattern
   * @param type boolean (TRUE: previous step, FALSE: next step)
   */
  changeStep(type: Paginator) {
    switch (type) {
      case Paginator.FIRST_PAGE:
        this.currentStep = 0;
        break;
      case Paginator.PREVIOUS_PAGE:
        this.currentStep--;
        break;
      case Paginator.NEXT_PAGE:
          this.currentStep++;
          break;
      case Paginator.LAST_PAGE:
        this.currentStep = this.steps.length - 1;
    }
  }
}
