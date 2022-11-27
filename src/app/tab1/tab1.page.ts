import { Component } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto/produto.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaProdutos: Produto [] = [];

  constructor(private produtoService: ProdutoService) {}

  async buscarProdutos(){
    this.listaProdutos = await this.produtoService.getAll();
  }

  ionViewDidEnter(){
    this.buscarProdutos();
  }

  async excluirProduto(nome: string){
    await this.produtoService.remove(nome);
    this.buscarProdutos();
  }

}
