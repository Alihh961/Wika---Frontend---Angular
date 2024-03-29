import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {StartupService} from "./_services/startUp/startup.service";
import {CookieService} from "./_services/cookie/cookie.service";
import {UserService} from "./_services/user/user.service";
import {TogglebodyclassService} from "./_services/body/togglebodyclass.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  constructor(
    private startUpService: StartupService,
    private cookieService: CookieService,
    private userService: UserService,
    private toggleBody: TogglebodyclassService,
    private renderer : Renderer2
  ) {
  }

  loadingStatus: boolean = false;
  userVerified: boolean | undefined = false;


  ngOnInit() {

    this.setLoadingStatus();
    this.loading();
    this.isVerified();
    this.toggleBodyClass();
  }

  setLoadingStatus() {
    this.startUpService.loadingStatus$.subscribe(
      (response: boolean) => {
        this.loadingStatus = response;
      }
    );
  }


  // we check if we have a token and no user returned yet then we display the loading component
  loading() {
    if (this.cookieService.getToken() && !this.userService.getLoggedUserStatus()) {
      this.startUpService.setLoadingStatus(true);
    }
  }

// we check if the user is not verified to display a notification to verify his account
  isVerified() {
    this.userService.loggedUser$.subscribe(
      response => {
        this.userVerified = response?.isVerified;
      }
    )

  }

  // we toggle the overflow hidden when startup component is displayed to avoid scroll bar
  toggleBodyClass() {
    const body: HTMLBodyElement | null = document.querySelector("body");
    this.toggleBody.toggleClass$.subscribe(
      (response) => {
        if (response) {
          body?.classList.add("overflow-hidden")
        } else {
          body?.classList.remove("overflow-hidden")

        }
      }
    )
  }

  ngAfterViewInit() {

    // we add the file js to the DOM after the Init of the view to avoid undefined html tags
    const script = this.renderer.createElement('script');
    script.src = 'assets/javascript.js';
    document.body.appendChild(script);
  }

}
