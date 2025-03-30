
import { Component } from '@angular/core';


@Component({
  selector: 'app-dropdown-list',
  imports: [],
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

