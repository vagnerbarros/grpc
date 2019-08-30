const repositorio = require('../repositorio/RepositorioUsuario');

class CadastroUsuario{

  cadastrar(usuario){
    
    try{

      let existeCpf = repositorio.buscarCpf(usuario.cpf);
      if(!existeCpf){
        return repositorio.cadastrar(usuario);
      }
      else{
        throw new Error('CPF já cadastrado');
      }
    }
    catch(err){
      throw err;
    }
  }

  listar(){
    
    try{
      return repositorio.listar();
    }
    catch(err){
      throw err;
    }
  }
}

const cadastro = new CadastroUsuario();

module.exports = cadastro;