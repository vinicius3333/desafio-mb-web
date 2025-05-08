import { join } from 'path';
import { __dirname } from "../utils/get-dirname.js"

function execute() {
    return join(__dirname, "../../../mb-vue/dist/index.html")
}

export default {
    execute
}