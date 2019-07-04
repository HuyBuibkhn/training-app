import { ClientService } from './../../../services/client.service';
import { Client } from './../../../interfaces/client.model';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClientDetailComponent } from './../client-detail/client-detail.component';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  typeClient = 'active';
  clients: Client[] = [];
  clientsTypeShow: Client[] = [];
  clientsShow: Client[] = [];
  textSearch = '';
  constructor(
    private clientService: ClientService,
    public clientDetailModalController: ModalController
  ) { }
  isItemAvailable = false;
  ngOnInit() {
    this.getClients();
  }
  async presentModal(client: Client) {
    const modalClientDetail = await this.clientDetailModalController.create({
      component: ClientDetailComponent,
      componentProps: {
        client
      }
    });
    return await modalClientDetail.present();
  }
  getClients() {
    this.clientService.getClients()
      .subscribe(
        clients => this.clients = this.clientService.getAllClient(),
        err => console.log(err),
        () => {
          this.clientsShow = this.clients.filter(client => client.status === this.typeClient);
          this.clientsTypeShow = this.clients.filter(client => client.status === this.typeClient);
        }
      );
  }

  segmentChanged(ev: any) {
    if (this.typeClient !== ev.detail.value) {
      this.typeClient = ev.detail.value;
      // this.clientsShow = this.clients.filter(client => client.status === this.typeClient);
      this.clientsTypeShow = this.clients.filter(client => client.status === this.typeClient);
      this.getItems(this.textSearch);
    }
  }

  getItems(text: string) {
    const val = text;
    this.textSearch = text;
    if (val && val.trim() !== '') {
      this.clientsShow = this.clientsTypeShow.filter((item) => {
        const fullName = `${item.first} ${item.last}`;
        if (fullName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return item;
        }
      });
    } else {
      this.cleared();
    }
  }
  cleared() {
    this.clientsShow = this.clientsTypeShow;
  }
}
