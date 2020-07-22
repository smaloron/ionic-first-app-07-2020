import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const STORAGE_KEY = 'notes';

export interface NoteInterface {
  text: string;
  id: number;
  color: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  public notesList: NoteInterface[] = [
    {
      id: 1,
      title: 'Une première note',
      color: 'warning',
      text: 'bla bla bla',
    },
    {
      id: 2,
      title: 'Une deuxième note',
      color: 'secondary',
      text: 'lorem ipsum dolor sit amet',
    },
  ];

  constructor() {}

  public async getNotes() {
    this.notesList = JSON.parse(
      (await Storage.get({ key: STORAGE_KEY })).value
    );

    return this.notesList;
  }

  private addNote(note: NoteInterface) {
    note.id = new Date().getTime();
    this.notesList.push(note);
  }

  public save(note: NoteInterface) {
    if (!note.id) {
      this.addNote(note);
    }

    Storage.set({ key: STORAGE_KEY, value: JSON.stringify(this.notesList) });
  }

  public deleteNote(id: number) {
    const index = this.notesList.findIndex(item => item.id === id);
    this.notesList.splice(index, 1);
    Storage.set({ key: STORAGE_KEY, value: JSON.stringify(this.notesList) });
  }

  public getNoteById(id: number): NoteInterface {
    return this.notesList.find(item => item.id === id);
  }
}
