import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { jwtVerify } from '../utils/crypt.util';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class RealTimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor() { }

    async handleConnection(@ConnectedSocket() client: any) {
        try {
            const token = client.handshake.query.token;
            const decoded = jwtVerify(token);
            client.user = decoded; // Save the decoded user info
            console.log(`Client ${client.id} connected`);
        } catch (error) {
            client.disconnect();
            console.log(`Client ${client.id} failed to authenticate`);
        }
    }

    handleDisconnect(@ConnectedSocket() client: any) {
        console.log(`Client ${client.id} disconnected`);
    }

    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() message: string): string {
        // Broadcast message to all clients
        return message;
    }
}
