import {Component, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {TopBarComponent} from './shared/components/top-bar/top-bar.component'
import {Store} from '@ngrx/store'
import {authActions} from './auth/store/actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser())
  }
}
