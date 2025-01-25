import { Component } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "frontend-candidate";

  constructor(private router: Router) {
    // Subscribe to navigation events to manage focus for accessibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const mainContent = document.querySelector('[role="main"]');
        if (mainContent) {
          // Move focus to the main content area for screen reader users
          (mainContent as HTMLElement).focus();
        }
      }
    });
  }
}
