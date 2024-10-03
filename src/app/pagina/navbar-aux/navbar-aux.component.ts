import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar-aux',
  templateUrl: './navbar-aux.component.html',
  styleUrls: ['./navbar-aux.component.css']
})
export class NavbarAuxComponent {
  //userType: string = 'veterinario'; // variable para almacenar el tipo de usuario

  userType: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef ) {}

  navigateToMainMenu() {
    this.router.navigate(['/main-menu'], { queryParams: { userType: this.userType } });
  }

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      this.userType = params['userType'];
    });
  }
}
