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

function genServiceInterface(name: string, service: ServiceDefinition) {

    const serverSideTemplate = `
export abstract class ${name.split(".").pop()} {
    ${Object.values(service).map((item) => genMethodInterface(item).serverSideTemplate).join("\n    ")}
}`;

    const clientSideTemplate = `
export class ${name.split(".").pop()}Client {
    constructor(private client){}
    ${Object.values(service).map((item) => genMethodInterface(item).clientSideTemplate).join("\n    ")}
}`;
    return [serverSideTemplate, clientSideTemplate].join("\n");
}

function genMessageTypeInterface(type: MessageTypeDetail, isExport = true) {

    const enumTemplates = type.enumType.map((enumTypeItem) => {
        return genEnumTypeInterface(enumTypeItem, false);
    }).join("\n");

    const messageTemplates = type.nestedType.map((messageTypeItem) => {
        return genMessageTypeInterface(messageTypeItem, false);
    }).join("\n");

    const template = `
${isExport ? "export " : ""}interface ${type.name} {
    ${
        type.field.map((item) => {
            if (item.label === LabelMap.repeated) {
                return `${item.name}: ${item.typeName ? item.typeName : TypeMap[item.type]}[];`;
            } else {
                return `${item.name}${item.label === LabelMap.optional ? "?" : ""}: ${item.typeName ? item.typeName : TypeMap[item.type]};`;
            }
        }).join("\n    ")
        }
}`;

    const templates = [enumTemplates, messageTemplates, template];
    return templates.join("\n    ");
}

function genEnumTypeInterface(type: EnumTypeDetail, isExport = true) {

    const template = `
${isExport ? "export " : ""}enum ${type.name} {
    ${type.value.map((item) => `${item.name} = ${item.number},`).join("\n    ")}
}`;

    return template;
}

function genMethodInterface<T, S>(method: MethodDefinition<T, S>) {

    const methodName = method.originalName ? method.originalName : method.path.split("/").pop();
    const requestType = (method.requestType.type as MessageTypeDetail).name;
    const resposeType = (method.responseType.type as MessageTypeDetail).name;

    const serverSideTemplate = `
    ${methodName}(call: { request: ${requestType} }, callback: (e: Error, response?: ${resposeType}) => void): void {
        this.${methodName}Sync(call)
            .then((response) => {
                callback(null, response);
            })
            .catch((e) => {
                callback(e);
            });
    }

    protected abstract ${methodName}Sync(call: { request: ${requestType} }): Promise<${resposeType}>;`;

    const clientSideTemplate = `
    ${methodName}(request: ${requestType}): Promise<${resposeType}> {
        return new Promise((resolve,reject)=>{
            this.client.${methodName}(request, (e, response) => {
                if(e){return reject(e)}
                resolve(response)
            })
        })
    }`;

    return { serverSideTemplate, clientSideTemplate };
}

export default function GenProtoInterfaces(filePath) {
    const packageDefinition = protoLoader.loadSync(path.resolve(filePath),
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

    const interfaces = Object.keys(packageDefinition).map((key) => {
        const item = packageDefinition[key];
        if (item.format && item.format === MessageOrEnumFormat.Message) {
            // message
            return genMessageTypeInterface(item.type as MessageTypeDetail);
        } else if (item.format && item.format === MessageOrEnumFormat.Enum) {
            // enum
            return genEnumTypeInterface(item.type as EnumTypeDetail);
        } else {
            // Service
            return genServiceInterface(key, item as ServiceDefinition);
        }
    });

    return interfaces.join("\n");
}
