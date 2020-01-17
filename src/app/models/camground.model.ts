export interface Campground {
  title: string,
  description: string,
  properties: {
    id: number,
    imgUrl: string,
    loc: number[]
  }
}
