import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import {Employee} from '../shared/employee.model';
import {element} from 'protractor';
import {AngularFireAction, DatabaseSnapshot} from '@angular/fire/database';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    let x = this.empService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      // tslint:disable-next-line:no-shadowed-variable
      item.forEach((element: AngularFireAction<DatabaseSnapshot<any>>) => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);

      });
    });
  }

}
