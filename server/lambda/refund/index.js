
class refund_management{
  constructor(){
    //환불 가능여부 확인 및 환불 처리 (refundable 상태는 변화 X)
    this.check_status = function(goods){
      return new Promise((resolve, reject) => {
        const body = {};
        if(!goods.get_refund_status()){
          body['message'] = "환불 불가능 상품입니다.";
          reject(body);
        }
        else{
          body['message'] = "환불 처리 되었습니다.";
          resolve(body);
        }
      });
    }
  }
}
