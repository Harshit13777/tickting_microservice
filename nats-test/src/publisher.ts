import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('tickting', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');
  const Publisher=  new TicketCreatedPublisher(stan)

  const data = {
    id: '123',
    title: 'concert',
    price: 20,
  }
  try {
    await Publisher.publish(data)

  } catch (error:any) {
    console.error(error)
  }

});