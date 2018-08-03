import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProvidersUrl {
  public baseUrl: 'http://staging.php-dev.in:8844/trainingapp/api';
 getBaseUrl() {
    return 'http://staging.php-dev.in:8844/trainingapp/api';
  }

  constructor(http: HttpModule ) {
    console.log('Hello ProvidersProvider Provider');
  }

  public login = this.getBaseUrl() + '/users/login';
  public register= this.getBaseUrl() + '/users/register';
//     forgotpass : this.baseUrl + '/users/forgot';
//       Changepass : this.baseUrl + '/users/change';
//         updateaccount : this.baseUrl + '/users/update';
//           Fetchaccount : this.baseUrl + '/users/getUserData';

//             getlist : this.baseUrl + '/products/getList';
// getDetail: this.baseUrl + '/products/getDetail';
// setrating: this.baseUrl + '/products/setRating';


// addToCart: this.baseUrl + '/addToCart';
// editCart: this.baseUrl + '/editCart';
// deleteCart: this.baseUrl + '/deleteCart';
// listCartitem: this.baseUrl + '/cart';

// order: this.baseUrl + '/order';
// orderList: this.baseUrl + '/orderList';
// orderDetail: this.baseUrl + '/orderDetail';

}
