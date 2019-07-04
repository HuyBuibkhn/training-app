import { RouterModule } from '@angular/router';
import { ClientDetailModule } from './../client-detail/client-detail.module';
import { ClientsComponent } from './clients.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ClientDetailModule,
    RouterModule.forChild([{ path: '', component: ClientsComponent }])
  ],
  declarations: [ClientsComponent]
})
export class ClientsModule { }
