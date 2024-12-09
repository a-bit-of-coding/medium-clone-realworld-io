import {Component} from '@angular/core'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'

@Component({
  selector: 'mc-banner',
  templateUrl: './banner.component.html',
  standalone: true,
  imports: [FeedComponent],
})
export class BannerComponent {
  // apiUrl = '/articles'
}
