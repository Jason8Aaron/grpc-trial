export interface Greeter {
    public sayHello(call: { request: IHelloRequest }, callback: Greeter.SayHelloCallback): void;
    public sayHelloAgain(call: { request: IHelloRequest }, callback: Greeter.SayHelloAgainCallback): void;
}

export interface IHelloRequest {
    name?: (string | null);
}

export interface IHelloReply {
    message?: (string | null);
}

