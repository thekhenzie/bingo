import { Component } from '@angular/core';
import { KHENCARDS, HAARTCARDS } from '../data/cards';
import { COMBOS } from '../data/combo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-fundamentals';
  numbersCalled = [0];

  listOfCards = [];
  listOfBingoCards = [];
  numberCalled: number;
  selectedPlayer = 'Khen';
  selectedCard = [];
  isBingo = false;
  bingoMessage= "";
  showAllCards = false;
  constructor() {
    this.selectPlayerAndCard();
    this.createCard();
  }

  selectPlayerAndCard() {
    switch (this.selectedPlayer) {
      case 'Khen':
        this.selectedCard = KHENCARDS;
        break;
      case 'Kamille':
        this.selectedCard = HAARTCARDS;
        break;
      default:
        this.selectedCard = KHENCARDS;
        break;
    }
  }

  createCard() {
    let createdCards = [];
    this.selectedCard.map(card => {
      let cardRowNumbers = [];
      let row = [];
      card.map((c) => {
        let numberValue = {};
        numberValue['value'] = c;
        numberValue['isActive'] = false;
        if (this.numbersCalled.includes(c)) {
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

    this.checkBingo();
  }

  callNumber() {
    if (this.numberCalled) {
      this.numbersCalled.push(this.numberCalled);
      this.numberCalled = null;
    }
    this.createCard();
  }

  clickNumber(value: number) {
    if (value != 0) {
      let isExisting = this.numbersCalled.some(num => num == value);

      if (isExisting) {
        this.numbersCalled = this.numbersCalled.filter(num => num != value);
      } else {
        this.numbersCalled.push(value);
      }
    }
    this.createCard();
  }

  checkBingo() {
    var tantos = this.checkTantos();
    this.checkCombo(tantos);
  }

  checkTantos() {
    var filtered = []; //numbers called on your card [[]]
    this.selectedCard.map(card => {
      filtered.push(card.filter(c => this.numbersCalled.includes(c)));
    });
    console.log(filtered);

    var tantos = []; //index of the numbers called on your card

    filtered.map((filter, ind) => {
      var tan = [];
      filter.map(f => {
        var i = this.selectedCard[ind].findIndex(c => c == f);
        if (i != -1) {
          tan.push(i);
        }
      });
      tantos.push(tan);
    });

    return tantos;
  };

  checkCombo(val: number[][]) {
    let cardNumbers = [];
    COMBOS.map(cc => {
      val.map((v, ind) => {
        var intersect = cc.every(c => v.indexOf(c) !== -1)
        if (intersect) {
          let card = {
            name: (ind + 1 <= 20) ? 'Khen' : 'Haart',
            cardNumber: (ind + 1 <= 20) ? (ind + 1) : (ind - 19),  
            winningNum: v,
            trueCardNumber: ind
          };
          cardNumbers.push(card);
          this.isBingo = true;
        }
      });
    });

    if(this.isBingo){
      this.bingoMessage = "";
      cardNumbers.map(cn => {
        this.bingoMessage += `${cn.name}: Card #${cn.cardNumber}\n`;
        this.listOfBingoCards.push(this.listOfCards[cn.trueCardNumber]);
      });
      alert(this.bingoMessage)
    }
  }

  clear() {
    this.numbersCalled = [0];
    this.isBingo = false;
    this.bingoMessage = "";
    this.listOfBingoCards = [];
    this.createCard();
  }

  deleteLast() {
    if (this.numbersCalled.length != 1) {
      this.numbersCalled.pop();
      this.isBingo = false;
      this.bingoMessage = "";
      this.listOfBingoCards = [];
      this.createCard();
    }
  }

  showCards(){
    this.showAllCards = !this.showAllCards;
  }
}