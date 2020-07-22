import { Component, OnInit } from '@angular/core';
import {
  AnimalInterface,
  AnimalsService,
} from 'src/app/services/animals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.page.html',
  styleUrls: ['./animal-details.page.scss'],
})
export class AnimalDetailsPage implements OnInit {
  public animal: AnimalInterface;

  constructor(
    private animalService: AnimalsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const index = this.activeRoute.snapshot.paramMap.get('index');
    this.animal = this.animalService.getAnimal(index);
  }
}
