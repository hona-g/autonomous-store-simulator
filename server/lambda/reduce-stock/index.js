const AWS = require('aws-sdk');
const http = require('http');
const fetch = require('node-fetch');
AWS.config.region = 'ap-northeast-2';
const S3_PATH = 'https://autostore.s3.ap-northeast-2.amazonaws.com/'

const s3 = new AWS.S3({
  accessKeyId: 'AKIAQMRF2BUAN2UKG7TK',
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
    let goodsitem = await fetch(S3_PATH+'goodsitem.json');
    goodsitem = await goodsitem.json();
    const { cart } = JSON.parse(event.body);

    Object.keys(cart).forEach((id)=> {
      goodsitem[id] -= cart[id];
      if (goodsitem[id] < 0) goodsitem[id] = 0;
    });

    res = await s3.putObject({
      Bucket: 'autostore',
      Key: 'goodsitem.json',
      Body: JSON.stringify(goodsitem),
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
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    };

    return response;
  }
};
