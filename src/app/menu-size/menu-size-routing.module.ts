import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuSizePage } from './menu-size.page';

const routes: Routes = [
  {
    path: '',
    component: MenuSizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSizePageRoutingModule {}
