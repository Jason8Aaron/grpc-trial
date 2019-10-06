import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";

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
    const helloClient = new helloProto.Greeter("localhost:50051", grpc.credentials.createInsecure());

    const GoodClient = new goodProto.Good("localhost:50051", grpc.credentials.createInsecure());

    // helloClient.sayHelloAgain({ name: "1111111111" }, (err, response) => {
    //     console.log("1111111111" + "Greeting:", response.message);
    // });
    // process.nextTick(() => {
    //     helloClient.sayHelloAgain({ name: "2222222222" }, (err, response) => {
    //         console.log("2222222222" + " setGoods:", JSON.stringify(response));
    //     });
    // });

    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            // helloClient.sayHelloAgain({ name: i }, (err, response) => {
            //     console.log(i + "Greeting:", response.message);
            // });

            GoodClient.setGoods({ name: i }, (err, response) => {
                console.log(i + " setGoods:", JSON.stringify(response));
            });
        }
    }, 0);
}

main();
