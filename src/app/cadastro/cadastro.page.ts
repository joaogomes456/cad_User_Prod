import { CpfValidator } from './../validators/cpf-validator';
import { comparaValidator } from './../validators/compara-validator';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formUser: FormGroup;

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres.' }
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório.' },
      { tipo: 'invalido', mensagem: 'CPF Inválido.' }
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' }
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.', }
    ],
    confSenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.', },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha.' }
    ],
  };

  constructor(private formBuilder: FormBuilder ,private alertController: AlertController) {
    this.formUser = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.validate])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confSenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
     validator: comparaValidator('senha', 'confSenha')
    });
  }

  async alertSave() {
    const alert = await this.alertController.create({
      mode:'ios',
      cssClass:'alerta',
      message: 'Cadastro realizado. Agora volte para a tela de Login',
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

  salvarUsuario(){
    if(this.formUser.valid){
      this.alertSave();
    }
    else{
      this.alertError();
    }
  }

}
