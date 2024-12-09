import {Component, OnInit} from '@angular/core'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {BannerComponent} from '../../../shared/components/banner/banner.component'
import {FeedTogglerComponent} from '../../../shared/components/feed-toggler/feed-toggler.component'
import {PopularTagsComponent} from '../../../shared/components/popular-tags/popular-tags.component'
import {ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'mc-tag-feed',
  templateUrl: './tag-feed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    FeedTogglerComponent,
    PopularTagsComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  apiUrl: string = ''
  tagName: string = ''

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug']
      this.apiUrl = `/articles?tag=${this.tagName}`
    })
  }
}
