import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  regForm: FormGroup;
  constructor(private empService: EmployeeService, private fb: FormBuilder, private toast: ToastrService) { }

  // @ts-ignore
  regForm = this.fb.group({
    $key: [null],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    rollNo: ['', [Validators.required]],
    vehicleNo: ['', [Validators.required]]
  });

  ngOnInit() {
    this.empService.getData();
    this.resetForm();
  }

  onSubmit() {
    this.empService.insertEmployee(this.regForm.value);
    this.resetForm();
    this.toast.success('Submitted Successfully', 'Employee Register');
  }

  resetForm(){
    if(this.regForm != null) {
      this.regForm.reset();
    }
    this.empService.selEmp = {
      $key: null,
      name: '',
      email: '',
      rollNo: '',
      vehicleNo: ''
    };
  }

}
