import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ICountSpecility, ITopRatedDoctors } from '../interfaces/appInterface';
import { HomeService } from '../Services/home.service';
import { DeviceDetectorService } from 'ngx-device-detector';



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
 countspecility: ICountSpecility[]
 slideToshow:number  = 5
 showTab:number = 1;
 topRatedDoctors: ITopRatedDoctors[]
  constructor( private toaster: ToastrService,
              private router: Router,
              private homeService: HomeService,
              private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {

    const isMobile = this.deviceService.isMobile();
    console.log('mobile',isMobile)
    if(isMobile){
        this.slideToshow = 2
        this.doctorSlide = {
          "nextArrow": '<i class="fa fa-chevron-right nextone" aria-hidden="true"></i>',
          "prevArrow":'<i class="fa fa-chevron-left previousone" aria-hidden="true"></i>',
          "slidesToShow": this.slideToshow,
          "slidesToScroll": 1,
        }
    }
    else {
      this.slideToshow = 5

    }



    this.populateDoctorsList()
  }

  slides = [
    {img: "assets/smm1.jpg",title: "paksitan"},
    {img: "assets/smm2.jpg",title: 'India'},
    {img: "assets/smm3.jpg" ,title: 'sudia Araab'},
    {img: "assets/smm4.jpg",title: 'dubai'}

  ];
  doctorSlide = {
    "nextArrow": '<button type="button" data-role="none" class="slick-arrow slick-next" style="display: block; right:3px " > Next</button>',
    "prevArrow":'<button type="button" data-role="none" class="slick-arrow slick-prev" style="display: block; left:-8px"> Previous</button>',
    "slidesToShow": this.slideToshow,
    "slidesToScroll": 1,
  }
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
blogs = [
  {
    blogImg: "/assets/smm1.jpg",
    authorImg:"/assets/smm1.jpg",
    authorName:'Dr abdula wahab',
    date:'2 feb 2021',
    blogTitle:'Corona Causes Death',
    desp: 'ist line which is show about the blog desicribe the blog of which is below',
  },
  {
    blogImg: "/assets/smm2.jpg",
    authorImg:"/assets/smm2.jpg",
    authorName:'Dr abdula wahab',
    date:'2 feb 2021',
    blogTitle:'Corona Causes Death',
    desp: 'ist line which is show about the blog desicribe the blog of which is below',
  },
  {
    blogImg: "/assets/smm3.jpg",
    authorImg:"/assets/smm3.jpg",
    authorName:'Dr Jahnezab',
    date:'2 feb 2021',
    blogTitle:'Corona Causes Death',
    desp: 'ist line which is show about the blog desicribe the blog of which is below',
  },
  {
    blogImg: "/assets/smm4.jpg",
    authorImg:"/assets/smm4.jpg",
    authorName:'Dr Mubeen Khan',
    date:'2 feb 2021',
    blogTitle:'Corona Causes Death',
    desp: 'ist line which is show about the blog desicribe the blog of which is below',
  },

]


 tabToggle(index: number): any{
  return this.showTab =index;
}
 tabtoggleplus(index: number): any{
  if(index > 3 ){
    return this.showTab = 1;
  }else
    return this.showTab = index+1;
}
 toggletabmminus(index: number): any{
  if(index == 1 ){
    return this.showTab = 4;
  }else

    return this.showTab = index-1;
}


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
public populateDoctorsList(): void {
  this.homeService.getDoctorsList('')
    .then(response => {
      this.countspecility = response.countDoctorBySpeciality
      this.countspecility = _.take(_.sortBy(this.countspecility, x => x.totalDoctors).reverse(), 8)
      console.log("countspecility",this.countspecility[0].name)
      this.topRatedDoctors = response.doctorsList
      this.topRatedDoctors = _.take(_.sortBy(this.topRatedDoctors, x => x.doctorStarRatting).reverse(), 8)
      console.log('top rated  doctor',this.topRatedDoctors)})
    .catch(error => console.error(error))
}
public covertPhotoUrl(photoUrl){
  return `data:image/jpeg;base64,${photoUrl}`

}
}
