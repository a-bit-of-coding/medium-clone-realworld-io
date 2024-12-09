import {Component, Input, OnInit} from '@angular/core'
import {IErrorResponse} from '../../types/error.interface'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'mc-error-message',
  templateUrl: './error-messages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ErrorMessageComponent implements OnInit {
  @Input() errors: IErrorResponse = {}

  errorMessages: string[] = []

  constructor() {}

  ngOnInit() {
    this.errorMessages = Object.keys(this.errors).map((name: string) => {
      const message = this.errors[name]
      return `${name} ${message}`
    })
  }
}
