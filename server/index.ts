import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";

const packageDefinition = protoLoader.loadSync(
    path.resolve("protos/hello.proto"),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld as any;

function sayHello(call, callback) {
    callback(null, { message: "Hello " + call.request.name });
}

function sayHelloAgain(call, callback) {
    callback(null, { message: "Hello again, " + call.request.name });
}

function main() {
    const server = new grpc.Server();
    server.addService(helloProto.Greeter.service,
        { sayHello, sayHelloAgain });
    server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
