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
  // declair the obj  activeUniqueClasses
  activeUniqueClassList = new Map();
  nonActiveUniqueClassList = new Map();
  // nonActiveUniqueClassList = {
  //   "uniqueGroupofClass": ClassTable[]
  // };

  // Получить данные с классами с сервера.
  // Отфильтровать их по статусу.
  // Поместить в зависимости от статуса в мэп с ключем уникальный клас и значением массивом классов.


  getClasses(){
    this.http.get(
      `${this.endPoint}classes`,
      { headers: { Authorization: this.localStorageToken } }
    ).subscribe(
      response => { 
        //response['data']
        this.groupByStatus(response['data']);
      })      
  }
  groupByStatus(classList){
    classList.forEach(function(schoolClass){
      debugger
      const uniqueClassName = this.getUniqueClassName(schoolClass); 
      if(schoolClass.isActive){
        this.activeUniqueClassList.has(uniqueClassName) ?
        this.activeUniqueClassList.get(uniqueClassName).push(schoolClass) :
        this.activeUniqueClassList.set(uniqueClassName,[schoolClass])
      }
      else{
        this.nonActiveUniqueClassList.has(uniqueClassName) ?
        this.nonActiveUniqueClassList.get(uniqueClassName).push(schoolClass) :
        this.nonActiveUniqueClassList.set(uniqueClassName,[schoolClass])
      }
    })
  }

  getUniqueClassNames(schoolClass){
    let indexOfDash = schoolClass['className'].indexOf('-');
    if(schoolClass['className'].includes('(')){
      return schoolClass['className'].substring(0,indexOfDash) + ")"
    }
    else{
      return schoolClass['className'].substring(0,indexOfDash)
    }
  }
  ngOnInit() {
    // turn on httpService.
    // send get req. to endpoint to recieve classlist.
    // add to this req. url params 'Authorization' 
    // after recieving response, to assign recieved data to dataSource (this.dataSource)
    this.getClasses()
    console.log(this.activeUniqueClassList);
    console.log(this.nonActiveUniqueClassList);
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