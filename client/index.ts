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

async function main() {
    const helloClient = new GreeterClient(new helloProto.Greeter("localhost:50051", grpc.credentials.createInsecure()));

    const goodClient = new GoodClient(new goodProto.Good("localhost:50051", grpc.credentials.createInsecure()));

    for (let i = 0; i < 1000; i++) {
        const sayHelloResponse = await helloClient.sayHello({ name: i + "" });
        console.log("sayHelloResponse.message: " + sayHelloResponse.message);
    }

    const setGoodsResponse = await goodClient.setGoods({ name: "Promise" });
    console.log(setGoodsResponse.success);

    const getGoodsResponse = await goodClient.getGoods({ from: 30, size: 2 });
    console.log(getGoodsResponse.count, getGoodsResponse.goods);
}

main();
