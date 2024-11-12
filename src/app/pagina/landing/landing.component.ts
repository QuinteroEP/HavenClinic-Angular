import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/servicio/cliente.service';
import { VeterinarioService } from 'src/app/servicio/veterinario.service';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('InicioSesionForm', { static: false }) loginForm!: NgForm;
  @ViewChild('registerForm') registerForm!: ElementRef;
  @ViewChild('starContainer') starContainer!: ElementRef;
  @ViewChild('LogIn') botonLogin!: ElementRef;
  @ViewChild('cancel') botonCancelLogin!: ElementRef;
  @ViewChild('SignUp') botonSignUp!: ElementRef;
  @ViewChild('cancelRegister') botonCancelRegister!: ElementRef;
  @ViewChild('checkBox') checkBox!: ElementRef;
  @ViewChild('checkBox2') checkBox2!: ElementRef;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private veterinarioService: VeterinarioService
  ) { }

  private darkOverlay: HTMLElement | null = null;
  public correoUsuario: string | null = null;

  // Modelo login
  formUser: User = {
    correo: '',
    password: '',
  };

  ngAfterViewInit() {
    console.log("Script loaded");

    this.darkOverlay = document.querySelector(".darker");

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

  onSubmit(): void {
    const isVeterinario = this.checkBox.nativeElement.checked;
    const isAdmin = this.checkBox2.nativeElement.checked;
    const userType = isVeterinario ? 'veterinario' : isAdmin ? 'admin' : 'cliente';

    this.clienteService.login(this.formUser, userType).subscribe(
      (token) => {
        console.log('Token:', token);
        localStorage.setItem('token', String(token)); // Almacena el token en localStorage
        if (userType === 'cliente') {
          this.router.navigate(['/main-menu'], { queryParams: { userType, correo: this.formUser.correo } });
        } else if (userType === 'veterinario') {
          this.router.navigate(['/main-menu'], { queryParams: { userType, correo: this.formUser.correo } });
        } else  {
          this.router.navigate(['/admin'], { queryParams: { userType, correo: this.formUser.correo } });
        }
        this.closePopUp(); // Close the pop-up after succ essful login
      },
      (error) => {
        console.error('Error during login:', error);
        alert('Credenciales inválidas, vuelva a intentar');
      }
    );
  }

  onCheckboxChange(event: Event, checkboxType: string): void {
    if (checkboxType === 'veterinario') {
      this.checkBox2.nativeElement.checked = false;
    } else if (checkboxType === 'administrador') {
      this.checkBox.nativeElement.checked = false;
    }
  }

  loginPopUp() {
    console.log("Log in");
    this.loginForm.control.reset(); // Reset the form
    this.loginForm.control.markAsPristine(); // Mark the form as pristine
    this.loginForm.control.markAsUntouched(); // Mark the form as untouched
    document.getElementById('loginForm')!.style.display = "block";
    if (this.darkOverlay) {
      this.darkOverlay.style.display = "block";
    }
  }

  closePopUp() {
    console.log("cancel");
    document.getElementById('loginForm')!.style.display = "none";
    if (this.darkOverlay) {
      this.darkOverlay.style.display = "none";
    }
  }

  showRegisterForm() {
    console.log("Show register form");
    this.registerForm.nativeElement.style.display = "block";
    if (this.darkOverlay) {
      this.darkOverlay.style.display = "block";
    }
  }

  hideRegisterForm() {
    this.registerForm.nativeElement.style.display = "none";
    if (this.darkOverlay) {
      this.darkOverlay.style.display = "none";
    }
  }

  handleCancel() {
    window.location.href = '/';
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

    const styleElement = document.createElement('style');
    styleElement.textContent = `
    @keyframes twinkle {
      0%, 100% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
    }
    @keyframes move-diagonal {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(100px, 100px);
      }
    }
  `;
    document.head.appendChild(styleElement);
  }
}