'use strict';
const ActionHero = require('actionhero');

exports.CreateMultipoint = class CreateMultipoint extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'CreateMultipoint';
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
        await ActionHero.api.multipoint.create_multipoint(data.params.id, data.params.video, data.params.audio);
    }
};

exports.UpdateMultipoint = class UpdateMultipoint extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'UpdateMultipoint';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true },
            status: { required: true }
        };
    }

    async run(data) {
        if (data.params.status == 'start')
            await ActionHero.api.multipoint.startup_multipoint(data.params.id);
        else
            await ActionHero.api.multipoint.stop_multipoint(data.params.id);
    }
};

exports.AddMember = class AddMember extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'AddMember';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true },
            room_id: { required: true },
            name: { required: true },
            option: { required: true }
        };
    }

    async run(data) {
        await ActionHero.api.multipoint.add_member(data.params.id, data.params.room_id, data.params.name, data.params.option);
    }
};
exports.RemoveMember = class RemoveMember extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'RemoveMember';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true },
            room_id: { required: true },
            name: { required: true }
        };
    }

    async run(data) {
        await ActionHero.api.multipoint.remove_member(data.params.id, data.params.room_id, data.params.name);
    }
};

exports.DestroyMultipoint = class DestroyMultipoint extends ActionHero.Action {
    constructor() {
        super();
        this.name = 'DestroyMultipoint';
        this.description = 'an actionhero action';
        this.outputExample = {};
        this.inputs = {
            id: { required: true }
        };
    }

    async run(data) {
        await ActionHero.api.multipoint.destroy_multipoint(data.params.id);
    }
};