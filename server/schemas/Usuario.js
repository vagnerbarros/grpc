
class Usuario{

  constructor(usuario){
    this.cpf = usuario.cpf;
    this.nome = usuario.nome;
    this.cep = usuario.cep;
    this.rua = usuario.rua;
    this.bairro = usuario.bairro;
    this.cidade = usuario.cidade;
    this.estado = usuario.estado;
  }

  
}

module.exports = Usuario;