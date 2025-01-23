import { Component, computed, inject, signal } from '@angular/core'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { AccountService } from '../_service/account.service'

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class headerComponent {
  private accountService = inject(AccountService)
  private router = inject(Router)
  user = computed(() => this.accountService.data()?.user)

  logout() { }
}
