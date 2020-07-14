import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  moresize:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  execute(data:any){
    console.log(data.target.files[0]);
    console.log(data.target.files[0].size);
    console.log(data.target.files[0].type);
    if(data.target.files[0].size<5242880 ){
    var reader = new FileReader();      
    reader.readAsDataURL(data.target.files[0]); 
    reader.onload = (_event) => { 
      console.log(reader.result); 
    }
    }else{
      this.moresize=true;
    }
  }
  }


