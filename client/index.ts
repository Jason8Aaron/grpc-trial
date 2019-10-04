import * as grpc from "grpc"
import * as protoLoader from '@grpc/proto-loader';
import * as path from "path";

var packageDefinition = protoLoader.loadSync(
    path.resolve("protos/hello.proto"),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
    var client = new helloProto.Greeter('localhost:50051',
        grpc.credentials.createInsecure());
    client.sayHello({ name: 'you' }, function (err, response) {
        console.log('Greeting:', response.message);
    });
    client.sayHelloAgain({ name: 'you' }, function (err, response) {
        console.log('Greeting:', response.message);
    });
}

main()