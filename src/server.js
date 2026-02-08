const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS, 
  //'/getUsers': jsonHandler.getUsers,
  //'/updateUser': jsonHandler.updateUser,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
   notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
    //parsing data from url
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    
    //gets query paramtery and parses them into a resuable object by field name
    request.query = Object.fromEntries(parsedUrl.searchParams);

    //Route based on the path user had gone tp
    if(urlStruct[parsedUrl.pathname]){
        return urlStruct[parsedUrl.pathname](request, response);
    }

    return urlStruct.notFound(request, response);
};

http.createServer(onRequest).listen(port, () =>{
    console.log(`Listening on 127.0.0.1: ${port}`);
});