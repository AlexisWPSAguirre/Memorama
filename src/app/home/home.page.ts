import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  constructor() { 
    
  }

  async ngOnInit(){
    setTimeout(this.startGame.bind(this),600)
  }

  index = 0
  typeCards = 'Orgullo'
  tamano = [3,2,3]
  count = null
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
  maxPairNumber = this.tamano[2];
  foundPairs = 0

  async startGame(){
    this.cards = Array.from(document.querySelectorAll(".board-game figure"))
    this.foundPairs = 0
    this.newOrder();
    this.ImagesInCards();
    this.openCards()
  }
  type(item){
    this.typeCards = item
    switch (item) {
      case 'Animales':
        this.index = 1
        break;
      case 'Orgullo':
        this.index = 0
        break;
    }
    this.startGame()
  }
  newOrder(){
    console.log(this.cards)
    this.orderForThisRound = this.availableImages[this.index].slice(0,this.tamano[2]).concat(this.availableImages[this.index].slice(0,this.tamano[2]))
    this.orderForThisRound.sort(()=> Math.random() - 0.5)
  }

  ImagesInCards(){
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
    this.cards = Array.from(document.querySelectorAll(".board-game figure"))
    this.cards.forEach(card => card.classList.add("opened"))
    setTimeout(()=>{
      this.closeCards()
    }, 1500)
  }

  closeCards()
  {
    this.cards = Array.from(document.querySelectorAll(".board-game figure"))
    this.cards.forEach(card => card.classList.remove("opened"))
    this.addClickEvents()
    this.canPlay = true
  }

  addClickEvents(){
    this.cards = Array.from(document.querySelectorAll(".board-game figure"))
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

  async size(b,h){
    this.tamano[0] = b
    this.tamano[1] = h
    this.tamano[2] = (b * h)/2
    this.ngOnInit()
    
  }

  turn(j,i){
    let intro = document.getElementById(j+""+i)
    intro.className = "opened"
    
    if (this.count==1){
      this.attempts += 1
      /* for (let tag of intro){
        intro[tag].removeAttribute('src')
      }  */
      return this.count = 0
    }
    this.count += 1
  }
}
