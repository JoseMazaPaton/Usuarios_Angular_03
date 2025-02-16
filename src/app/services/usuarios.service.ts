import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  httpClient = inject(HttpClient);
  private apiUrl: string = 'https://peticiones.online/api/users'

  constructor() { }

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiUrl);
  }


  getById(_id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.apiUrl}/${_id}`);
  }
  getByIdPromise(_id: string): Promise<Usuario> {
    return lastValueFrom(this.httpClient.get<Usuario>(`${this.apiUrl}/${_id}`));
  }

  insert(usuario: Usuario): Promise<Usuario> {
    return lastValueFrom(this.httpClient.post<Usuario>(`${this.apiUrl}`, usuario));
  }

  update(usuario: Usuario): Promise<Usuario> {
    return lastValueFrom(this.httpClient.put<Usuario>((`${this.apiUrl}/${usuario._id}`), usuario));
  }

  delete(_id: string): Promise<Usuario> {
    return lastValueFrom(this.httpClient.delete<Usuario>(`${this.apiUrl}/${_id}`));
  }

}
