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

function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
}

function sayHelloAgain(call, callback) {
    callback(null, { message: 'Hello again, ' + call.request.name });
}

function main() {
    var server = new grpc.Server();
    server.addService(helloProto.Greeter.service,
        { sayHello: sayHello, sayHelloAgain: sayHelloAgain });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main()