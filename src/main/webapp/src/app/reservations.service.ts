import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "./models/room.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReserveRoomRequest} from "./models/reserve-room-request.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  // private baseUrl: string = 'http://localhost:8080';
  private baseUrl: string = 'fullStack';
  private getUrl: string = this.baseUrl + '/room/reservation/v1/';
  private postUrl: string = this.baseUrl + '/room/reservation/v1';

  constructor(protected httpClient: HttpClient) {
  }

  public getAll(currentCheckInVal: string, currentCheckOutVal: string): Observable<Array<Room>> {
    return this.httpClient.get<Array<Room>>(this.getUrl + '?checkin=' + currentCheckInVal + '&checkout=' + currentCheckOutVal)
      .pipe(map((response: any) => response["content"] as Array<Room>));
  }

  public create(model: ReserveRoomRequest): Observable<ReserveRoomRequest> {
    // console.log(model);
    let hdrs = new HttpHeaders({'Content-Type': 'application/json'});
    // console.log(hdrs);
    return this.httpClient.post<ReserveRoomRequest>(this.postUrl, model, {headers: hdrs});
  }
}
