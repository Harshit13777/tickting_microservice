import { Subjects, Publisher, OrderCancelledEvent } from '@rameticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
