const fs = require('fs'); //pull into file system module
//const { request } = require('http');

//load files into memory sychronously to do it at the start
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

//loading these pages
const getIndex = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(index);
    response.end();
};

const getCSS = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.write(css);
    response.end();
};

module.exports = {getIndex, getCSS,};
