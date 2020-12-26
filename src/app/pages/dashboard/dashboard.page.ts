import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isLoggedIn = false;
  users:any;
  // users:any = { id: '', name: '', email: '', picture: { data: { url: '' } } };


  constructor(private fb: Facebook,private router: Router) { 
     
  }

  ngOnInit() {

    // this.users= this.route.snapshot.paramMap.get("loginData")
    // console.log(JSON.parse(this.users))
    this.users = JSON.stringify( localStorage.getItem('user'));
    console.log(this.users)


  }


  logout() {
    this.fb.logout()
      .then( res =>{
        this.router.navigate(['/login'])
        this.isLoggedIn = false
      })
      .catch(e => console.log('Error logout from Facebook', e));
  }

}
