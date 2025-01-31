import { Component, computed, Inject, Signal } from '@angular/core'
import { AccountService } from '../_services/account.services'
import { User } from '../_models/user'
import { MemberComponent } from '../member/member.component'

@Component({
  selector: 'app-home',
  imports: [MemberComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private accountService = Inject(AccountService)
  user: Signal<User | undefined>

  constructor() {
    this.user = computed(() => this.accountService.data().user)
  }

}
