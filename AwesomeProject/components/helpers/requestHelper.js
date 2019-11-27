export default function requestHelper(url, cb, queryParams) {

    return fetch('http://192.168.0.107:3000' + constructGetParamsToUrl(url, queryParams))
        .then((response) => response.json())
        .then((responseJson) => {
            cb(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });

}

function constructGetParamsToUrl(url, paramsMas) {
    console.log('paramsMas', paramsMas)

    if (!paramsMas || paramsMas.length == 0) {
        return url
    }
    if (url == '/') url = ''
    url = url + '?'

    for (let i = 0; i < paramsMas.length; i++) {
        if (i == 0) {
            url = url + `${paramsMas[i]['key']}=${paramsMas[i]['value']}`
        }else{
            url = url + `&${paramsMas[i]['key']}=${paramsMas[i]['value']}`
        }
    }
    return url
}