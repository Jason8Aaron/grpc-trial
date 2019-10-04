// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const HelloRequest = $root.HelloRequest = (() => {

    /**
     * Properties of a HelloRequest.
     * @exports IHelloRequest
     * @interface IHelloRequest
     * @property {string|null} [name] HelloRequest name
     */

    /**
     * Constructs a new HelloRequest.
     * @exports HelloRequest
     * @classdesc Represents a HelloRequest.
     * @implements IHelloRequest
     * @constructor
     * @param {IHelloRequest=} [properties] Properties to set
     */
    function HelloRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * HelloRequest name.
     * @member {string} name
     * @memberof HelloRequest
     * @instance
     */
    HelloRequest.prototype.name = "";

    /**
     * Creates a new HelloRequest instance using the specified properties.
     * @function create
     * @memberof HelloRequest
     * @static
     * @param {IHelloRequest=} [properties] Properties to set
     * @returns {HelloRequest} HelloRequest instance
     */
    HelloRequest.create = function create(properties) {
        return new HelloRequest(properties);
    };

    /**
     * Encodes the specified HelloRequest message. Does not implicitly {@link HelloRequest.verify|verify} messages.
     * @function encode
     * @memberof HelloRequest
     * @static
     * @param {IHelloRequest} message HelloRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HelloRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        return writer;
    };

    /**
     * Encodes the specified HelloRequest message, length delimited. Does not implicitly {@link HelloRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof HelloRequest
     * @static
     * @param {IHelloRequest} message HelloRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HelloRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a HelloRequest message from the specified reader or buffer.
     * @function decode
     * @memberof HelloRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {HelloRequest} HelloRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HelloRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.HelloRequest();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a HelloRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof HelloRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {HelloRequest} HelloRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HelloRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a HelloRequest message.
     * @function verify
     * @memberof HelloRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    HelloRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        return null;
    };

    /**
     * Creates a HelloRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof HelloRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {HelloRequest} HelloRequest
     */
    HelloRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.HelloRequest)
            return object;
        let message = new $root.HelloRequest();
        if (object.name != null)
            message.name = String(object.name);
        return message;
    };

    /**
     * Creates a plain object from a HelloRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof HelloRequest
     * @static
     * @param {HelloRequest} message HelloRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    HelloRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.name = "";
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        return object;
    };

    /**
     * Converts this HelloRequest to JSON.
     * @function toJSON
     * @memberof HelloRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    HelloRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return HelloRequest;
})();

export const HelloReply = $root.HelloReply = (() => {

    /**
     * Properties of a HelloReply.
     * @exports IHelloReply
     * @interface IHelloReply
     * @property {string|null} [message] HelloReply message
     */

    /**
     * Constructs a new HelloReply.
     * @exports HelloReply
     * @classdesc Represents a HelloReply.
     * @implements IHelloReply
     * @constructor
     * @param {IHelloReply=} [properties] Properties to set
     */
    function HelloReply(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * HelloReply message.
     * @member {string} message
     * @memberof HelloReply
     * @instance
     */
    HelloReply.prototype.message = "";

    /**
     * Creates a new HelloReply instance using the specified properties.
     * @function create
     * @memberof HelloReply
     * @static
     * @param {IHelloReply=} [properties] Properties to set
     * @returns {HelloReply} HelloReply instance
     */
    HelloReply.create = function create(properties) {
        return new HelloReply(properties);
    };

    /**
     * Encodes the specified HelloReply message. Does not implicitly {@link HelloReply.verify|verify} messages.
     * @function encode
     * @memberof HelloReply
     * @static
     * @param {IHelloReply} message HelloReply message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HelloReply.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.message != null && message.hasOwnProperty("message"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
        return writer;
    };

    /**
     * Encodes the specified HelloReply message, length delimited. Does not implicitly {@link HelloReply.verify|verify} messages.
     * @function encodeDelimited
     * @memberof HelloReply
     * @static
     * @param {IHelloReply} message HelloReply message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HelloReply.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a HelloReply message from the specified reader or buffer.
     * @function decode
     * @memberof HelloReply
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {HelloReply} HelloReply
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HelloReply.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.HelloReply();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.message = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a HelloReply message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof HelloReply
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {HelloReply} HelloReply
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HelloReply.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a HelloReply message.
     * @function verify
     * @memberof HelloReply
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    HelloReply.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        return null;
    };

    /**
     * Creates a HelloReply message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof HelloReply
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {HelloReply} HelloReply
     */
    HelloReply.fromObject = function fromObject(object) {
        if (object instanceof $root.HelloReply)
            return object;
        let message = new $root.HelloReply();
        if (object.message != null)
            message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from a HelloReply message. Also converts values to other types if specified.
     * @function toObject
     * @memberof HelloReply
     * @static
     * @param {HelloReply} message HelloReply
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    HelloReply.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.message = "";
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this HelloReply to JSON.
     * @function toJSON
     * @memberof HelloReply
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    HelloReply.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return HelloReply;
})();