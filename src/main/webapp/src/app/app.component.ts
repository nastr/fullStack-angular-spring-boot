import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {ReservationsService} from "./reservations.service";
import {Room} from "./models/room.model";
import {ReserveRoomRequest} from "./models/reserve-room-request.model";
import {RoomSearch} from "./models/room-search.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private service: ReservationsService) {
  }

  // public submitted: boolean;
  roomSearch: FormGroup;
  rooms: Array<Room>;
  // request: ReserveRoomRequest;
  currentCheckInVal: string;
  currentCheckOutVal: string;

  ngOnInit() {
    this.roomSearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });

    const roomSearchValueChanges$ = this.roomSearch.valueChanges;

    // subscribe to the stream
    roomSearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });
  }

  onSubmit({value, valid}: { value: RoomSearch, valid: boolean }) {
    this.service.getAll(value.checkin, value.checkout)
      .subscribe(
        rooms => this.rooms = rooms,
        err => {
          console.log(err);
        });
  }

  reserveRoom(value: string) {
    const request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
    this.service.create(request).subscribe(res => console.log(res));
  }
}
