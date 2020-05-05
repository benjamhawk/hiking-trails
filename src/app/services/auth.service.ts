import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (private http: HttpClient) { }

  getUserDetails (email, password) {
    return this.http.post('/api/register', {
      email,
      password
    }).subscribe(data => {
      console.log(`${data} is what we got from the server`)
    })
  }

  registerUser (name, email, password, passwordConfirmation) {
    console.log(name, email, password, passwordConfirmation)
    return this.http.post('/api/register', {
      name,
      email,
      password,
      passwordConfirmation
    }).subscribe(data => {
      console.log(data)
    })
  }
}
