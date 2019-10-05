export interface Greeter {
    sayHello(call: { request: HelloRequest }, callback: (e: Error, response: HelloReply) => void): void;
    sayHelloAgain(call: { request: HelloRequest }, callback: (e: Error, response: HelloReply) => void): void;
}

export interface HelloRequest {
    name?: string;
}

export interface HelloReply {
    message?: string;
}

