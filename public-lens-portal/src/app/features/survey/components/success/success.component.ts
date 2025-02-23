import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: false,
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})

export class SuccessComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
