
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dropdown-list',
  imports: [RouterLink],
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css']
})
export class DropdownListComponent {

  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    console.log("حالة القائمة:", this.menuOpen);
  }
  
}

