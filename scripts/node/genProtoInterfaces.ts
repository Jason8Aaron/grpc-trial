import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import { ServiceDefinition, MethodDefinition } from "@grpc/proto-loader";

import * as path from "path";

const TypeMap = {
    TYPE_DOUBLE: "number",
    TYPE_FLOAT: "number",
    TYPE_INT64: "number",
    TYPE_UINT64: "number",
    TYPE_INT32: "number",
    TYPE_FIXED64: "number",
    TYPE_FIXED32: "number",
    TYPE_BOOL: "boolean",
    TYPE_STRING: "string",
    TYPE_GROUP: "", //
    TYPE_MESSAGE: "", //
    TYPE_BYTES: "", //
    TYPE_UINT32: "number",
    TYPE_ENUM: "", //
    TYPE_SFIXED32: "number",
    TYPE_SFIXED64: "number",
    TYPE_SINT32: "number",
    TYPE_SINT64: "number",
};

enum LabelMap {
    optional = "LABEL_OPTIONAL",
    required = "LABEL_REQUIRED",
    repeated = "LABEL_REPEATED",
}
/**
 * Method and Enum
 */
// format
enum MessageOrEnumFormat {
    Message = "Protocol Buffer 3 DescriptorProto",
    Enum = "Protocol Buffer 3 EnumDescriptorProto",
}

interface MessageTypeDetail {
    field: MessageTypeDetailFieldItem[];
    name: string;
    enumType: EnumTypeDetail[];
    extension: any[]; //
    extensionRange: any[]; //
    nestedType: MessageTypeDetail[];
    oneofDecl: any[]; //
    options: any; //
    reservedName: any[]; //
    reservedRange: any[]; //
}

interface MessageTypeDetailFieldItem {
    defaultValue: string | number | boolean;
    label: string;
    name: string;
    type: string;
    typeName: string;
}

interface EnumTypeDetail {
    name: string;
    options: any;
    value: EnumTypeDetailValueItem[];
}

interface EnumTypeDetailValueItem {
    name: string;
    number: number;
    options: any;
}

const packageDefinition = protoLoader.loadSync(
    path.resolve("protos/services/hello.proto"),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

Object.keys(packageDefinition).forEach((key) => {
    const item = packageDefinition[key];
    if (item.format && item.format === MessageOrEnumFormat.Message) {
        // message
        genMessageTypeInterface(item.type as MessageTypeDetail);
    } else if (item.format && item.format === MessageOrEnumFormat.Enum) {
        // enum
        genEnumTypeInterface(item.type as EnumTypeDetail);
    } else {
        // Service
        genServiceInterface(key, item as ServiceDefinition);
    }
});

function genServiceInterface(name: string, service: ServiceDefinition) {

    const template = `
    export interface ${name.split(".").pop()} {
        ${
        Object.values(service).map((item) => {
            return genMethodInterface(item);
        })
        }
    }`;
    console.log(template);
}

function genMessageTypeInterface(type: MessageTypeDetail, isExport = true) {

    type.enumType.forEach((enumTypeItem) => {
        genEnumTypeInterface(enumTypeItem, false);
    });

    type.nestedType.forEach((messageTypeItem) => {
        genMessageTypeInterface(messageTypeItem, false);
    });

    const template = `
    ${isExport ? "export " : ""}interface ${type.name} {
        ${
        type.field.map((item) => {
            if (item.label === LabelMap.repeated) {
                return `${item.name}: ${item.typeName ? item.typeName : TypeMap[item.type]}[];`;
            } else {
                return `${item.name}${item.label === LabelMap.optional ? "?" : ""}: ${item.typeName ? item.typeName : TypeMap[item.type]};`;
            }
        }).join("\n\t")
        }
    }`;
    console.log(template);
}

function genEnumTypeInterface(type: EnumTypeDetail, isExport = true) {
    const template = `
    ${isExport ? "export " : ""}enum ${type.name} {
        ${
        type.value.map((item) => {
            return `${item.name} = ${item.number},`;
        }).join("\n\t")
        }
    }`;
    console.log(template);
}

function genMethodInterface<T, S>(method: MethodDefinition<T, S>) {
    const methodName = method.path.split("/").pop();
    const template =
        `${methodName}(call: { request: ${(method.requestType.type as MessageTypeDetail).name} }, ` +
        `callback: (e: Error, response: ${(method.responseType.type as MessageTypeDetail).name}) => void): void;`;
    return template;
}
