import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn = false;
  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };


  constructor(public navCtrl: NavController, private fb: Facebook,private router: Router) {
 
  fb.getLoginStatus().then(res => {
    console.log(res.status);
    if (res.status === 'connect') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  })
  .catch(e => console.log(e));
    
  }

  ngOnInit() {



  }


  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }


  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        console.log(res);
        this.users = res;
        this.router.navigate(['/second']);

      })
      .catch(e => {
        console.log(e);
      });
  }


  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }


  // login(){
    
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //     .then((res: FacebookLoginResponse) => 
  //       console.log('Logged into Facebook!', res)
  //     )
  //     .catch(e => console.log('Error logging into Facebook', e));


  //   this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  // }

}