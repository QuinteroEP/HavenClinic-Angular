import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements AfterViewInit{
    userType: string = '';

    constructor(private route: ActivatedRoute,  private cdr: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
      this.route.queryParams.subscribe(params => {
        this.userType = params['userType'];
        this.cdr.detectChanges(); // para deteccion de cambios
        console.log(this.userType);
      });

    }

}
