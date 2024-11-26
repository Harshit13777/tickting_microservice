import nats,{Stan} from 'node-nats-streaming'


class NatsWrapper{
    private _client?: Stan;

    client(){
        if(!this._client){
            throw new Error('Cannot access NATS client before connecting')
        }
        return this._client;
    }

    connect(ClusterId:string,clientId:string,url:string){
        this._client= nats.connect(ClusterId,clientId,{url});

       
        return new Promise<void>((resolve,reject)=>{
            this.client().on('connect',()=>{
                console.log('connected to NATS')
                resolve()
            })
            this.client().on('error',(err)=>{
                reject(err)
            })
        })
    }
}

export const natsWrapper = new NatsWrapper()