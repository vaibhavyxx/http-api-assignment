const respond = (request, response, status, content, type) => {
  response.writeHead(status, {
    'Content-Type' : type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  response.write(content);
  response.end();
};

const jsonXMLData = (request, response, status, msg, id) => {
  const accept = request.headers.accept || 'application/json';

  const data = {
    message: msg,
    id:id,
  }
  if(accept.includes('text/xml')){
    let responseXML = `<response><message> ${data.message}</message><id>${data.id}</id></response>`;
    return respond(request, response, status, responseXML, 'text/xml');
  }
  else{
    const dataJSON = JSON.stringify(data);
    return respond(request, response, status, dataJSON, 'application/json');
  }
}

const success = (request, response) => {
  jsonXMLData(request, response, 200, 'This is a successful response', 'success');
};

const notFound = (request, response) => {
  jsonXMLData(request, response, 404, 'The page you are looking for was not found', 'notFound');
}

const unauthRequest = (request, response) => {
  if (!request.query.valid || request.query.valid !== 'true') {
    jsonXMLData(request, response, 401, 'Missing loggedIn query param set to yes', 'unauthorized');
  }
  else{
  jsonXMLData(request, response, 200, 'LoggedIn query parm set to yes', 'authorized');
  }
}

const forbiddenRequest = (request, response) => {
  jsonXMLData(request, response, 403, "Mssing loggedIn query param set to yes", 'forbidden');
}

const internalRequest = (request, response) => {
  jsonXMLData(request, response, 500, "Internal Server Error. Something Went Wrong", 'internalServerError');
}

const notImplementedReq = (request, response) => {
  jsonXMLData(request, response, 501, "A get reuqest for this page has not been implemented yet. Check again later for updated content.", 'notImplemented');
}

const badRequest = (request, response) => {
  const accept = request.headers.accept || 'application/json';

  if (!request.query.valid || request.query.valid !== 'true') {
    //jsonXMLData(request, response, 400, 'The page you are looking for was not found');
    const data ={
      message: 'The page you are looking for was not found',
      id: 'badRequest'
    }

    if(accept.includes('text/xml')){
      let responseXML = `<response><message> ${data.message}</message><id>${data.id}</id></response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    else{
      const dataJSON = JSON.stringify(data);
      return respond(request, response, 400, dataJSON, 'application/json');
    }
  }

  jsonXMLData(request, response, 200, 'This request had the required parameters');
  const dataParam ={
      message: 'This request had the required parameters',
      id: 'badRequest',
    }
    if(accept.includes('text/xml')){
      let responseXML = `<response><message> ${dataParam.message}</message><id>${dataParam.id}</id></response>`;
      return respond(request, response, 200, responseXML, 'text/xml');
    }else{
      const dataJSON = JSON.stringify(dataParam);
      return respond(request, response, 200, dataJSON, 'application/json');
    }
}
module.exports = {success, badRequest, notFound, notImplementedReq, unauthRequest, forbiddenRequest, internalRequest};