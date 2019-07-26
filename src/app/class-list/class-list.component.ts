import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export interface ClassTable {
  className: string;
  year: number;
  position: number;
}

const ELEMENT_DATA: ClassTable[] = [
  {position: 1, className: '1-a', year: 2001,},
  {position: 2, className: '1-b', year: 2001,},
  {position: 3, className: '1-c', year: 2001,},
  {position: 4, className: '1-d', year: 2001,},
  {position: 5, className: '1-e', year: 2001,},
  {position: 6, className: '1-f', year: 2001,},
  {position: 7, className: '1-g', year: 2001,},
  {position: 8, className: '1-h', year: 2001,},
  {position: 9, className: '1-j', year: 2001,},
];

export class TableFilteringExample {
  displayedColumns: string[] = ['className', 'year',];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

