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
    let goods = await fetch(S3_PATH+'goods.json');
    goods = await goods.json();

    let goodsitem = await fetch(S3_PATH+'goodsitem.json');
    goodsitem = await goodsitem.json();

    if (httpMethod === "GET") {
      body['goods'] = JSON.stringify(goods);
      body['goodsitem'] = JSON.stringify(goodsitem);
    }

    if (httpMethod === "PUT") {
      const { id, name, price, category, refundable, stock, max_stock } = event;
      goods[id] = {
        name,
        price,
        category,
        refundable,
      };
      goodsitem[id] = {
        stock,
        max_stock,
      };
    }

    if(httpMethod === "POST"){
      const {name, price, category, refundable, stock, max_stock} = event;
      //id_num : 맨 마지막 goods id
      let id_num = Number(Object.keys(goods).length);
      goods[id_num + 1] = {
        id : id_num +1 ,
        name,
        price,
        category,
        refundable,
      };
      goodsitem[id_num + 1] = {
        stock,
        max_stock,
      }
    }
    if(httpMethod === "DELETE"){
      // 지울 ID만 받아서 삭제
      const {id} = event;
      goods.splice(id, 1);
      goodsitem.splice(id, 1)
    }

    res = await s3.putObject({
      Bucket: 'autostore',
      Key: 'goods.json',
      Body: JSON.stringify(goods),
      ACL:'public-read',
    }).promise();

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
