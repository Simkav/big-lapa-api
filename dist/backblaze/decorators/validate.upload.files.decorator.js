"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUploadFiels = void 0;
const common_1 = require("@nestjs/common");
const parse_files_pipe_1 = require("../pipes/parse-files.pipe");
const ValidateUploadFiels = (maxSize, fileType) => (0, common_1.UploadedFiles)(new parse_files_pipe_1.ParseFilesPipe(new common_1.ParseFilePipe({
    fileIsRequired: true,
    validators: [
        new common_1.MaxFileSizeValidator({ maxSize }),
        new common_1.FileTypeValidator({
            fileType,
        }),
    ],
})));
exports.ValidateUploadFiels = ValidateUploadFiels;
//# sourceMappingURL=validate.upload.files.decorator.js.map