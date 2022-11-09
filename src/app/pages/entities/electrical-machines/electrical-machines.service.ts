import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api/api.service';
import { createRequestOption } from '../../../shared';
import { ElectricalMachines } from './electrical-machines.model';

@Injectable({ providedIn: 'root' })
export class ElectricalMachinesService {
  private resourceUrl = ApiService.API_URL + '/electrical-machines';

  constructor(protected http: HttpClient) {}

  create(electricalMachines: ElectricalMachines): Observable<HttpResponse<ElectricalMachines>> {
    return this.http.post<ElectricalMachines>(this.resourceUrl, electricalMachines, { observe: 'response' });
  }

  update(electricalMachines: ElectricalMachines): Observable<HttpResponse<ElectricalMachines>> {
    return this.http.put(`${this.resourceUrl}/${electricalMachines.id}`, electricalMachines, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<ElectricalMachines>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<ElectricalMachines[]>> {
    const options = createRequestOption(req);
    return this.http.get<ElectricalMachines[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
