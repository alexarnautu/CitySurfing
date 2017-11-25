import { Component } from '@angular/core';
import { StyleService } from '../../services/style.service';

@Component({
  selector: 'cs-listing-component',
  templateUrl: './listing.component.html',
})
export class ListingComponent {
  constructor(private styleService: StyleService) {
    styleService.setStyle('no_background');
  }

}
