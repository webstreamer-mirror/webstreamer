'use strict';
const ActionHero = require('actionhero');

module.exports = class MyInitializer extends ActionHero.Initializer {
    constructor() {
        super();
        this.name = 'multipoint';
        this.loadPriority = 1002;
        this.startPriority = 1003;
        this.stopPriority = 997;
        this.multipoints = {};
    }

    async initialize() {
        ActionHero.api.multipoint = {};
        var Module = ActionHero.api.Module;
        let self = this;

        ActionHero.api.multipoint.create_multipoint = async (app_id, video_codec, audio_codec) => {
            if (self.multipoints[`${app_id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`create_multipoint: multipoint ${app_id} has been added!`, 'error');
                    reject(`create_multipoint: multipoint ${app_id} has been added!`);
                });
            }
            let multipoint = new Module.MultiPoints(self.stream_matrix, app_id, {
                video: video_codec,
                audio: audio_codec
            });

            await multipoint.initialize();
            self.multipoints[`${app_id}`] = { 'app': multipoint, 'state': 'idle', 'rooms': {} };
            // multipoint.on(`webrtc-peer-disconnected`, async (name) => {
            //     delete self.multipoints[`${app_id}`].audience[`${name}`];
            //     ActionHero.api.log(`remove_audience: audience ${name} is disconnected and removed from multipoint ${app_id}!`, 'info');
            // });

        };

        ActionHero.api.multipoint.startup_multipoint = async (app_id) => {
            if (!self.multipoints[`${app_id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`startup_multipoint: multipoint ${app_id} hasn't been added!`, 'error');
                    reject(`startup_multipoint: multipoint ${app_id} hasn't been added!`);
                });
            }
            if (self.multipoints[`${app_id}`].state == 'running') {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`startup_multipoint: multipoint ${app_id} has started up!`, 'error');
                    reject(`startup_multipoint: multipoint ${app_id} has started up!`);
                });
            }
            let multipoint = self.multipoints[`${app_id}`].app;
            await multipoint.startup();
            // await Module.utils.poll(() => {
            //     return multipoint.prepared();
            // }, 100, 10000);

            self.multipoints[`${app_id}`].state = 'running';
        };


        ActionHero.api.multipoint.add_member = async (app_id, room_id, member_name, option) => {
            if (!self.multipoints[`${app_id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`add_member: multipoint ${app_id} hasn't been added!`, 'error');
                    reject(`add_member: multipoint ${app_id} hasn't been added!`);
                });
            }
            if (self.multipoints[`${app_id}`].state != 'running') {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`add_member: multipoint ${app_id} hasn't started up!`, 'error');
                    reject(`add_member: multipoint ${app_id} hasn't started up!`);
                });
            }
            if (self.multipoints[`${app_id}`].rooms[`${room_id}`] &&
                self.multipoints[`${app_id}`].rooms[`${room_id}`][`${member_name}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`add_member: member ${member_name} has been added in room ${room_id}!`, 'error');
                    reject(`add_member: member ${member_name} has been added in room ${room_id}!`);
                });
            }
            let multipoint = self.multipoints[`${app_id}`].app;
            await multipoint.add_member(name, room_id, option);

            if (!self.multipoints[`${app_id}`].rooms[`${room_id}`]) {
                self.multipoints[`${app_id}`].rooms[`${room_id}`] = {};
            }
            self.multipoints[`${app_id}`].rooms[`${room_id}`][`${member_name}`] = option;
        };

        ActionHero.api.multipoint.remove_member = async (app_id, room_id, member_name) => {
            if (!self.multipoints[`${app_id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`remove_member: ${app_id} hasn't been added!`, 'error');
                    reject(`remove_member: ${app_id} hasn't been added!`);
                });
            }
            // if (!self.multipoints[`${app_id}`].member[`${name}`]) {
            //     return new Promise((resolve, reject) => {
            //         ActionHero.api.log(`remove_member: member ${name} hasn't been added!`, 'error');
            //         reject(`remove_member: member ${name} hasn't been added!`);
            //     });
            // }
            if (!self.multipoints[`${app_id}`].rooms[`${room_id}`] ||
                self.multipoints[`${app_id}`].rooms[`${room_id}`] &&
                !self.multipoints[`${app_id}`].rooms[`${room_id}`][`${member_name}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`add_member: member ${member_name} hasn't been added in room ${room_id}!`, 'error');
                    reject(`add_member: member ${member_name} hasn't been added in room ${room_id}!`);
                });
            }
            delete self.multipoints[`${app_id}`].rooms[`${room_id}`][`${member_name}`];

            let multipoint = self.multipoints[`${app_id}`].app;
            await multipoint.remove_member(member_name, room_id);
        };

        ActionHero.api.multipoint.stop_multipoint = async (app_id) => {
            if (!self.multipoints[`${app_id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`stop_multipoint: ${app_id} hasn't been added!`, 'error');
                    reject(`stop_multipoint: ${app_id} hasn't been added!`);
                });
            }
            self.multipoints[`${app_id}`].state = 'stopped';

            let multipoint = self.multipoints[`${app_id}`].app;

            try {
                for (let room_id of Object.keys(self.multipoints[`${app_id}`].rooms)) {
                    for (let member_name of Object.keys(self.multipoints[`${app_id}`].rooms[room_id])) {
                        await multipoint.remove_member(member_name, room_id);
                    }
                }
            } catch (err) {
                self.multipoints[`${app_id}`].members = {};
                await multipoint.stop();
            }
            self.multipoints[`${app_id}`].members = {};
            await multipoint.stop();
        };
        ActionHero.api.multipoint.destroy_multipoint = async (app_id) => {
            if (!self.multipoints[`${app_id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`destroy_multipoint: ${app_id} hasn't been added!`, 'error');
                    reject(`destroy_multipoint: ${app_id} hasn't been added!`);
                });
            }
            if (self.multipoints[`${app_id}`].state == 'running') {
                try {
                    await ActionHero.api.multipoint.stop_multipoint(app_id);
                } catch (err) { }
            }

            let multipoint = self.multipoints[`${app_id}`].app;

            delete self.multipoints[`${app_id}`];
            await multipoint.terminate();
            multipoint = null;
        };
    }

    async start() {
        this.stream_matrix = ActionHero.api.stream_matrix.instance;
        ActionHero.api.multipoint.create_multipoint("default_multipoint", "h264", "pcma");
    }
    async stop() {
        for (let instance of Object.values(this.multipoints)) {
            await instance.app.stop();
            await instance.app.terminate();
        }
        this.multipoints = {};
    }
};
