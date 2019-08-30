const PROTO_PATH = __dirname + '/../protos/cadastro.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
const cadastro_proto = grpc.loadPackageDefinition(packageDefinition).cadastro;

function main() {
  
  let client = new cadastro_proto.Cadastro('localhost:50051', grpc.credentials.createInsecure());

  let usuario = {
    cpf: '1223332323',
    nome: 'Vagner',
    cep: '55024130',
    rua: 'teste',
    bairro: 'bairro',
    cidade: 'caruaru',
    estado: 'PE'
  }
  client.cadastrarUsuario(usuario, function(err, response) {
    console.log('Resultado:', response.message);
  });
}

main();
