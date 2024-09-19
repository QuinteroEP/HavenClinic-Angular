import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

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

  ngAfterViewInit() {
    console.log("Script loaded");

    const botonLogin = document.getElementById("LogIn");
    const botonCancelLogin = document.getElementById("cancel");
    const botonSignUp = document.getElementById("SignUp");
    const botonCancelRegister = document.getElementById("cancelRegister");

    botonLogin?.addEventListener("click", this.loginPopUp.bind(this));
    botonCancelLogin?.addEventListener("click", this.closePopUp.bind(this));
    botonSignUp?.addEventListener("click", this.showRegisterForm.bind(this));
    botonCancelRegister?.addEventListener("click", this.hideRegisterForm.bind(this));

    this.createStars();
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
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      this.starContainer.nativeElement.appendChild(star);
    }
  }
}
