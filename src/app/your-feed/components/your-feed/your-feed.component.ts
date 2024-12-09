import {Component} from '@angular/core'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {BannerComponent} from '../../../shared/components/banner/banner.component'
import {FeedTogglerComponent} from '../../../shared/components/feed-toggler/feed-toggler.component'
import {PopularTagsComponent} from '../../../shared/components/popular-tags/popular-tags.component'

@Component({
  selector: 'mc-your-feed',
  templateUrl: './your-feed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    FeedTogglerComponent,
    PopularTagsComponent,
  ],
})
export class YourFeedComponent {
  apiUrl = '/articles/feed'
}
