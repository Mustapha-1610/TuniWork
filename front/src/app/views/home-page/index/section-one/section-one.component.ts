
import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.css',
  "../../../../../assets/templateDental/css/maicons.css",
  "../../../../../assets/templateDental/css/bootstrap.css",
  "../../../../../assets/templateDental/vendor/owl-carousel/css/owl.carousel.css",
  "../../../../../assets/templateDental/vendor/animate/animate.css",
  "../../../../../assets/templateDental/css/theme.css",
]
})
export class SectionOneComponent implements OnInit {
  backgroundImages: string[] = ['../../../../assets/templateDental/img/img1.jpg', '../../../../assets/templateDental/img/img6.jpg', '../../../../assets/templateDental/img/img3.jpg'];
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



