import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {Store} from '@ngrx/store'
import {selectCurrentUser} from 'src/app/auth/store/reducer'

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent {
  @Input() tagName?: string

  constructor(private readonly store: Store) {}

  currentUser$ = this.store.select(selectCurrentUser)
}
