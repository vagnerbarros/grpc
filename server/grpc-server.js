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

    cadUsuario.cadastrar(call.request);
    let usuariosCadastrados = cadUsuario.listar();
    callback(null, {
      status: 200,
      message: `${usuariosCadastrados.length} usuários cadastrados`
    });
  }
  catch(err){
    callback(null, {
      status: 500,
      message: err.toString()
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