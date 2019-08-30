const Usuario = require('../schemas/Usuario');

class RepositorioUsuario{

  constructor(){
    this.usuarios = [];
  }

  cadastrar(usuario){

    let novoUsuario = new Usuario(usuario);
    novoUsuario.id = this.usuarios.length + 1;
    this.usuarios.push(novoUsuario);
    return novoUsuario;
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
      let error = new Error('CPF não encontrado');
      error.code = 400;
      throw error;
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
      let error = new Error('Usuário não encontrado');
      error.code = 400;
      throw error;
    }
  }
}

const repositorio = new RepositorioUsuario();

module.exports = repositorio;