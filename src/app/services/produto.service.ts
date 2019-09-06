import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json;charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) {}

  private URL_SERVER = 'http://localhost:3000';

  insertProduto(produto: Produto) {
    return this.http.post(`${this.URL_SERVER}/produto`, produto, httpOptions);
  }
  
  selectProdutos() {
    return this.http.get<Produto[]>(`${this.URL_SERVER}/produto`, httpOptions);
  }
  
  selectProduto(id: number) {
    return this.http.get<Produto>(`${this.URL_SERVER}/produto/${id}`, httpOptions);
  }

  updateProduto(produto: Produto) {
    return this.http.put(`${this.URL_SERVER}/produto/${produto.id}`, produto, httpOptions);
  }

  deleteProduto(id: number) {
    return this.http.delete(`${this.URL_SERVER}/produto/${id}`, httpOptions);
  }
}
