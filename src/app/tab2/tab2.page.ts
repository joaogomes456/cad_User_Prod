import { Usuario } from './../models/usuario';
import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  listaUsuarios: Usuario [] = [];

  constructor(private usuarioService: UsuarioService) {}

  async buscarUsuarios(){
    this.listaUsuarios = await this.usuarioService.getAll();
  }

  ionViewDidEnter(){
    this.buscarUsuarios();
  }

  async excluirCadastro(email: string){
    await this.usuarioService.remove(email);
    this.buscarUsuarios();
  }

}
