import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  constructor(public navCtrl: NavController, private activatedRoute: ActivatedRoute) { 
    
  }
  index = 0
  typeCards = 'Animales'
  tamano = [5,4,10]
  count = {
    minutos:0,
    segundos:0
  }
  attempts = null
  orderForThisRound = []
  availableImages = [
    ['Arcoiris','Bandera','Calendario','Chat','Corazon','Desfile','Globo','Puño','Mundo','Corazon2'],
    ['Calamar','Ciervo','Elefante','Hipopotamo','Jabali','Jirafa','Loro','Mantaraya','Panda','Serpiente'] 
  ]
  cards = []
  canPlay = false
  card1 = null
  card2 = null
  maxPairNumber = null;
  foundPairs = 0
  async ionViewWillEnter(){
    await this.loadData()
    setTimeout(this.startGame.bind(this), 100);
  }
  setTimer(){
    this.count.segundos++
    if (this.count.segundos == 60){
      this.count.segundos = 0
      this.count.minutos ++
    }
    if (this.count.minutos == 60){
      this.count.segundos = 0
      this.count.minutos = 0
    }
    setTimeout(()=>{
      this.setTimer()
    },1000)
  }
  loadData()
  {
    let intro = document.getElementsByTagName('main')
    switch (this.activatedRoute.snapshot.paramMap.get('size')) {
      case '3':
        intro[0].style.cssText = 'grid-template-columns: repeat(3, 1fr);'
        this.tamano[0] = 3
        this.tamano[1] = 2
        this.tamano[2] = 3
        this.maxPairNumber = 3
        break;
      case '6':
        intro[0].style.cssText = 'grid-template-columns: repeat(4, 1fr);'
        this.tamano[0] = 4
        this.tamano[1] = 3
        this.tamano[2] = 6
        this.maxPairNumber = 6
        break;
      case '10':
        intro[0].style.cssText = 'grid-template-columns: repeat(5, 1fr);'
        this.tamano[0] = 5
        this.tamano[1] = 4
        this.tamano[2] = 10
        this.maxPairNumber = 10
        break;
    }
    this.typeCards = this.activatedRoute.snapshot.paramMap.get('type')
    switch (this.typeCards) {
      case 'Animales':
        this.index = 1
        break;
      case 'Orgullo':
        this.index = 0
        break;
    }
  }

  async startGame(){  
    this.count.minutos = 0
    this.count.segundos = 0
    this.foundPairs = 0
    this.newOrder();
    this.ImagesInCards()
    this.openCards()
  }
  

  newOrder(){

    this.orderForThisRound = this.availableImages[this.index].slice(0,this.tamano[2]).concat(this.availableImages[this.index].slice(0,this.tamano[2]))
    this.orderForThisRound.sort(()=> Math.random() - 0.5)
  }

  ImagesInCards(){
    this.cards = Array.from(document.querySelectorAll(".board-game figure"))
    for (const key in this.cards){
      console.log(key)
      const card = this.cards[key]
      const image = this.orderForThisRound[key]
      const imgLabel = card.children[1].children[0]
      card.dataset.image = image
      imgLabel.src = `../../assets/${this.typeCards}/${image}.PNG` 
    }
  }
  
  openCards(){
    this.cards.forEach(card => card.classList.add("opened"))
    setTimeout(()=>{
      this.closeCards()
    }, 1500)
  }

  closeCards()
  {
    this.cards.forEach(card => card.classList.remove("opened"))
    this.addClickEvents()
    this.canPlay = true
  }

  addClickEvents(){
    this.cards.forEach(_this =>_this.addEventListener("click", this.flipCard.bind(this)));
  }

  flipCard(e){
    const clickedCard = e.target;
    if (this.canPlay && !clickedCard.classList.contains("opened")) {        
        clickedCard.classList.add("opened");
        this.checkPair( clickedCard.dataset.image );
    }
  }

  checkPair(image){
    if (!this.card1) this.card1 = image;
    else this.card2 = image;

    if (this.card1 && this.card2) {
        this.attempts++
        if (this.card1 == this.card2) {
            this.canPlay = false;
            setTimeout(this.checkIfWon.bind(this), 300)
            
        }
        else {
            this.canPlay = false;
            setTimeout(this.resetOpenedCards.bind(this), 800)
        }
    }
  }

  resetOpenedCards() {
        
    const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
    const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

    firstOpened.classList.remove("opened");
    secondOpened.classList.remove("opened");

    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;

}

checkIfWon() {

    this.foundPairs++;

    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;
    console.log(this.tamano)
    if (this.maxPairNumber == this.foundPairs) {

        alert("¡Ganaste!");
        this.setNewGame();
        
    }
}
setNewGame() {
  this.removeClickEvents();
  this.cards.forEach(card => card.classList.remove("opened"));
  setTimeout(this.startGame.bind(this), 1000);

}

removeClickEvents() {
  this.cards.forEach(_this => _this.removeEventListener("click", this.flipCard));
}


}
