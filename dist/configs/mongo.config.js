"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConfig = void 0;
const getMongoConfig = async (configService) => {
    const mongoURL = configService.get('MONGO_URL');
    return Object.assign({ uri: mongoURL }, getMongoOptions());
};
exports.getMongoConfig = getMongoConfig;
const getMongoOptions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//# sourceMappingURL=mongo.config.js.map