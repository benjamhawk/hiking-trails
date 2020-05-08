import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Trail } from '../models/trail.model'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class TrailsService {
  private serverError$ = new Subject<string>()

  constructor (
    private http: HttpClient,
    private router: Router
  ) { }

  getErr () {
    return this.serverError$.asObservable()
  }

  createTrail (trail: Trail) {
    this.http.post('http://localhost:5000/trails', { ...trail })
      .subscribe(
        data => {
          this.router.navigate(['/campgrounds'])
        },
        ({ error }) => {
          console.log('error', error)
          this.serverError$.next(error.message)
        }
      )
  }
}
