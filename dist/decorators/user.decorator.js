"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserName = void 0;
const common_1 = require("@nestjs/common");
exports.UserName = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=user.decorator.js.map