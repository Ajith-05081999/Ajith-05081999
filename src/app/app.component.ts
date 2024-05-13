import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserService } from './services/user.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('dots') dots!: ElementRef;
  currentSlideIndex = 0;
  interval$ = new Subject<void>(); // Modify the Subject type to void

  sidebarHidden = false;
  title = 'Ajit5551999';
  amount = '$0.3';
  clicks = '30';
  views = '27';
  time = '42h';
  country = '';
  temp = 0;
  startDate: Date;
  endDate: Date;

  constructor(private userservice: UserService) {
    this.startDate = new Date();
    this.endDate = new Date();
    this.Api();
  }

  ngOnInit(): void {
    interval(5000)
      .pipe(takeUntil(this.interval$))
      .subscribe(() => this.changeSlide((this.currentSlideIndex + 1) % 3));
  }

  ngOnDestroy(): void {
    this.interval$.next();
    this.interval$.complete();
  }

  scrollToSlide(index: number): void {
    const scrollPosition =
      this.sliderContainer.nativeElement.offsetWidth * index;
    this.sliderContainer.nativeElement.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }
  changeSlide(index: number): void {
    this.currentSlideIndex = index;
    this.scrollToSlide(index);
  }

  onStartDateChange(event: any) {
    this.startDate = event.value;
  }

  onEndDateChange(event: any) {
    this.endDate = event.value;
  }

  Api() {
    this.userservice.Apicall().subscribe((result: any) => {
      this.temp = result.current.temp_f;
      this.country = result.location.country;
      console.log(result);
    });
  }
}
