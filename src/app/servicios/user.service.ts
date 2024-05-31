import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    // Crear cabecera con el token de autorización y el tipo de contenido aceptado
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTIxYzZlNjg5YTQ2YzUzNDEwYzEzYWQxMDVmYWQ5NCIsInN1YiI6IjY2NTkwYTFmY2QyMmYyZjkyZTc0ZWVlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e7D6n5B4IcoRpgMl2NzUApYxzhxbOsjLUdAFEKamC0U',
      'Accept': 'application/json'
    });

    // Realizar la solicitud GET con la cabecera configurada
    return this.http.get(`${this.apiUrl}/discover/movie`, { headers: headers })
      .pipe(
        catchError(error => {
          // Manejar cualquier error de la solicitud
          console.error('Error fetching data:', error);
          return throwError(error);
        })
      );
  }


  getMovieById(movieId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTIxYzZlNjg5YTQ2YzUzNDEwYzEzYWQxMDVmYWQ5NCIsInN1YiI6IjY2NTkwYTFmY2QyMmYyZjkyZTc0ZWVlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e7D6n5B4IcoRpgMl2NzUApYxzhxbOsjLUdAFEKamC0U',
      'Accept': 'application/json'
    });

    return this.http.get(`${this.apiUrl}/movie/${movieId}?language=en-US`, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching movie by ID:', error);
          return throwError(error);
        })
      );




}
}
