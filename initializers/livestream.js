'use strict';
const ActionHero = require('actionhero');

module.exports = class MyInitializer extends ActionHero.Initializer {
    constructor() {
        super();
        this.name = 'livestream';
        this.loadPriority = 1001;
        this.startPriority = 1002;
        this.stopPriority = 998;
        this.livestreams = {};
    }

    async initialize() {
        ActionHero.api.livestream = {};
        var Module = ActionHero.api.Module;
        let self = this;

        ActionHero.api.livestream.create_livestream = async (id, url, video_codec, audio_codec) => {
            if (self.livestreams[`${id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`create_livestream: livestream ${id} has been added!`, 'error');
                    reject(`create_livestream: livestream ${id} has been added!`);
                });
            }
            let livestream = new Module.LiveStream(self.stream_matrix, id, url, {
                video: video_codec,
                audio: audio_codec
            });

            await livestream.initialize();
            self.livestreams[`${id}`] = { 'app': livestream, 'state': 'idle', 'audience': {} };
            livestream.on(`webrtc-peer-disconnected`, async (name) => {
                delete self.livestreams[`${id}`].audience[`${name}`];
                ActionHero.api.log(`remove_audience: audience ${name} is disconnected and removed from livestream ${id}!`, 'info');
            });

        };

        ActionHero.api.livestream.startup_livestream = async (id) => {
            if (!self.livestreams[`${id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`startup_livestream: livestream ${id} hasn't been added!`, 'error');
                    reject(`startup_livestream: livestream ${id} hasn't been added!`);
                });
            }
            if (self.livestreams[`${id}`].state == 'running') {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`startup_livestream: livestream ${id} has started up!`, 'error');
                    reject(`startup_livestream: livestream ${id} has started up!`);
                });
            }
            let livestream = self.livestreams[`${id}`].app;
            await livestream.startup();
            await Module.utils.poll(() => {
                return livestream.prepared();
            }, 100, 10000);

            self.livestreams[`${id}`].state = 'running';
        };


        ActionHero.api.livestream.add_audience = async (id, name, option) => {
            if (!self.livestreams[`${id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`add_audience: livestream ${id} hasn't been added!`, 'error');
                    reject(`add_audience: livestream ${id} hasn't been added!`);
                });
            }
            if (self.livestreams[`${id}`].audience[`${name}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`add_audience: audience ${name} has been added!`, 'error');
                    reject(`add_audience: audience ${name} has been added!`);
                });
            }
            if (self.livestreams[`${id}`].state != 'running') {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`add_audience: livestream ${id} hasn't started up!`, 'error');
                    reject(`add_audience: livestream ${id} hasn't started up!`);
                });
            }
            let livestream = self.livestreams[`${id}`].app;
            await livestream.add_audience(name, option);
            self.livestreams[`${id}`].audience[`${name}`] = option;
        };

        ActionHero.api.livestream.remove_audience = async (id, name) => {
            if (!self.livestreams[`${id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`remove_audience: ${id} hasn't been added!`, 'error');
                    reject(`remove_audience: ${id} hasn't been added!`);
                });
            }
            if (!self.livestreams[`${id}`].audience[`${name}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`remove_audience: audience ${name} hasn't been added!`, 'error');
                    reject(`remove_audience: audience ${name} hasn't been added!`);
                });
            }
            delete self.livestreams[`${id}`].audience[`${name}`];

            let livestream = self.livestreams[`${id}`].app;
            await livestream.remove_audience(name);
        };

        ActionHero.api.livestream.stop_livestream = async (id) => {
            if (!self.livestreams[`${id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`stop_livestream: ${id} hasn't been added!`, 'error');
                    reject(`stop_livestream: ${id} hasn't been added!`);
                });
            }
            self.livestreams[`${id}`].state = 'stopped';

            let livestream = self.livestreams[`${id}`].app;

            try {
                for (let name of Object.keys(self.livestreams[`${id}`].audiences)) {
                    await livestream.remove_audience(name);
                }
            } catch (err) {
                self.livestreams[`${id}`].audiences = {};
                await livestream.stop();
            }
            self.livestreams[`${id}`].audiences = {};
            await livestream.stop();
        };
        ActionHero.api.livestream.destroy_livestream = async (id) => {
            if (!self.livestreams[`${id}`]) {
                return new Promise((resolve, reject) => {
                    ActionHero.api.log(`destroy_livestream: ${id} hasn't been added!`, 'error');
                    reject(`destroy_livestream: ${id} hasn't been added!`);
                });
            }
            if (self.livestreams[`${id}`].state == 'running') {
                try {
                    await ActionHero.api.livestream.stop_livestream(id);
                } catch (err) { }
            }

            let livestream = self.livestreams[`${id}`].app;

            delete self.livestreams[`${id}`];
            await livestream.terminate();
        };
    }

    async start() {
        this.stream_matrix = ActionHero.api.stream_matrix.instance;

    }
    async stop() {
        for (let instance of Object.values(this.livestreams)) {
            await instance.app.stop();
            await instance.app.terminate();
        }
        this.livestreams = {};
    }
};
