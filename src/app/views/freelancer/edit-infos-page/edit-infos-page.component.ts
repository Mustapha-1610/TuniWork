import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-infos-page',
  templateUrl: './edit-infos-page.component.html',
  styleUrls: ['./edit-infos-page.component.css'],
})
export class EditInfosPageComponent implements OnInit {
  editInfoForm: any;
  constructor() {}
  ngOnInit() {
    this.editInfoForm = new FormGroup({
      Name: new FormControl(null),
      Surname: new FormControl(null),
      PhoneNumber: new FormControl(null),
    });
  }
  editInfos() {}
}
