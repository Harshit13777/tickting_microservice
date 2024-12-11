import { Publisher, OrderCreatedEvent, Subjects } from '@rameticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
