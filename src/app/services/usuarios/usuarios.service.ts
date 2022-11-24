import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.usuarios = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this.usuarios?.set(key, value);
  }

  public get(key: string) {
    this.usuarios?.get(key);
  }

  public remove(key: string) {
    this.usuarios?.remove(key);
  }

  public getAllUsers() {
    const lista: any[] = [];
    this.usuarios?.forEach((value, key, index) => {
      lista.push(value);
    });
    return lista;
  }
}
