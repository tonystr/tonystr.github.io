export default async function requestRawText(path, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200 && xhttp.responseText) {
            callback(xhttp.responseText);
        }
    }
    xhttp.open('GET', path, true);
    xhttp.send();
}
