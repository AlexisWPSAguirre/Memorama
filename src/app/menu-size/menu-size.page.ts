import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu-size',
  templateUrl: './menu-size.page.html',
  styleUrls: ['./menu-size.page.scss'],
})
export class MenuSizePage implements OnInit {

  constructor(private NavCtrl: NavController) { }
  tamano = 3
  ngOnInit() {
  }
  size(b){
    this.tamano = b
    this.NavCtrl.navigateBack(`/menu/${this.tamano}`)
  }

}
