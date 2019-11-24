export default function requestHelper(url, cb) {

    return fetch('http://192.168.0.107:3000' + url)
        .then((response) => response.json())
        .then((responseJson) => {
            cb(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });

}