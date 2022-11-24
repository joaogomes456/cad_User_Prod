import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadProdPageRoutingModule } from './cad-prod-routing.module';

import { CadProdPage } from './cad-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CadProdPageRoutingModule
  ],
  declarations: [CadProdPage]
})
export class CadProdPageModule {}
