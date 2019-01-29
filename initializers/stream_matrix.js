'use strict';
const ActionHero = require('actionhero');
var Module = require("../../napi-emscripten/test/StreamMatrix/napi/index.js");
var StreamMatrix = Module.StreamMatrix;

async function sleep(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, timeout);
    });
}

module.exports = class MyInitializer extends ActionHero.Initializer {
    constructor() {
        super();
        this.name = 'stream_matrix';
        this.loadPriority = 1000;
        this.startPriority = 1000;
        this.stopPriority = 1000;
    }

    async initialize() {
        console.log("----------stream_matrix initialize");
        ActionHero.api.Module = Module;
        ActionHero.api.stream_matrix = {};
    }

    async start() {
        console.log("----------stream_matrix start");
        ActionHero.api.stream_matrix.instance = new StreamMatrix();
        await ActionHero.api.stream_matrix.instance.initialize();
        await ActionHero.api.stream_matrix.instance.set_notification();
    }
    async stop() {
        console.log("----------stream_matrix stop");
        await ActionHero.api.stream_matrix.instance.terminate();
        ActionHero.api.stream_matrix.instance = null;
        await sleep(1);
    }
};
