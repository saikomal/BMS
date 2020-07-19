import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {GlobalhttpService} from "../globalhttp.service";
import { GlobalvariablesService } from '../globalvariables.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {
  moresize:boolean=false;
  PostDetails: FormGroup;
  ApiUrl:any;
  constructor(private _formBuilder: FormBuilder,private httpClient: HttpClient,private globalhttp:GlobalhttpService,private globalvariable:GlobalvariablesService) {
    this.ApiUrl=this.globalvariable.ApiUrl;
  }

  ngOnInit(): void {
    this.PostDetails=this._formBuilder.group({
      c_name:["",[Validators.required]],
      c_logo:["",[Validators.required]],
      c_description:["",[Validators.required]]
    })
  }
  execute(data:any){
    console.log(data.target.files[0]);
    const file=data.target.files[0];
    
    console.log(data.target.files[0].size);
    console.log(data.target.files[0].type);
    if(data.target.files[0].size<5242880 ){

/*
      this.PostDetails.patchValue({
        c_logo:data.target.files[0]
      });
      this.PostDetails.get('c_logo').updateValueAndValidity();
      */
     this.PostDetails.get('c_logo').setValue(file);
/*
    var reader = new FileReader();      
    reader.readAsDataURL(data.target.files[0]); 
    reader.onload = (_event) => { 
      console.log(reader.result); 
    }*/
    }else{
      this.moresize=true;
    }
  }
  postdata(){
    if(this.PostDetails.valid){
      var formData:any=new FormData();
      formData.append("companyname",this.PostDetails.get('c_name').value);
      formData.append("companylogo",this.PostDetails.get('c_logo').value);
      formData.append("description",this.PostDetails.get('c_description').value);
      console.log(formData);
      this.globalhttp.postData(formData,"company").subscribe((data:any)=>{
        console.log(data);
      })
      
      /*this.httpClient.post(this.ApiUrl+"company")*/
      
    }else{

    }
  }

  









  }


