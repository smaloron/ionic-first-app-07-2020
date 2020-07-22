import { Injectable } from '@angular/core';
import { PRIMARY_OUTLET } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public preferedColor: string = 'success';

  constructor() {}
}
