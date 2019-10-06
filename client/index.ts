import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { GreeterClient } from "../protosTs/services/hello";
import { GoodClient } from "../protosTs/services/good";

const packageDefinition = protoLoader.loadSync(
    [path.resolve("protos/services/hello.proto"),
    path.resolve("protos/services/good.proto")],
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

const obj = grpc.loadPackageDefinition(packageDefinition);
const helloProto = obj.helloworld as any;
const goodProto = obj.good as any;

function main() {
    const helloClient = new helloProto.Greeter("localhost:50051", grpc.credentials.createInsecure()) as GreeterClient;

    const GoodClient = new goodProto.Good("localhost:50051", grpc.credentials.createInsecure()) as GoodClient;

    helloClient.sayHello({ name: "test" }, (e, response) => {
        if (e) {
            console.error(e);
            return;
        }
        console.log(response.message);
    });

    GoodClient.setGoods({ name: Math.random() + "" }, (e, response) => {
        if (e) {
            console.error(e);
            return;
        }
        console.log(response.success);
    });

    GoodClient.getGoods({ from: 0, size: 10 }, (e, response) => {
        if (e) {
            console.error(e);
            return;
        }
        console.log(response.goods);
        console.log(response.count);
    });

}

main();
