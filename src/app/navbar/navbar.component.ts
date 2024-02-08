import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpClient, public dataService: DataService) {}

  ngOnInit(): void {}

  get selectedValues() {
    return this.dataService.selectedValues;
  }
}
