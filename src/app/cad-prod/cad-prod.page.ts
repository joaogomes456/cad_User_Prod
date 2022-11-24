import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-cad-prod',
  templateUrl: './cad-prod.page.html',
  styleUrls: ['./cad-prod.page.scss'],
})
export class CadProdPage implements OnInit {

  formProd: FormGroup;

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

  constructor(private formBuilder: FormBuilder ,private alertController: AlertController) {
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

  salvarProduto(){
    if(this.formProd.valid){
      this.alertSave();
    }
    else{
      this.alertError();
    }
  }

}
