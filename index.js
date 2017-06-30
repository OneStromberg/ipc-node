var ipc = require('node-ipc');

ipc.config.id   = 'world';
ipc.config.retry= 1500;

const message = (type, payload = null) => {
    return {
        node: ipc.config.id,
        type: type,
        payload: payload
    }
}
ipc.serve(
	function(){
		ipc.server.on(
			'message',
			function(data, socket){
				ipc.log('got a message : '.debug, Object.keys(data));
				//ipc.log('got all required events, telling evryone how muchg I am loved!');
				ipc.server.broadcast(
					'message',
					data
				);
			}
		);
		ipc.server.on(
			'socket.disconnected',
			function(socket, destroyedSocketID) {
				ipc.log('client ' + destroyedSocketID + ' has disconnected!');
			}
		);
	}
);

ipc.server.start();
