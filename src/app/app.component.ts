import { Component } from '@angular/core';
import { CARDS } from '../data/cards';


const comboCorner = [[0, 4, 20], [0, 4, 24]];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-fundamentals';
  numbersCalled = [0];

  listOfCards = [];
  numberCalled: number;

  constructor() {
    this.createCard();
  }

  createCard() {
    let createdCards = [];
    CARDS.map(card => {
      let cardRowNumbers = [];
      let row = [];
      card.map((c) => {
        let numberValue = {};
        numberValue['value'] = c;
        numberValue['isActive'] = false;
        if(this.numbersCalled.includes(c)){
          numberValue['isActive'] = true;
        }
        row.push(numberValue);
        if (row.length == 5) {
          cardRowNumbers.push(row);
          row = [];
        }
      });
      createdCards.push(cardRowNumbers);
    });
    this.listOfCards = createdCards;
  }

  callNumber(n: number) {
    if(this.numberCalled){
      this.numbersCalled.push(this.numberCalled);
      this.numberCalled = null;
    }
    this.createCard();
    
    //this.checkBingo();
  }

  checkBingo() {
    //var tantos = this.checkTantos();
    //this.checkCorner(tantos);
  }

  checkTantos() {
    // var filtered = card.filter(c => this.numbersCalled.includes(c)); //numbers called on your card
    // var tantos = []; //index of the numbers called on your card
    // filtered.map(f => {
    //   var i = card.findIndex(c => c == f);
    //   if (i != -1) {
    //     tantos.push(i);
    //   }
    // });
    // return tantos;
  };

  checkCorner(val) {
    comboCorner.map(cc => {
      var intersect = val.every(c => cc.indexOf(c) !== -1);
      if (intersect) {
        console.log('bingo');
      }
    });
  }

  clear() {
    this.numbersCalled = [];
    this.createCard();
  }
}
