'use strict';
const ActionHero = require('actionhero');

exports.CreateRtspTestServer = class CreateRtspTestServer extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'CreateRtspTestServer';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true },
            port: { required: true },
            path: { required: true },
            video: { required: true },
            audio: { required: true },
        };
    }

    async run(data) {
        await ActionHero.api.test.create_rtsp_test_server(data.params.id, data.params.port, data.params.path, data.params.video, data.params.audio);
    }
};

exports.DestroyRtspTestServer = class DestroyRtspTestServer extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'DestroyRtspTestServer';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true }
        };
    }

    async run(data) {
        await ActionHero.api.test.destroy_rtsp_test_server(data.params.id);
    }
};