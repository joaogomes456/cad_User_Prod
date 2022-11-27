import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.usuario = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this.usuario?.set(key, value);
  }

  public get(key: string) {
    this.usuario?.get(key);
  }

  public remove(key: string) {
    this.usuario?.remove(key);
  }

  public getAll() {
    const lista: any[] = [];
    this.usuario?.forEach((value, key, index) => {
      lista.push(value);
    });
    return lista;
  }
}
