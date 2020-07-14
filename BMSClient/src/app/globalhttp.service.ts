import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalvariablesService } from './globalvariables.service';
import { Observable } from 'rxjs/internal/Observable';
import {map,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalhttpService {
  API:string;
  constructor(private http:HttpClient,private globalvariable:GlobalvariablesService) {
    /*Api url that is defined in globalvariable service*/
    this.API=this.globalvariable.ApiUrl;
   }
   /*Method to post data*/
   postData(data:any,apiname:string):Observable<any>{
    
     return this.http.post(this.API+apiname,data);

   }
   /*Method to get data*/
   getData(data:any,apiname:string):Observable<any>{
    
    return this.http.get(this.API+apiname,data);

   }
   updateData(data:any,apiname:string):Observable<any>{
     return

   }
   deleteData(data:any,apiname:string):Observable<any>{
     return

   }
}
