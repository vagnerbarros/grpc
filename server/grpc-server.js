const PROTO_PATH = __dirname + '/../protos/cadastro.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const cadUsuario = require('./model/CadastroUsuario');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const cadastro_proto = grpc.loadPackageDefinition(packageDefinition).cadastro;

function cadastrarUsuario(call, callback) {
  
  try{

    let usuarioCadastrado = cadUsuario.cadastrar(call.request.usuario);
    callback(null, {
      status: 200,
      message: 'Usuário Cadastrado com Sucesso',
      usuario: usuarioCadastrado
    });
  }
  catch(err){
    callback(null, {
      status: 500,
      message: err.message,
      usuario: undefined
    });
  }
  
}

function main() {
  const server = new grpc.Server();
  server.addService(cadastro_proto.Cadastro.service, { cadastrarUsuario: cadastrarUsuario });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();