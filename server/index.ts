import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { Greeter, IHelloRequest } from "./interfaces/hello";

const packageDefinition = protoLoader.loadSync(
    path.resolve("protos/services/hello.proto"),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld as any;

class GreeterClass implements Greeter {

    public sayHelloAgain(call: { request: IHelloRequest }, callback: any): void {
        callback(null, { message: call.request.name });
    }

    public sayHello(call: { request: IHelloRequest }, callback: any): void {
        callback(null, { message: call.request.name });
    }

}

function main() {
    const server = new grpc.Server();
    server.addService(helloProto.Greeter.service,
        new GreeterClass());
    server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
