var ipc = require('node-ipc');

ipc.config.id   = 'world';
ipc.config.retry= 1500;

var nodes = {}

ipc.serve(
	function(){
		ipc.server.on(
			'message',
			function(data, socket){
				ipc.log('got a message : '.debug, Object.keys(data));
                    //ipc.log('got all required events, telling evryone how muchg I am loved!');
                    ipc.server.broadcast(
                        'message',
                        {
                            id      : ipc.config.id,
                            message : data//'Everybody Loves The World! Got messages from hello and goodbye!'
                        }
                    );
				/*ipc.server.emit(
					socket,
					'message',
					data
				);*/
			}
		);
		ipc.server.on(
			'connect',
			(data, socket) => {
				//nodes
				console.log('connect', Object.keys(data), data.readable);
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
