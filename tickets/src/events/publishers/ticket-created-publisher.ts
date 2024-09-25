import {Publisher,Subjects, TicketCreatedEvent} from "@rameticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated= Subjects.TicketCreated;

}

