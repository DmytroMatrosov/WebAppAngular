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
      })
  }
}

export interface ClassTable {
  className: string;
  classYear: number;
  numOfStudents: number;
  id: number;
  classDescription: string;
  isActive: boolean;
}

