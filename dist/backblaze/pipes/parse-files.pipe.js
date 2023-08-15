"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseFilesPipe = void 0;
class ParseFilesPipe {
    constructor(pipe) {
        this.pipe = pipe;
    }
    async transform(files) {
        for (const file of files) {
            await this.pipe.transform(file);
        }
        return files;
    }
}
exports.ParseFilesPipe = ParseFilesPipe;
//# sourceMappingURL=parse-files.pipe.js.map