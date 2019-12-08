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
  var statusCode = 200;
  var body = {};
  var res = null;
  try{
    let customer = await fetch(S3_PATH+'customer.json');
    customer = await customer.json();

    const { id } = event;
    if(typeof(customer[id]) == 'undefined') {
      body.id = id;
      body.message = '신규 유저 감지';
      body.is_new = true;
    }
    else {
      body.id = id;
      body.message = `유저감지 : ${customer.id.name} (등급 : ${customer.id.tier})`;
      body.customer = customer.id;
      body.is_new = false;
    }

    res = await s3.putObject({
      Bucket: 'autostore',
      Key: 'customer.json',
      Body: JSON.stringify(customer),
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
