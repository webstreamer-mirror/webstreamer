/**
 * @apiDefine DefaultResponse
 * @apiSuccess {String} msg description
 * @apiSuccessExample {Json} Success-Response:
 *  {
 *      "msg": "OK"
 *  }
 *
 * @apiError {String} msg description
 * @apiErrorExample {Json} Error-Response:
 *  {
 *      "msg": "reason"
 *  }
 */


/**
 * @api {post} /livestream
 * @apiName livestream_create
 * @apiDescription create livestream
 * @apiGroup livestream
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id livestream id
 * @apiParam {String} url media source url
 * @apiParam {String{h264,openh264,mjpeg,vp8}} video video codec
 * @apiParam {String{pcma,pcmu,g711a,g711u,opus}} [audio] audio codec
 *
 * @apiParamExample {Json} Request-Example:
 *  POST /livestream
 *  {
 *      "id": "app1",
 *      "url": "rtsp://xx.xx.xx.xx/id=1",
 *      "video": "h264",
 *      "audio": "pcma"
 *  }
 *
 *
 * @apiUse DefaultResponse
 */


/**
 * @api {delete} /livestream
 * @apiName livestream_destroy
 * @apiDescription destroy livestream
 * @apiGroup livestream
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id livestream id
 *
 * @apiParamExample {String} Request-Example:
 *  DELETE /livestream?id=app1
 *
 *
 * @apiUse DefaultResponse
 */

/**
 * @api {put} /livestream/status
 * @apiName livestream_update_status
 * @apiDescription update livestream status: start or stop
 * @apiGroup livestream
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id livestream id
 * @apiParam {String{start,stop}} status livestream status
 *
 * @apiParamExample {Json} Request-Example:
 *  PUT /livestream/status
 *  {
 *      "id": "app1",
 *      "status": "start"
 *  }
 *  PUT /livestream/status
 *  {
 *      "id": "app1",
 *      "status": "stop"
 *  }
 *
 * @apiUse DefaultResponse
 */

/**
 * @api {post} /livestream/audience
 * @apiName livestream_add_audience
 * @apiDescription add audience
 * @apiGroup livestream
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id livestream id
 * @apiParam {String} name audience name
 * @apiParam {String{rtsp,webrtc}} type audience type
 * @apiParam {Number} [port] rtsp mount port
 * @apiParam {String} [path] rtsp mount path
 * @apiParam {String} [signal_bridge] webrtc singal bridge
 * @apiParam {String{offer,answer}} [role] webrtc role
 * @apiParam {Number} [connection_id] webrtc connection id
 *
 * @apiParamExample {Json} Request-Example:
 *  POST /livestream/audience
 *  {
 *      "id": "app1",
 *      "name": "audience1",
 *      "option": {
 *          "type": "rtsp",
 *          "port": 8554,
 *          "path": "/test_server"
 *      }
 *  }
 *
 *  POST /livestream/audience
 *  {
 *      "id": "app1",
 *      "name": "audience2",
 *      "option": {
 *          "type": "webrtc",
 *          "signal_bridge": "http://172.16.64.58:9001/",
 *          "role": "offer",
 *          "connection_id": 1
 *      }
 *  }
 *
 * @apiUse DefaultResponse
 */

/**
 * @api {delete} /livestream/audience
 * @apiName livestream_remove_audience
 * @apiDescription remove audience
 * @apiGroup livestream
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id livestream id
 * @apiParam {String} name audience name
 *
 * @apiParamExample {Json} Request-Example:
 *  DELETE /livestream/audience?id=app1&name=audience1
 *
 *
 * @apiUse DefaultResponse
 */


// ---------------------------------------------------------------------------

/**
 * @api {post} /multipoints
 * @apiName multipoints_create
 * @apiDescription create multipoints
 * @apiGroup multipoints
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id multipoints id
 * @apiParam {String{h264,openh264,mjpeg,vp8}} video video codec
 * @apiParam {String{pcma,pcmu,g711a,g711u,opus}} [audio] audio codec
 *
 * @apiParamExample {Json} Request-Example:
 *  POST /multipoints
 *  {
 *      "id": "app1",
 *      "video": "h264",
 *      "audio": "pcma"
 *  }
 *
 *
 * @apiUse DefaultResponse
 */


