

class goods {
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.price = undefined;
    this.category = undefined;
    this.refundable = true;

    this.set_price = function(price){
      return new Promise((resolve, reject)=>{
        const body = {};
        if(price <= 0)
        {
          body['message'] = "0 이하 가격 책정 불가능";
          reject(body);
        }
        else{
        this.price = price;
        body['message'] = "가격 설정"
        body['price'] = this.price;
        resolve(body);
      });
    }

    this.set_price = function(category){
      return new Promise((resolve, reject)=>{
        const body = {};
        this.price = price;
        body['message'] = "카테고리 설정"
        body['category'] = this.category;
        resolve(body);
        );
    }


    this.get_name = function(){
      return this->name;
    }
    this.get_id = function(){
      return this->id;
    }
    this.get_price = function(){
      return this->price;
    }
    this.get_category = function(){
      return this->category;
    }
    this.get_refund_status = function(){
      return this->refundable;
    }

  }
}
