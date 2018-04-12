import { Component, OnInit, Input } from '@angular/core';
import { IRoleMember } from '../../models/IRoleMember'
import { ReservationService } from '../../services/reservation.service'
import { MembersService } from '../members.service'

@Component({
	selector: 'app-members-table',
	templateUrl: './members-table.component.html',
	styleUrls: ['./members-table.component.css'],
	providers: [ReservationService, MembersService]
})
export class MembersTableComponent implements OnInit {

	@Input() members: IRoleMember[] = [];
	@Input() member: IRoleMember;

	constructor(
		private reservationService: ReservationService,
		private membersService: MembersService
	) {

	}

	ngOnInit() {
		this.reservationService.getMembers().subscribe(
			allCrewMembers => this.members = allCrewMembers,
			error => console.log("error: " + error),
			() => {
			}
		)

		console.log(this.members);
	}

}