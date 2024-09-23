import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('loginForm') loginForm!: ElementRef;
  @ViewChild('registerForm') registerForm!: ElementRef;
  @ViewChild('darkOverlay') darkOverlay!: ElementRef;
  @ViewChild('starContainer') starContainer!: ElementRef;
  @ViewChild('LogIn') botonLogin!: ElementRef;
  @ViewChild('cancel') botonCancelLogin!: ElementRef;
  @ViewChild('SignUp') botonSignUp!: ElementRef;
  @ViewChild('cancelRegister') botonCancelRegister!: ElementRef


  ngAfterViewInit() {
    console.log("Script loaded");

    if (this.botonLogin) {
      this.botonLogin.nativeElement.addEventListener("click", this.loginPopUp.bind(this));
    }
    if (this.botonCancelLogin) {
      this.botonCancelLogin.nativeElement.addEventListener("click", this.closePopUp.bind(this));
    }
    if (this.botonSignUp) {
      this.botonSignUp.nativeElement.addEventListener("click", this.showRegisterForm.bind(this));
    }
    if (this.botonCancelRegister) {
      this.botonCancelRegister.nativeElement.addEventListener("click", this.hideRegisterForm.bind(this));
    }

    if (this.starContainer) {
      this.createStars();
    }
  }

  loginPopUp() {
    console.log("Log in");
    this.loginForm.nativeElement.style.display = "block";
    this.darkOverlay.nativeElement.style.display = "block";
  }

  handleCancel() {
    window.location.href = '/';
  }

  closePopUp() {
    this.loginForm.nativeElement.style.display = "none";
    this.darkOverlay.nativeElement.style.display = "none";
  }

  showRegisterForm() {
    console.log("Show register form");
    this.registerForm.nativeElement.style.display = "block";
    this.darkOverlay.nativeElement.style.display = "block";
  }

  hideRegisterForm() {
    this.registerForm.nativeElement.style.display = "none";
    this.darkOverlay.nativeElement.style.display = "none";
  }

  createStars() {
    const starCount = 100; // Number of stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.position = 'absolute';
      star.style.width = '7px';
      star.style.height = '7px';
      star.style.background = 'var(--color-principal)';
      star.style.borderRadius = '50%';
      star.style.animation = 'twinkle 2s infinite, move-diagonal 5s linear infinite';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      if (this.starContainer) {
        this.starContainer.nativeElement.appendChild(star);
      }
    }
     const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
      @keyframes twinkle {
        0%, 100% {
          opacity: 0.5;
        }
        50% {
          opacity: 1;
        }
      }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
      @keyframes move-diagonal {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(100px, 100px);
        }
      }
    `, styleSheet.cssRules.length);
  }
}
