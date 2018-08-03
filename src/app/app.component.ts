import { Component} from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { MyAccountPage } from '../pages/my-account/my-account';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { AddressPage } from '../pages/address/address';
import { MycartPage } from '../pages/mycart/mycart';
import { TablesPage } from '../pages/tables/tables'; 
 
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{title: string, component: any}>;
  
  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
            this.splashScreen.hide();

    });
  }
    // openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
  // }
  openmyaccountpage(){
     this.nav.push(MyAccountPage);
  }  
  opentablespage(){
    this.nav.push(TablesPage);
  }
  openmycartpage(){
    this.nav.setRoot(MycartPage);

  }
 logout(){
    this.nav.setRoot(LoginPage);

  }
}

