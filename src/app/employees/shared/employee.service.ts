import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Employee} from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  empList: AngularFireList<any>;
  selEmp: Employee = new Employee();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.empList = this.firebase.list('employees');
    return this.empList;
  }

  insertEmployee(employee: Employee) {
    this.empList.push({
      name : employee.name,
      email: employee.email,
      vehicleNo: employee.vehicleNo,
      rollNo: employee.rollNo
    });
  }

  updateEmployee(employee: Employee){
    this.empList.update(employee.vehicleNo,{ //changed here
      name : employee.name,
      email: employee.email,
      vehicleNo: employee.vehicleNo,
      rollNo: employee.rollNo
    });
  }

  deleteEmployee($key: string){
    this.empList.remove($key);
  }
}
