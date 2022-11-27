import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produto: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.produto = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this.produto?.set(key, value);
  }

  public get(key: string) {
    this.produto?.get(key);
  }

  public remove(key: string) {
    this.produto?.remove(key);
  }

  public getAll() {
    const lista: any[] = [];
    this.produto?.forEach((value, key, index) => {
      lista.push(value);
    });
    return lista;
  }
}
