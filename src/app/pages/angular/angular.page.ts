import { Component, OnInit } from '@angular/core';
import { ɵBrowserDomAdapter } from '@angular/platform-browser';

export interface PersonInterface {
  name: string;
  firstName: string;
  job: string;
  age?: number;
}

@Component({
  selector: 'app-angular',
  templateUrl: './angular.page.html',
  styleUrls: ['./angular.page.scss'],
})
export class AngularPage implements OnInit {
  public name: string = 'Albert';

  public celcius: number = 0;

  public farenheit: number = 0;

  public favoriteColor = 'danger';

  public names: string[] = ['Pauline', 'Sophie', 'Armance'];

  public showCalc: boolean = false;

  public person: PersonInterface = {
    firstName: 'Ada',
    name: 'Lovelace',
    job: 'Mathématicienne',
    age: 33,
  };

  constructor() {}

  ngOnInit() {}

  calcTemp() {
    const ratio: number = 9 / 5;
    this.farenheit = this.celcius * ratio + 32;
  }

  showHideForm() {
    this.showCalc = !this.showCalc;
  }

  addName() {
    this.names.push(this.name);
  }

  deleteName(pos) {
    this.names.splice(pos, 1);
  }
}
