import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Trail } from '../models/trail.model'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class TrailsService {
  private serverError$ = new Subject<string>()
  private trails: Trail[] = []
  private trailsUpdated = new Subject<{ trails: Trail[]; trailCount: number }>()
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
          this.router.navigate(['/trails'])
        },
        ({ error }) => {
          console.log('error', error)
          this.serverError$.next(error.message)
        }
      )
  }

  updateTrail (id: string, trail: Trail) {
    return this.http.put(`http://localhost:5000/trails/${id}`, { ...trail })
  }

  getTrails (postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        `http://localhost:5000/trails${queryParams}`
      )
      .pipe(
        map(trailData => {
          return {
            trails: trailData.posts.map(trail => {
              return {
                name: trail.name,
                preview: trail.preview,
                description: trail.description,
                image: trail.image,
                location: trail.location,
                date: trail.date,
                id: trail._id
              }
            }),
            maxPosts: trailData.maxPosts
          }
        })
      )
      .subscribe(transformedData => {
        this.trails = transformedData.trails
        this.trailsUpdated.next({
          trails: [...this.trails],
          trailCount: transformedData.maxPosts
        })
      })
  }

  getTrail (id: string) {
    return this.http.get<Trail>(
      `http://localhost:5000/trails/${id}`
    )
  }

  getFetchedTrails () {
    return this.trailsUpdated.asObservable()
  }

  deleteTrail (id: string) {
    return this.http.delete(`http://localhost:5000/trails/${id}`)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/trails'])
      })
  }
}
