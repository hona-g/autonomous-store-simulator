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
    let customer = await fetch(S3_PATH+'customer.json');
    customer = await customer.json();

    //let discount_info = await fetch(S3_PATH+'discount_info.json');
    //discount_info = await discount_info.json();
    // detect_user
    if (httpMethod === "GET") {
      body['customer'] = JSON.stringify(customer);
      //body['discount_info'] = JSON.stringify(discount_info);
    }

    //add_gross_of_customer
    if (httpMethod === "PUT") {
      const {id, sum} = event;
      let gross_sum = Number(customer[id].total_sum);
      customer[id] = {
        total_sum : gross_sum + sum
      };

        //set_rank
      gross_sum = Number(customer[id].total_sum);

       if(gross_sum >= 1000000)
       {
         customer[id].tier = 'VIP';
       }
       else if(gross_sum >= 500000)
      {
        customer[id].tier = 'Gold';
      }
       else if(gross_sum >= 100000)
       {
         customer[id].tier = 'Silver';
       }
       else{
         customer[id].tier = 'Bronze';
       }
      }

    // enroll_customer
    if(httpMethod === "POST"){
      const {id, name, age, tier} = event;
      customer[id] = {
        id,
        name,
        age,
        tier,
      };
    }


    if(httpMethod === "DELETE"){
      const {id} = event;
      customer.splice(id, 1);
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
