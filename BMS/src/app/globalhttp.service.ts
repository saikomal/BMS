import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GlobalhttpService} from '../globalhttp.service';
import { Observable } from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalhttpService {
  API:string;
  constructor(private http:HttpClient,private globalvariable:GlobalhttpService) {
    /*Api url that is defined in globalvariable service*/
    this.API=this.globalvariable.ApiUrl;
   }
   /*Method to post data*/
   postData(data:any,apiname:string):Observable<any>{
     let options=data;
     return this.http.post(this.API+apiname,JSON.stringify(options)).pipe(tap(res=>res));

   }
   /*Method to get data*/
   getData(data:any):Observable<any>{
     let options=data;
    return this.http.get(this.API+apiname,JSON.stringify(options)).pipe(tap(res=>res));

   }
   updateData(data:any):Observable<any>{

   }
   deleteData(data:any):Observable<any>{

   }
}
