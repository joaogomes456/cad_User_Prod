import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private produtos: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.produtos = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this.produtos?.set(key, value);
  }

  public get(key: string) {
    this.produtos?.get(key);
  }

  public remove(key: string) {
    this.produtos?.remove(key);
  }

  public getAll() {
    const lista: any[] = [];
    this.produtos?.forEach((value, key, index) => {
      lista.push(value);
    });
    return lista;
  }
}
