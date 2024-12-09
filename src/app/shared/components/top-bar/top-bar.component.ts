import {Component, Input, OnInit} from '@angular/core'
import {IErrorResponse} from '../../types/error.interface'
import {CommonModule} from '@angular/common'
import {Store} from '@ngrx/store'
import {selectCurrentUser} from 'src/app/auth/store/reducer'
import {combineLatest} from 'rxjs'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class TopBarComponent implements OnInit {
  @Input() errors: IErrorResponse = {}

  _data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  })

  constructor(private readonly store: Store) {}

  ngOnInit() {}
}
