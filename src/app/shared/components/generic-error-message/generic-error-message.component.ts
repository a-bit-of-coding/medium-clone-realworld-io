import {Component, Input} from '@angular/core'

@Component({
  selector: 'mc-error-message',
  template: '<div>{{message}}</div>',
  standalone: true,
})
export class GenericErrorMessageComponent {
  @Input() message: string = 'Something went wrong'
}
