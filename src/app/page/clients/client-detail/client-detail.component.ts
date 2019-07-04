import { ClientService } from './../../../services/client.service';
import { Client } from './../../../interfaces/client.model';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  private client: any;
  formClient = new FormGroup({
    first: new FormControl('', [
      Validators.required,
    ]),
    last: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z][a-z0-9_\.+-]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$')
    ]),
    phone1: new FormControl('', [
      Validators.required,
      Validators.pattern('^[+,0-9]{0,1}[0-9]*$')
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{2,2}[A-Z][0-9] [0-9]{4,5}$')
    ]),

  });
  validationMessages = {
    first: [
      { type: 'required', message: 'Firstname is required.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    ],
    last: [
      { type: 'required', message: 'Lastname is required.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Your mail illegal' }
    ],
    phone1: [
      { type: 'required', message: 'Phone is required.' },
      { type: 'pattern', message: 'Your phone must contain only number.' },
    ],
    number: [
      { type: 'required', message: 'Phone is required.' },
      { type: 'pattern', message: 'Your phone must contain only number.' },
    ],
  };
  submitted = false;
  constructor(
    navParams: NavParams,
    public clientDetailModalController: ModalController,
    private clientService: ClientService,
  ) {
    this.client = navParams.data.client;
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formClient.setValue({
      first: this.client.first,
      last: this.client.last,
      email: this.client.email,
      phone1: this.client.phone1,
      number: this.client.number ? this.client.number : ''
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.clientDetailModalController.dismiss({
      'dismissed': true
    });
  }

  onSubmit() {
    this.submitted = true;
    // let data = Object.assign({}, this.client);
    this.clientService.updateClient(this.client.id, this.formClient.value);
    Object.assign(this.client, this.formClient.value);
    this.dismiss();
  }
}
