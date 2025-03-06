import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isOpen = false;
  isProductSubMenuOpen = false;
  isCategorySubMenuOpen = false;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  toggleProductSubMenu() {
    this.isProductSubMenuOpen = !this.isProductSubMenuOpen;
  }

  toggleCategorySubMenu() {
    this.isCategorySubMenuOpen = !this.isCategorySubMenuOpen;
  }
}
