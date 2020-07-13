const Router = require('express').Router();

const {
    testController,
} = require('../../controllers/test.controller');

/**
 * @api {get} /v1/api/test/ Get testing route
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:5000/v1/api/test
 * 
 * @apiName FirstTest
 * @apiGroup Test
 * @apiHeader authorization
 * 
 * @apiParam {String} maTinh Ma tinh
 * @apiParam {String} maHuyen Ma huyen
 * @apiParam {String} maXa Ma xa
 * @apiParam {String} maThon Ma thon
 * @apiParam {String} maHo Ma ho
 * @apiParam {String} tenHo Ten ho
 * @apiParam {String} maDinhDanh Ma dinh danh
 * @apiParam {String} hoTen Ho va ten
 * @apiParam {String} soCmnd So CMND
 * @apiParam {String} ngaySinh Ngay sinh
 * @apiParam {Boolean} checkHoTen Check ho ten
 * @apiParam {String} maSo Ma so
 * @apiParam {String} maThe Ma the
 * @apiParam {Number} page Page number
 * @apiParam {Number} size Page size
 * @apiParam {String} propertyName Loai dinh danh
 * @apiParam {String} direction Sap xep
 * 
 */
Router.route('/').get(
    testController
)


module.exports = Router;