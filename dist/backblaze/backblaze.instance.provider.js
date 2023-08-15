"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backBlazeFactory = void 0;
const backblaze_b2_1 = __importDefault(require("backblaze-b2"));
const backBlazeFactory = async (configService) => {
    const client = new backblaze_b2_1.default({
        applicationKeyId: configService.get('BB2_SECRET_KEY_NAME'),
        applicationKey: configService.get('BB2_SECRET_KEY'),
    });
    await client.authorize();
    return client;
};
exports.backBlazeFactory = backBlazeFactory;
//# sourceMappingURL=backblaze.instance.provider.js.map