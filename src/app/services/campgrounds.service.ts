import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { defaultCampgroundsData } from '../../assets/defaultData/campgroundsData'
import { Campground } from '../models/camground.model'

@Injectable({
  providedIn: 'root'
})
export class CampgroundsService {
  private campgrounds: BehaviorSubject<Campground[]> = new BehaviorSubject(defaultCampgroundsData)

  getCampgrounds (): Observable<Campground[]> {
    return this.campgrounds.asObservable()
  }
}
