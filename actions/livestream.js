'use strict';
const ActionHero = require('actionhero');

exports.CreateLivestream = class CreateLivestream extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'CreateLivestream';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true },
            url: { required: true },
            video: { required: true },
            audio: { required: true },
        };
    }

    async run(data) {
        await ActionHero.api.livestream.create_livestream(data.params.id, data.params.url, data.params.video, data.params.audio);
    }
};

exports.UpdateLivestream = class UpdateLivestream extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'UpdateLivestream';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true },
            status: { required: true }
        };
    }

    async run(data) {
        if (data.params.status == 'start')
            await ActionHero.api.livestream.startup_livestream(data.params.id);
        else
            await ActionHero.api.livestream.stop_livestream(data.params.id);
    }
};

exports.AddAudience = class AddAudience extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'AddAudience';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true },
            name: { required: true },
            option: { required: true }
        };
    }

    async run(data) {
        await ActionHero.api.livestream.add_audience(data.params.id, data.params.name, data.params.option);
    }
};
exports.RemoveAudience = class RemoveAudience extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'RemoveAudience';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true },
            name: { required: true }
        };
    }

    async run(data) {
        await ActionHero.api.livestream.remove_audience(data.params.id, data.params.name);
    }
};

exports.DestroyLivestream = class DestroyLivestream extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'DestroyLivestream';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true }
        };
    }

    async run(data) {
        await ActionHero.api.livestream.destroy_livestream(data.params.id);
    }
};