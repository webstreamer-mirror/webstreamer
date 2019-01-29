'use strict';
const ActionHero = require('actionhero');


module.exports = class MyInitializer extends ActionHero.Initializer {
    constructor() {
        super();
        this.name = 'test';
        this.loadPriority = 1001;
        this.startPriority = 1001;
        this.stopPriority = 999;
        this.test_servers = {};
        this.stream_matrix = null;

    }

    async initialize() {
        console.log("----------rtsp_test_server initialize");
        ActionHero.api.test = {};
        var Module = ActionHero.api.Module;

        let self = this;
        ActionHero.api.test.create_rtsp_test_server = async (id, port, path, video_codec, audio_codec) => {
            if (self.test_servers[`${id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`rtsp test server ${id} has been added!`, 'error');
                    reject(`rtsp test server ${id} has been added!`);
                });
            }
            let rtsp_test_server = new Module.RtspTestServer(self.stream_matrix, id, port, path, {
                video: video_codec,
                audio: audio_codec
            });
            await rtsp_test_server.initialize();
            await rtsp_test_server.startup();
            self.test_servers[`${id}`] = rtsp_test_server;
        };

        ActionHero.api.test.destroy_rtsp_test_server = async (id) => {
            if (!self.test_servers[`${id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`rtsp test server ${id} hasn't been added!`, 'error');
                    reject(`rtsp test server ${id} hasn't been added!`);
                });
            }
            let rtsp_test_server = self.test_servers[`${id}`];
            await rtsp_test_server.stop();
            await rtsp_test_server.terminate();
            delete self.test_servers[`${id}`];
        };

    }

    async start() {
        console.log("----------rtsp_test_server start");
        this.stream_matrix = ActionHero.api.stream_matrix.instance;

        // ActionHero.api.test.create_rtsp_test_server("app0", 8554, "/test", "h264", "pcma");
    }
    async stop() {
        console.log("----------rtsp_test_server stop");
        for (let server of Object.values(this.test_servers)) {
            await server.stop();
            await server.terminate();
        }
        this.test_servers = {};

    }
};
