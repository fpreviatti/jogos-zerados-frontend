import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
})
export class LandPageComponent implements OnInit {
  imageURL: string =
    'https://gamehall.com.br/wp-content/uploads/2020/08/65008-gettyimages-843648918.jpg';

  constructor() {}

  getBackgroundImage() {
    return {
      'background-image': 'url(' + this.imageURL + ')',
    };
  }

  ngOnInit(): void {}

  onButtonClick() {}
}
