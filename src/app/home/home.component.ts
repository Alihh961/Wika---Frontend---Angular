import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {UserService} from "../_services/user/user.service";
import {AuthenticationService} from "../_services/auth/authentication.service";
import {StartupService} from "../_services/startUp/startup.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private pageTitle: Title , private userService :UserService,private authService :AuthenticationService ,
              private StartUpService: StartupService){ }

    ngOnInit(): void {
      this.pageTitle.setTitle('Home');
     this.userService.loggedUser$.subscribe(
          (r)=>{
            // console.log(r);
          }
      );
    }

    toto(){
// this.authService.login({username:"hajhassan.ali@outlook.com" , password :"1"}).subscribe(
//   (response)=>{
//     console.log(response);
//   }
// )

        }






    // banner: string ='./assets/imgs/imageHomePage.jpg'; // Slider Image



}
