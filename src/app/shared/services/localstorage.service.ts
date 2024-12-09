import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {}
  }

  get(key: string): unknown {
    try {
      const fetchedItem = localStorage.getItem(key)
      return fetchedItem ? JSON.parse(fetchedItem) : null
    } catch (error) {
      return null
    }
  }
}
