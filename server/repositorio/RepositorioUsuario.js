const Usuario = require('../schemas/Usuario');

class RepositorioUsuario{

  constructor(){
    this.usuarios = [];
  }

  cadastrar(usuario){

    let novoUsuario = new Usuario(usuario);
    this.usuarios.push(novoUsuario);
  }

  listar(){

    return this.usuarios;
  }

  remover(cpf){

    let index = this.usuarios.find(usuario => usuario.cpf === cpf);
    if(index !== -1){
      this.usuarios.splice(index, 1);
    }
    else{
      throw new Error('CPF não encontrado');
    }
  }

  buscarCpf(cpf){
    
    let usuarioEncontrado = this.usuarios.find(usuario => usuario.cpf === cpf);
    return usuarioEncontrado;
  }

  atualizar(usuario){
    
    let usuarioAtual = this.buscarCpf(usuario.cpf);
    if(usuarioAtual){
      usuarioAtual = usuario;
    }
    else{
      throw new Error('Usuário não encontrado');
    }
  }
}

const repositorio = new RepositorioUsuario();

module.exports = repositorio;