const httpStatus = require('http-status');
const { Model } = require('../models');
const request = require('request');
const { http } = require('winston');
const axios = require('axios');


module.exports.testController = async (req, res, next) => {
    try {

        const {
            maTinh,
            maHuyen,
            maXa,
            maThon,
            maHo,
            tenHo,
            maDinhDanh,
            hoTen,
            soCmnd,
            ngaySinh,
            checkHoTen,
            maSo,
            maThe,
            page,
            size,
            propertyName,
            direction,
        } = req.query;

        const searchObj = {
            "maTinh": maTinh ? maTinh : "82",
            "maHuyen": maHuyen ? maHuyen : "",
            "maXa": maXa ? maXa : "",
            "maThon": maThon ? maThon : "",
            "maHo": maHo ? maHo : "",
            "tenHo": tenHo ? tenHo : "",
            "maDinhDanh": maDinhDanh ? maDinhDanh : "",
            "hoTen": hoTen ? hoTen : "nguyễn văn lợi",
            "soCmnd": soCmnd ? soCmnd : "",
            "ngaySinh": ngaySinh ? ngaySinh : null,
            "checkHoTen": checkHoTen ? checkHoTen : false,
            "maSo": maSo ? maSo : "",
            "maThe": maThe ? maThe : "",
            "page": page ? page : 0,
            "size": size ? size : 100,
            "propertyName": propertyName ? propertyName : "maDinhDanh",
            "direction": direction ? direction : "ASC"
        }

        var options = {
            'method': 'GET',
            'url': 'http://tst.baohiemxahoi.gov.vn/api/account?cacheBuster=1594292445373',
            'headers': {
                //'Cookie': 'JSESSIONID=7qVCufOTIgwo5ON7ovPw-9Bbs5f_-AWcjZZhbQnB5LTqzFrKS-V_!-1192939675; BIGipServerTST-PRO-APP-119-60=1165426698.50466.0000'
            }
        };

        let cookie = '';
        let CSRFToken = '';
        request(options, function (error, response) {
            if (error) throw new Error(error);
            // console.log(response.headers["set-cookie"]);
            for (i in response.headers["set-cookie"]) {
                const val = response.headers["set-cookie"][i];
                const cookieItem = val.split(';')[0]
                cookie = cookie + cookieItem + '; ';
                if (val.search('CSRF-TOKEN') !== -1) {
                    CSRFToken = cookieItem.slice(11, cookieItem.length);
                }
            }
            cookie = cookie.slice(0, -2);

            var options = {
                'method': 'POST',
                'url': 'http://tst.baohiemxahoi.gov.vn/api/authentication',
                'headers': {
                    'X-CSRF-TOKEN': CSRFToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookie,
                },
                form: {
                    'j_username': 'nang_sms',
                    'j_password': '123!@#nang',
                    'dm_bhxh_id': '742',
                    'remember-': 'false',
                    'submit': 'Login'
                }
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);


                var options = {
                    'method': 'POST',
                    'url': 'http://tst.baohiemxahoi.gov.vn/api/hoGiaDinh/traCuuSoDinhDanh?cacheBuster=1594288252316',
                    'headers': {
                        'X-CSRF-TOKEN': CSRFToken,
                        'Content-Type': 'application/json',
                        'Cookie': cookie
                    },
                    body: JSON.stringify(
                        searchObj
                    )


                };
                request(options, function (error, response) {
                    if (error) {
                        throw new APIError({
                            message: 'Failed on getting data',
                            status: httpStatus.INTERNAL_SERVER_ERROR,
                            stack: error.stack,
                            isPublic: false,
                            errors: error.errors,
                        })
                    };
                    const result = JSON.parse(response.body);
                    return res.status(httpStatus.OK)
                        .json({
                            code: httpStatus.OK,
                            message: 'get data successfully',
                            result: result,
                        })
                        .end();
                });

            });
        });



    } catch (error) {
        next(error);
    }
}

module.exports.getDataFromExternalServerAsync = async () => {
    try {


    } catch (error) {
        next(error);
    }
}