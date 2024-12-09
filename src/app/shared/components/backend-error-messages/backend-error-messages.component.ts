import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {IBackendErrors} from '../../types/backend-errors.interface'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessages implements OnInit {
  @Input() backendErrors: IBackendErrors = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ')
      return `${name} ${messages}`
    })
  }
}
