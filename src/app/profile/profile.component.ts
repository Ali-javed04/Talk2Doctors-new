import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  country: string;
  name: string;
  countrys = [
    {name:'Pakistan',flag:'assets/pakistan.png',isChecked:false},
    {name:'India',flag:'assets/india.png',isChecked:false},
    {name:'Afghanistan',flag:'assets/afghanistan.png',isChecked:true},
    {name:'Austrila',flag:'assets/australia.png',isChecked:false},
    {name:'America',flag:'assets/united-states.png',isChecked:false},
    {name:'Malysia',flag:'assets/malaysia.png',isChecked:false},
  ]
    globalCheck:boolean = false
    opencountry: boolean = false;


  allchecked() {
    this.countrys.map(country=>{
      if(this.globalCheck == false){
        country.isChecked = true
      }else{

      country.isChecked = false
      }
    })
  }

  constructor() { }

  ngOnInit(): void {
  }
  public isChecked(key: string): boolean {
    const isChecked = this.country === key
    this.country[key] = isChecked
    return isChecked
  }
  public onClickCountry(country): void {
    country.isChecked = !country.isChecked
  }

  openCountry() : void {
     this.opencountry = !this.opencountry ;
  }
}
