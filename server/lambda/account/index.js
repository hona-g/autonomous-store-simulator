const AWS = require('aws-sdk');
const http = require('http');
const fetch = require('node-fetch');
AWS.config.region = 'ap-northeast-2';
const S3_PATH = 'https://autostore.s3.ap-northeast-2.amazonaws.com/'

const s3 = new AWS.S3({
  accessKeyId: 'AKIAIIZH3KTFD7P2FLJQ',
  secretAccessKey: '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',
});

exports.handler = async (event) => {
  const http = require('http');
  const { requestContext, queryStringParameters } = event;
  const { httpMethod } = requestContext;
  var statusCode = 200;
  var body = {};
  var res = null;
  try{
    let trade_info = await fetch(S3_PATH+'trade_info.json');
    trade_info = await trade_info.json();

    //get_trade_info
    //call all trade information
    if(httpMethod === "GET") {
      body['trade_info'] = trade_info;
      body.message = "";
    }

    if(httpMethod === "POST" || httpMethod === "PUT") {
      const { customerID, cart } = JSON.parse(event.body);
      let id = Object.keys(trade_info).length;
      trade_info[id] = {
        customerID,
        goodsitem: cart
      };
      body['trade_info'] = trade_info;
    }
    //cancel_trade (input: trade id number)
    if(httpMethod === "DELETE"){
      const {id} = JSON.parse(event.body);
      trade_info.splice(id, 1);
    }

    res = await s3.putObject({
      Bucket: 'autostore',
      Key: 'trade_info.json',
      Body: JSON.stringify(trade_info),
      ACL:'public-read',
    }).promise();
  }
  catch(e) {
    statusCode = 401;
    body.message = e;
  }
  finally {
    const response = {
      statusCode,
      body: JSON.stringify(body),
    };

    return response;
  }
};
