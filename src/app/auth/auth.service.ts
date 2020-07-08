import { Injectable } from '@angular/core'
import { Subject, BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

import { User } from '../models/user.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false
  private token: string
  private tokenTimer: any
  private userId$ = new BehaviorSubject<string>('')
  private userName$ = new BehaviorSubject<string>('')
  private authStatus$ = new Subject<boolean>()
  private authErr$ = new Subject<string>()

  constructor (
    private http: HttpClient,
    private router: Router
  ) { }

  getToken () {
    return this.token
  }

  getIsAuth () {
    return this.isAuthenticated
  }

  getUserId () {
    return this.userId$.asObservable()
  }

  getName () {
    return this.userName$.asObservable()
  }

  getAuthStatus$ () {
    return this.authStatus$.asObservable()
  }

  getAuthErr$ () {
    return this.authErr$.asObservable()
  }

  createUser (newUser: User) {
    this.http.post(`${environment.apiUrl}/auth/register`, { ...newUser })
      .subscribe(
        (data) => {
          this.login(newUser.email, newUser.password)
          this.router.navigate(['/'])
        },
        ({ error }) => {
          console.log(error)
          if (error.message) {
            this.authErr$.next(error.message)
          }
          this.authStatus$.next(false)
        }
      )
  }

  login (email: string, password: string) {
    this.http
      .post<{ token: string; expiresIn: number; userId: string, name: string }>(
        `${environment.apiUrl}/auth/login`,
        { email, password }
      )
      .subscribe(
        response => {
          const { token, expiresIn, userId, name } = response

          if (token) {
            this.setAuthTimer(expiresIn)
            this.isAuthenticated = true
            this.authStatus$.next(true)
            this.userId$.next(userId)
            this.userName$.next(name)
            const now = new Date()
            const expirationDate = new Date(
              now.getTime() + expiresIn * 1000
            )
            this.saveAuthData(token, expirationDate, userId, name)
            this.router.navigate(['/'])
          }
        },
        ({ error }) => {
          console.log(error.message)
          this.authErr$.next(error.message)
          this.authStatus$.next(false)
        }
      )
  }
  // When the app loads, this will automatically login the user
  // if the token has yet to expire
  autoAuthUser () {
    const authInfo = this.getAuthData()

    if (!authInfo) return

    const now = new Date()
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime()

    if (expiresIn > 0) {
      this.token = authInfo.token
      this.isAuthenticated = true
      this.userId$.next(authInfo.userId)
      this.userName$.next(authInfo.name)
      this.setAuthTimer(expiresIn / 1000)
      this.authStatus$.next(true)
    }
  }

  logout () {
    this.token = null
    this.isAuthenticated = false
    this.userId$.next(null)
    this.userName$.next(null)
    this.authStatus$.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/'])
  }

  // Will auto logout when timer expires
  private setAuthTimer (duration: number) {
    this.tokenTimer = setTimeout(() => this.logout(), duration * 1000)
  }

  private saveAuthData (token: string, expirateDate: Date, userId: string, name: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirateDate.toISOString())
    localStorage.setItem('userId', userId)
    localStorage.setItem('name', name)
  }

  private clearAuthData () {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
    localStorage.removeItem('name')
  }

  private getAuthData () {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    const userId = localStorage.getItem('userId')
    const name = localStorage.getItem('name')

    if (!token || !expirationDate) {
      return
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
      name
    }
  }
}
