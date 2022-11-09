import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api/api.service';
import { createRequestOption } from '../../../shared';
import { MechanicalMachines } from './mechanical-machines.model';

@Injectable({ providedIn: 'root' })
export class MechanicalMachinesService {
  private resourceUrl = ApiService.API_URL + '/mechanical-machines';

  constructor(protected http: HttpClient) {}

  create(mechanicalMachines: MechanicalMachines): Observable<HttpResponse<MechanicalMachines>> {
    return this.http.post<MechanicalMachines>(this.resourceUrl, mechanicalMachines, { observe: 'response' });
  }

  update(mechanicalMachines: MechanicalMachines): Observable<HttpResponse<MechanicalMachines>> {
    return this.http.put(`${this.resourceUrl}/${mechanicalMachines.id}`, mechanicalMachines, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<MechanicalMachines>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<MechanicalMachines[]>> {
    const options = createRequestOption(req);
    return this.http.get<MechanicalMachines[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
