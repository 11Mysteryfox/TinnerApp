import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment.development'
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _key = 'account';
  private _baseApiUrl = environment.baseUrl + 'api/account/'
  private _http = inject(HttpClient)

  data = signal<{ user: User, token: string } | null>(null)

  constructor() {
    this.loadDataFromLocalStorage()
  }

  async login(loginData: { username: string, password: string }): Promise<string> {
    try {
      const url = this._baseApiUrl + 'login'
      const response = this._http.post<{ user: User, token: string }>(url, loginData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      return error.error?.message
    }
  }

  private saveDataToLocalStorage() {
    const jsonString = JSON.stringify(this.data)
    localStorage.setItem(this._key, jsonString)
  }

  private loadDataFromLocalStorage() {
    const jsonString = localStorage.getItem(this._key)
    if (jsonString) {
      const data = JSON.parse(jsonString)
      this.data.set(data)
    }
  }
