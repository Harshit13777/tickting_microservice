import {Publisher,Subjects, TicketUpdatedEvent} from "@rameticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated= Subjects.TicketUpdated;

}

