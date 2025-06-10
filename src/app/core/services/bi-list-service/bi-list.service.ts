import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, ReplaySubject, throwError} from 'rxjs';
import {BiItem} from '../../models/posts/posts.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiListService {
  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  private items$ = new ReplaySubject<BiItem[]>();

  constructor() {
    this.loadItems();
  }

  private loadItems() {
    this.http.get<BiItem[]>(`${this.apiUrl}/posts`)
      .pipe(
        catchError(error => {
          console.error('Error loading items:', error);
          this.items$.error(error);
          return throwError(() => error);
        })
      )
      .subscribe(items => {
        this.items$.next(items);
      });
  }

  getPosts(): Observable<BiItem[]> {
    return this.items$.asObservable();
  }

}


const EXEMPLE_API_RESULT = [
  {
    "id": 8,
    "title": "Relatório de Vendas - Maio 2025",
    "description": "Resumo detalhado das vendas realizadas no mês de maio. aaa Resumo detalhado das vendas realizadas no mês de maio. aaa Resumo detalhado das vendas realizadas no mês de maio. aaa",
    "link": "https://powerbi.com/view?id=vendas-maio",
    "departmentId": 2,
    "imageUrl": "https://res.cloudinary.com/fgrinc/image/upload/v1712843466/PropostaDigital/24_054_08_CAPELA_FINAL_1_hv17ux.jpg",
    "tags": [
      {
        "id": 1,
        "name": "vendas"
      },
      {
        "id": 2,
        "name": "mensal"
      },
      {
        "id": 3,
        "name": "financeiro"
      }
    ],
    "department": {
      "id": 2,
      "name": "Tecnologia"
    }
  },
  {
    "id": 9,
    "title": "Controle de Suprimentos Q2",
    "description": "Painel de acompanhamento de estoque e suprimentos do segundo trimestre.",
    "link": "https://powerbi.com/view?id=suprimentos-q2",
    "departmentId": 2,
    "imageUrl": "https://res.cloudinary.com/fgrinc/image/upload/v1699463927/PropostaDigital/piscina-thumb.jpg",
    "tags": [
      {
        "id": 5,
        "name": "suprimentos"
      },
      {
        "id": 6,
        "name": "estoque"
      },
      {
        "id": 7,
        "name": "logística"
      }
    ],
    "department": {
      "id": 2,
      "name": "Tecnologia"
    }
  },
  {
    "id": 10,
    "title": "Indicadores Estratégicos 2025",
    "description": "Painel com os principais KPIs estratégicos da empresa para 2025.",
    "link": "https://powerbi.com/view?id=kpi-estrategia",
    "departmentId": 3,
    "imageUrl": "https://res.cloudinary.com/fgrinc/image/upload/v1712843465/PropostaDigital/24_054_01_PORTARIA_FINAL_1_ow0mun.jpg",
    "tags": [
      {
        "id": 8,
        "name": "kpi"
      },
      {
        "id": 9,
        "name": "estratégia"
      },
      {
        "id": 10,
        "name": "anual"
      }
    ],
    "department": {
      "id": 3,
      "name": "Financeiro"
    }
  },
  {
    "id": 11,
    "title": "Análise de Inadimplência",
    "description": "Relatório detalhado da inadimplência por cliente e região.",
    "link": "https://powerbi.com/view?id=inadimplencia",
    "departmentId": 4,
    "imageUrl": "https://res.cloudinary.com/fgrinc/image/upload/v1699452504/PropostaDigital/academia-thumb.png",
    "tags": [
      {
        "id": 3,
        "name": "financeiro"
      },
      {
        "id": 11,
        "name": "cobrança"
      },
      {
        "id": 12,
        "name": "inadimplência"
      }
    ],
    "department": {
      "id": 4,
      "name": "Patrimonio"
    }
  },
  {
    "id": 12,
    "title": "Obras em Andamento",
    "description": "Acompanhamento das obras em execução com previsão de entrega.",
    "link": "https://powerbi.com/view?id=obras",
    "departmentId": 5,
    "imageUrl": "https://res.cloudinary.com/fgrinc/image/upload/v1699463927/PropostaDigital/portaria-thumb.jpg",
    "tags": [
      {
        "id": 13,
        "name": "obras"
      },
      {
        "id": 14,
        "name": "projetos"
      },
      {
        "id": 15,
        "name": "cronograma"
      }
    ],
    "department": {
      "id": 5,
      "name": "Obras"
    }
  },
  {
    "id": 13,
    "title": "Indicadores de TI - Abril",
    "description": "Painel com SLA de atendimento, incidentes e disponibilidade de sistemas.",
    "link": "https://powerbi.com/view?id=ti-abril",
    "departmentId": 6,
    "imageUrl": "https://res.cloudinary.com/fgrinc/image/upload/v1685361943/PropostaDigital/thumbnail_01_JARDINS_ROMA_PORTARIA_01_FINAL_2_ulchgw.jpg",
    "tags": [
      {
        "id": 16,
        "name": "tecnologia"
      },
      {
        "id": 17,
        "name": "suporte"
      },
      {
        "id": 18,
        "name": "sistemas"
      }
    ],
    "department": {
      "id": 6,
      "name": "Comercial"
    }
  }
]
