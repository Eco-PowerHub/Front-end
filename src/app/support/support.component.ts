import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";


@Component({
  selector: 'app-support',
  standalone: true, // أضيفي السطر ده لو مش موجود
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}