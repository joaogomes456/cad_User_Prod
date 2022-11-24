import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController, private formBuilder: FormBuilder) { }

  formLogin = this.formBuilder.group({
    email:['', Validators.compose([Validators.required, Validators.email])],
    senha:['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  async esqSenha() {
    const alert = await this.alertController.create({
      mode:'ios',
      cssClass:'alerta',
      header: 'Insira o email para redefinir a senha',
      message: '<ion-item><ion-label>Email:</ion-label><ion-input></ion-input></ion-item>',
      buttons: ['Confirmar'],
    });

    await alert.present();
  }


  ngOnInit() {
  }

}
