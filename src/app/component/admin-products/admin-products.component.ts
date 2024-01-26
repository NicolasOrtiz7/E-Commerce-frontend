import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  ngOnInit(): void {
    this.inicializarSidebar();
  }

  inicializarSidebar() {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');

    if (sidebarCollapse && sidebar) {
      sidebarCollapse.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });
    }
  }

}
