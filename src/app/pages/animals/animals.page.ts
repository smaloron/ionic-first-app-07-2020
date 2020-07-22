import { Component, OnInit } from '@angular/core';
import {
  AnimalsService,
  AnimalInterface,
} from 'src/app/services/animals.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit {
  public animalList: AnimalInterface[];
  public started = false;

  private currentAnimalIndex: number = null;

  private media: HTMLAudioElement = null;

  public tries: number = 0;

  public reorderDisabled = true;

  public cheatMode = false;

  constructor(
    public animalService: AnimalsService,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.animalList = this.animalService.getData();
  }

  play() {
    this.started = true;

    // arrêt du son avant d'en jouer un autre
    if (this.media && !this.media.ended) {
      this.media.pause();
    }

    // Sélection d'un animal au hasard
    // si aucun animal n'a été préalablement sélectionné
    // ou si on commence un nouveau jeu
    if (this.currentAnimalIndex === null) {
      this.currentAnimalIndex = Math.floor(
        Math.random() * this.animalList.length
      );
    }

    // Récupération de l'animal sélectionné
    const animal = this.animalList[this.currentAnimalIndex];

    // Lecture du son
    this.media = new Audio('/assets' + animal.file);
    this.media.load();
    this.media.play();
    animal.playing = true;

    // Masquage de la note de musique à la fin du son
    this.media.ontimeupdate = () => {
      if (this.media.ended) {
        animal.playing = false;
      }
    };
  }

  guess(index) {
    let message = '';
    let success = false;
    this.tries++;
    if (this.currentAnimalIndex === index) {
      message = `Bravo ${this.cheatMode ? 'tricheur' : ''} tu as gagné en ${
        this.tries
      } coup(s)`;
      success = true;
      // Arrêt du son
      this.media.pause();
    } else {
      message = 'Essaie encore';
      // Stocker le nom de l'animal à trouver
      const animalName = this.animalList[this.currentAnimalIndex].title;
      // Suppression d'un animal dans le tableau
      this.animalList.splice(index, 1);
      this.currentAnimalIndex = this.animalList.findIndex(item => {
        return item.title === animalName;
      });

      console.log(this.currentAnimalIndex);
    }

    this.showResult(message, success);
  }

  private reset() {
    // Rejouer une partie
    this.started = false;
    this.currentAnimalIndex = null;
    this.tries = 0;
    this.cheatMode = false;
    this.reorderDisabled = true;
    this.animalList = this.animalService.getData();
  }

  async showResult(message, success) {
    const myToast = await this.toast.create({
      message,
      duration: 1500,
      position: 'middle',
    });

    myToast.present();

    // Réinitialisation du jeu à la disparition du toast
    // uniquement si on a gagné
    if (success) {
      myToast.onDidDismiss().then(() => this.reset());
    }
  }

  reorderAnimal(event) {
    event.detail.complete();
  }
}
