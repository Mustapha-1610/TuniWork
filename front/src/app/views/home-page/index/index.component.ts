import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css',

"../../../../assets/templateDental/css/maicons.css",
"../../../../assets/templateDental/css/bootstrap.css",
"../../../../assets/templateDental/vendor/owl-carousel/css/owl.carousel.css",
"../../../../assets/templateDental/vendor/animate/animate.css",
"../../../../assets/templateDental/css/theme.css",
]
})
export class IndexComponent implements OnInit {
  backgroundImages: string[] = ['../../../../assets/templateDental/img/about-bg.png', '../../../../assets/templateDental/img/bg_image_1.jpg', '../../../../assets/templateDental/img/mobile_app.png'];
  currentImageIndex: number = 0;

  ngOnInit(): void {
    this.startImageChangeInterval();
  }

  startImageChangeInterval(): void {
    const interval$ = interval(5000); // 5000 milliseconds = 5 seconds

    interval$.subscribe(() => {
      this.changeBackgroundImage();
    });
  }

  changeBackgroundImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
  }
}
