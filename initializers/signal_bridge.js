'use strict';
const ActionHero = require('actionhero');
const fs = require('fs');
var httpServer = require('http');
const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');

module.exports = class MyInitializer extends ActionHero.Initializer {
    constructor() {
        super();
        this.name = 'signal_bridge';
        this.loadPriority = 1000;
        this.startPriority = 1000;
        this.stopPriority = 1000;
        this.config = '';
        this.httpApp = null;
    }

    async initialize() {
        ActionHero.api.signal_bridge = {};
        // this.config = {
        //     "socketURL": '/',
        //     "dirPath": null,
        //     "homePage": '/demos/index.html',
        //     "socketMessageEvent": 'RTCMultiConnection-Message',
        //     "socketCustomEvent": 'RTCMultiConnection-Custom-Message',
        //     "port": 9001,
        //     "enableLogs": false,
        //     "autoRebootServerOnFailure": false,
        //     "isUseHTTPs": false,
        //     "sslKey": './fake-keys/privatekey.pem',
        //     "sslCert": './fake-keys/certificate.pem',
        //     "sslCabundle": null,
        //     "enableAdmin": false,
        //     "adminUserName": 'username',
        //     "adminPassword": 'password'
        // };
        // ActionHero.api.signal_bridge.serverHandler = (request, response) =>{
        //     response.writeHead(200, {
        //         'Content-Type': 'text/plain'
        //     });
        //     response.write('RTCMultiConnection Socket.io Server.\n\n'
        //     + 'https://github.com/muaz-khan/RTCMultiConnection-Server\n\n'
        //     + 'npm install RTCMultiConnection-Server');
        //     response.end();
        // };

        // if (this.config.isUseHTTPs) {
        //     httpServer = require('https');
        
        //     // See how to use a valid certificate:
        //     // https://github.com/muaz-khan/WebRTC-Experiment/issues/62
        //     var options = {
        //         key: null,
        //         cert: null,
        //         ca: null
        //     };
        
        //     var pfx = false;
        
        //     if (!fs.existsSync(config.sslKey)) {
        //         console.log(BASH_COLORS_HELPER.getRedFG(), 'sslKey:\t ' + config.sslKey + ' does not exist.');
        //     } else {
        //         pfx = config.sslKey.indexOf('.pfx') !== -1;
        //         options.key = fs.readFileSync(config.sslKey);
        //     }
        
        //     if (!fs.existsSync(config.sslCert)) {
        //         console.log(BASH_COLORS_HELPER.getRedFG(), 'sslCert:\t ' + config.sslCert + ' does not exist.');
        //     } else {
        //         options.cert = fs.readFileSync(config.sslCert);
        //     }
        
        //     if (config.sslCabundle) {
        //         if (!fs.existsSync(config.sslCabundle)) {
        //             console.log(BASH_COLORS_HELPER.getRedFG(), 'sslCabundle:\t ' + config.sslCabundle + ' does not exist.');
        //         }
        
        //         options.ca = fs.readFileSync(config.sslCabundle);
        //     }
        
        //     if (pfx === true) {
        //         options = {
        //             pfx: sslKey
        //         };
        //     }
        
        //     this.httpApp = httpServer.createServer(options, ActionHero.api.signal_bridge.serverHandler);
        // } else {
        //     this.httpApp = httpServer.createServer(ActionHero.api.signal_bridge.serverHandler);
        // }
    }

    async start() {
        // let self = this;
        // RTCMultiConnectionServer.beforeHttpListen(this.httpApp, this.config);
        // this.httpApp = this.httpApp.listen(process.env.PORT || this.config.port, process.env.IP || "0.0.0.0", function () {
        //     RTCMultiConnectionServer.afterHttpListen(self.httpApp, self.config);
        // });

        // // --------------------------
        // // socket.io codes goes below
        // ioServer(this.httpApp).on('connection', function (socket) {
        //     RTCMultiConnectionServer.addSocket(socket, self.config);

        //     // ----------------------
        //     // below code is optional

        //     const params = socket.handshake.query;

        //     if (!params.socketCustomEvent) {
        //         params.socketCustomEvent = 'custom-message';
        //     }

        //     socket.on(params.socketCustomEvent, function (message) {
        //         socket.broadcast.emit(params.socketCustomEvent, message);
        //     });
        // });

    }
    async stop() {}
};