/**
 * @api {delete} /multipoints
 * @apiName multipoints_destroy
 * @apiDescription destroy multipoints
 * @apiGroup multipoints
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id multipoints id
 *
 * @apiParamExample {String} Request-Example:
 *  DELETE /multipoints?id=app1
 *
 *
 * @apiUse DefaultResponse
 */

/**
 * @api {put} /multipoints/status
 * @apiName multipoints_update_status
 * @apiDescription update multipoints status: start or stop
 * @apiGroup multipoints
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id multipoints id
 * @apiParam {String{start,stop}} status multipoints status
 *
 * @apiParamExample {Json} Request-Example:
 *  PUT /multipoints/status
 *  {
 *      "id": "app1",
 *      "status": "start"
 *  }
 *  PUT /multipoints/status
 *  {
 *      "id": "app1",
 *      "status": "stop"
 *  }
 *
 * @apiUse DefaultResponse
 */

/**
 * @api {post} /multipoints/member
 * @apiName multipoints_add_member
 * @apiDescription add member
 * @apiGroup multipoints
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id multipoints id
 * @apiParam {String} name member name
 * @apiParam {String{rtsp,webrtc}} type member type
 * @apiParam {Number} [port] rtsp mount port
 * @apiParam {String} [path] rtsp mount path
 * @apiParam {String} [signal_bridge] webrtc singal bridge
 * @apiParam {String{offer,answer}} [role] webrtc role
 * @apiParam {Number} [connection_id] webrtc connection id
 *
 * @apiParamExample {Json} Request-Example:
 *  POST /multipoints/member
 *  {
 *      "id": "app1",
 *      "name": "member1",
 *      "type": "rtsp",
 *      "port": 8554,
 *      "path": "/test_server"
 *  }
 *
 *  POST /multipoints/member
 *  {
 *      "id": "app1",
 *      "name": "member2",
 *      "type": "webrtc",
 *      "signal_bridge": "http://172.16.64.58:9001/",
 *      "role": "offer",
 *      "connection_id": 1
 *  }
 *
 * @apiUse DefaultResponse
 */

/**
 * @api {delete} /multipoints/member
 * @apiName multipoints_remove_member
 * @apiDescription remove member
 * @apiGroup multipoints
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id multipoints id
 * @apiParam {String} name member name
 *
 * @apiParamExample {Json} Request-Example:
 *  DELETE /multipoints/member?id=app1&name=member1
 *
 *
 * @apiUse DefaultResponse
 */

/**
 * @api {put} /multipoints/sepeaker
 * @apiName multipoints_set_speaker
 * @apiDescription update multipoints status: start or stop
 * @apiGroup multipoints
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id multipoints id
 * @apiParam {String} name member name
 *
 * @apiParamExample {Json} Request-Example:
 *  PUT /multipoints/status
 *  {
 *      "id": "app1",
 *      "status": "start"
 *  }
 *  PUT /multipoints/status
 *  {
 *      "id": "app1",
 *      "status": "stop"
 *  }
 *
 * @apiUse DefaultResponse
 */

// ---------------------------------------------------------------------------
/**
 * @api {post} /test/test_server
 * @apiName test_server_create
 * @apiDescription create test server
 * @apiGroup test
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id multipoints id
 * @apiParam {Number} port rtsp server port
 * @apiParam {String} path rtsp server path
 * @apiParam {String{h264,openh264,mjpeg,vp8}} video video codec
 * @apiParam {String{pcma,pcmu,g711a,g711u,opus}} audio audio codec
 *
 * @apiParamExample {Json} Request-Example:
 *  POST /test/test_server
 *  {
 *      "id": "app1",
 *      "port": 8554,
 *      "path": "/test",
 *      "video": "h264",
 *      "audio": "pcma"
 *  }
 *
 *
 * @apiUse DefaultResponse
 */

/**
 * @api {delete} /test/test_server
 * @apiName test_server_destroy
 * @apiDescription destroy test server
 * @apiGroup test
 * @apiVersion 0.1.0
 *
 * @apiParam {String} id test server id
 *
 * @apiParamExample {String} Request-Example:
 *  DELETE /test/test_server?id=app1
 *
 *
 * @apiUse DefaultResponse
 */