import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalvariablesService {
  /*Server Url*/
  readonly ApiUrl: string = 'http://ec2-52-16-101-173.eu-west-1.compute.amazonaws.com:5000/';
  constructor() { }
}
  