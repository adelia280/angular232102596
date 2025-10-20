import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(private renderer:Renderer2) {
   this.renderer.addClass(document.body, "register-page");

    this.renderer.removeClass(document.body, "sidebar-mini");
    this.renderer.removeClass(document.body, "layout-fixed");

    this.renderer.setAttribute(document.body, "style", "mini-height: 464px;");
  }
}
