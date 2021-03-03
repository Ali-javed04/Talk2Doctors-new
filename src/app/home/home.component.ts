import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  keyword = 'name';
  place = 'Search Your Doctors';
  searchValue : string = '';
data = [
  'Ali',
  'wasseem',
  'jamal',
  'hamza',
  'umer',
  'sufyan',
  'farhan',
  'umair'
];
  constructor( private toaster: ToastrService,
              private router: Router) { }

  ngOnInit(): void {

  }

  slides = [
    {img: "assets/smm1.jpg",title: "paksitan"},
    {img: "assets/smm2.jpg",title: 'India'},
    {img: "assets/smm3.jpg" ,title: 'sudia Araab'},
    {img: "assets/smm4.jpg",title: 'dubai'}

  ];
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "autoplaySpeed": 3000,
    "autoplay": true,
    "nextArrow": '<i class="fa fa-chevron-right nextone" aria-hidden="true"></i>',
    "prevArrow":'<i class="fa fa-chevron-left previousone" aria-hidden="true"></i>',
    "dotClass":'slick-dots',
    "swipeToSlide":true
};



toast() {
  this.toaster.success('Hello world!', 'Toastr fun!');
}
selectEvent(item) {
  // do something with selected item
  this.searchValue = item
}

onChangeSearch(val: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.

}

onFocused(e){
  // do something when input is focused
}
Search() {
  this.router.navigate(['/search'], { queryParams: { name: this.searchValue } })
}
}
