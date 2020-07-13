const axios = require('axios');
const { GetCookieAndCSRFTokenFromResponse } = require('../helpers/fetchExternalData.helper');
var qs = require('qs');
const httpStatus = require('http-status');
const { error } = require('winston');
const { APIError } = require('../utils/APIError');

class TST {
    authorization = {
        cookie: '',
        CSRFToken: ''
    }
    constructor() {
    }
    async init() {
        await this.fetchAuth();
    }

    async fetchAuth() {
        const {
            cookie,
            CSRFToken,
            statusCode,
        } = await fetchAuthorization();

        if (statusCode !== 200) {
            throw new APIError({
                message: 'failed on init TST',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: error.errors,
            })
        }

        this.authorization = {
            cookie: cookie,
            CSRFToken: CSRFToken,
        }
    }

    async fetchData(dataObj) {
        try {
            var data = JSON.stringify(dataObj);
            var config = {
                method: 'post',
                url: 'http://tst.baohiemxahoi.gov.vn/api/hoGiaDinh/traCuuSoDinhDanh?cacheBuster=1594288252316',
                headers: {
                    'X-CSRF-TOKEN': this.authorization.CSRFToken,
                    'Content-Type': 'application/json',
                    'Cookie': this.authorization.cookie,
                },
                data: data
            };

            const response = await axios(config);

            return {
                data: response.data,
                statusCode: response.status,
            }
        } catch (error) {
            await this.fetchAuth();
            const {
                data,
                statusCode,
            } = await this.fetchData(dataObj);

            return {
                data: data,
                statusCode: statusCode,
            }

        }
    }




}

const fetchCookieAndToken = async () => {
    try {
        var config = {
            method: 'get',
            url: 'http://tst.baohiemxahoi.gov.vn/api/account?cacheBuster=1594292445373',
            headers: {
            }
        };

        const response = await axios(config);
        return GetCookieAndCSRFTokenFromResponse(response);



    } catch (error) {
        return GetCookieAndCSRFTokenFromResponse(error.response);
    }
}

const fetchAuthentication = async (cookie, CSRFToken) => {
    try {
        var data = qs.stringify({
            'j_username': 'nang_sms',
            'j_password': '123!@#nang',
            'dm_bhxh_id': '742',
            'remember-': 'false',
            'submit': 'Login'
        });
        var config = {
            method: 'post',
            url: 'http://tst.baohiemxahoi.gov.vn/api/authentication',
            headers: {
                'X-CSRF-TOKEN': CSRFToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookie
            },
            data: data
        };

        const response = await axios(config)
        return {
            headers: response.headers,
            statusCode: response.status,
        };
    } catch (error) {
        const response = error.response;
        return {
            headers: response.headers,
            statusCode: response.status,
        };;
    }
}

const fetchAuthorization = async () => {
    const {
        cookie,
        CSRFToken,
    } = await fetchCookieAndToken();

    const { headers, statusCode } = await fetchAuthentication(cookie, CSRFToken);

    return {
        cookie: cookie,
        CSRFToken: CSRFToken,
        statusCode: statusCode,
    }

}

const fetchData = async (authorizationObj, dataObj) => {
    try {
        var data = JSON.stringify(dataObj);
        var config = {
            method: 'post',
            url: 'http://tst.baohiemxahoi.gov.vn/api/hoGiaDinh/traCuuSoDinhDanh?cacheBuster=1594288252316',
            headers: {
                'X-CSRF-TOKEN': authorizationObj.CSRFToken,
                'Content-Type': 'application/json',
                'Cookie': authorizationObj.cookie,
            },
            data: data
        };

        const response = await axios(config);

        return {
            data: response.data,
            statusCode: response.status,
        }
    } catch (error) {
        const response = error.response;
        return {
            data: response.data,
            statusCode: response.status,
        }

    }
}

module.exports = {
    fetchCookieAndToken,
    fetchAuthorization,
    fetchAuthentication,
    fetchData,
    TST,
}