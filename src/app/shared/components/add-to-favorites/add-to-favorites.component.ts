import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {addToFavoritesActions} from './store/actions'
import {AddToFavoritesService} from './services/add-to-favorites.service'

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesComponent {
  @Input() isFavorited: boolean = false
  @Input() favoritesCount: number = 0
  @Input() articleSlug: string = ''

  constructor(private readonly store: Store) {}

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    )
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1
    } else {
      this.favoritesCount = this.favoritesCount + 1
    }

    this.isFavorited = !this.isFavorited
  }
}
