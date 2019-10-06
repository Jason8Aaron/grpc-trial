import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { Greeter, HelloRequest, HelloReply } from "../protosTs/services/hello";
import { Good, GetGoodsRequest, SetGoodsRequest, GetGoodsReply, SetGoodsReply } from "../protosTs/services/good";

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

const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld as any;
const goodProto = grpc.loadPackageDefinition(packageDefinition).good as any;

class GreeterService extends Greeter {

    protected async sayHelloAgainSync(call: { request: HelloRequest; }): Promise<HelloReply> {
        console.log("sayHelloAgainSync: " + call.request.name);
        return { message: call.request.name };
    }

    protected async sayHelloSync(call: { request: HelloRequest; }): Promise<HelloReply> {
        console.log("sayHelloSync: " + call.request.name);
        return { message: call.request.name };
    }
}

const goods = [];

class GoodService extends Good {

    protected async getGoodsSync(call: { request: GetGoodsRequest; }): Promise<GetGoodsReply> {

        let { from, size } = call.request;

        if (!from) { from = 0; }

        if (!size) { size = 10; }

        return { goods: goods.slice(from, from + size), count: goods.length };
    }

    protected async setGoodsSync(call: { request: SetGoodsRequest; }): Promise<SetGoodsReply> {

        if (!call.request.name) {
            throw new Error("Invalid good's name");
        }
        goods.push({ name: call.request.name, index: goods.length });

        console.log("setGoodsSync: " + call.request.name);
        return { success: +call.request.name };
    }

}

function main() {

    const server = new grpc.Server();
    server.addService(helloProto.Greeter.service,
        new GreeterService());
    server.addService(goodProto.Good.service,
        new GoodService());
    server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
