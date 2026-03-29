import { Subjects, Publisher, PaymentCreatedEvent } from '@rameticket/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
