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

function main() {
    const client = new helloProto.Greeter("localhost:50051",
        grpc.credentials.createInsecure());
    client.sayHello({ name: "you" }, (err, response) => {
        console.log("Greeting:", response.message);
    });
    client.sayHelloAgain({ name: "you" }, (err, response) => {
        console.log("Greeting:", response.message);
    });
}

main();
