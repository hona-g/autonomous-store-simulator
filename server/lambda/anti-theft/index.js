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
    let theft = await fetch(S3_PATH+'anti-theft-management.json');
    theft = await theft.json();
    const { goods, customerID } = event;
    let date = new Date();
    let currentTime = date.toISOString();

    let id = Object.keys(theft).length;
    theft[id] = {
      customerID,
      goods,
      currentTime
    };

    body.goods = goods;
    body.customerID = customerID;
    body.message = `도난 감지 : 고객(${customerID})\n감지시간 : ${currentTime}\n물품 : ${goods}`;

    res = await s3.putObject({
      Bucket: 'autostore',
      Key: 'anti-theft-management.json',
      Body: JSON.stringify(theft),
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
