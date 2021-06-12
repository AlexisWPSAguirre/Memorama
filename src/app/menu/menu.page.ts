import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private NavCtrl: NavController) { }

  tamano = null
  type = null
  ngOnInit() {
    this.tamano = this.activatedRoute.snapshot.paramMap.get('size')
  }

  loadCards(type){
    this.type = type
    this.NavCtrl.navigateBack(`/home/${this.tamano}/${this.type}`)
  }

}
