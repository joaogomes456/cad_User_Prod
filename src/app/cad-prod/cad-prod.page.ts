import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto/produto.service';

@Component({
  selector: 'app-cad-prod',
  templateUrl: './cad-prod.page.html',
  styleUrls: ['./cad-prod.page.scss'],
})
export class CadProdPage implements OnInit {

  formProd: FormGroup;

  produto: Produto = new Produto();

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres.' }
    ],
    descricao: [
      { tipo: 'required', mensagem: 'O campo Descrição é obrigatório.' }
    ],
    validade: [
      { tipo: 'required', mensagem: 'O campo Validade é obrigatório.' }
    ],
    preco: [
      { tipo: 'required', mensagem: 'O campo Preço é obrigatório.' }
    ]
  };

  constructor(private formBuilder: FormBuilder ,private alertController: AlertController, private produtoService: ProdutoService, private route: Router) {
    this.formProd = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      descricao: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      validade: ['', Validators.required],
      preco: ['', Validators.required]
    });
  }

  async alertSave() {
    const alert = await this.alertController.create({
      mode:'ios',
      cssClass:'alerta',
      message: 'Cadastro realizado com sucesso.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      mode:'ios',
      cssClass:'alerta',
      message: 'Cadastro não realizado, verifique as informações.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
  }

  async salvarProduto(){
    if(this.formProd.valid){
      this.produto.nome = this.formProd.value.nome;
      this.produto.descricao = this.formProd.value.descricao;
      this.produto.validade = this.formProd.value.validade;
      this.produto.preco = this.formProd.value.preco;
      await this.produtoService.set(this.produto.nome, this.produto);
      this.route.navigateByUrl('/tabs');
      this.alertSave();
    }
    else{
      this.alertError();
    }
  }

}
