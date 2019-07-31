import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.scss']
})
export class ClassListComponent implements OnInit {
  constructor(
    private http: HttpClient,
  ) { }
  private endPoint: string = environment.APIEndpoint;
  localStorageToken: string = localStorage.getItem('token');

  displayedColumns: string[] = [
    'className',
    'classYear',
    'numOfStudents'
  ];
  dataSource: ClassTable[];
  activeClassList: ClassTable[];
  nonActiveClassList: ClassTable[];
  // declair the obj  activeUniqueClasses
  activeUniqueClasses = {};
  nonActiveUniqueClassList: ClassTable[];

  ngOnInit() {
    // turn on httpService.
    // send get req. to endpoint to recieve classlist.
    // add to this req. url params 'Authorization' 
    // after recieving response, to assign recieved data to dataSource (this.dataSource)
    this.http.get(
      `${this.endPoint}classes`,
      { headers: { Authorization: this.localStorageToken } }
    ).subscribe(
      response => {
        this.dataSource = response['data'] as ClassTable[];
        // take only "active" objects from arr (isActive: true/false)
        this.activeClassList = this.dataSource.filter(activeClass => activeClass.isActive === true);
        this.nonActiveClassList = this.dataSource.filter(nonActiveClass => nonActiveClass.isActive === false);
        
          for (var oneClass of this.activeClassList) {
          var indexOfDash = oneClass['className'].indexOf('-'); 
          var uniqueClass = oneClass['className'].includes('(') ? oneClass['className'].substring(0,indexOfDash) + ')' : oneClass['className'].substring(0,indexOfDash);
          this.activeUniqueClasses[uniqueClass] ? this.activeUniqueClasses[uniqueClass].push(oneClass): this.activeUniqueClasses[uniqueClass] = [oneClass]                   
        }
      })
      console.log(this.activeUniqueClasses);
  }
  // +++take only "active" objects from arr (isActive: true/false)
  // +++declair the obj  activeUniqueClasses
  // take the key "className" from each object/"class" of arr of active classes
  // check if its value till the symbol"-" exhists as a key in activeUniqueClasses, add this obj as value of arr to current key
  // if not create the key with value of arr and add the current obj to this arr
  // create accordions with all keys from activeUniqueClasses obj in active classes accordion
  // put to each accordion value / classlist, according to name of accordion/key of obj
}


export interface ClassTable {
  className: string;
  classYear: number;
  numOfStudents: number;
  id: number;
  classDescription: string;
  isActive: boolean;
}