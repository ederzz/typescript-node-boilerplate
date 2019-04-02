"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
async function syncDb() {
    await schema_1.Student.sync({
        force: true
    });
}
exports.syncDb = syncDb;
syncDb();
