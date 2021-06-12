import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuSizePageRoutingModule } from './menu-size-routing.module';

import { MenuSizePage } from './menu-size.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuSizePageRoutingModule
  ],
  declarations: [MenuSizePage]
})
export class MenuSizePageModule {}
