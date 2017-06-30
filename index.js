var ipc = require('node-ipc');

ipc.config.id   = 'world';
ipc.config.retry= 1500;

ipc.serve(
	function(){
		ipc.server.on(
			'message',
			function(data, socket){
				ipc.log('got a message : '.debug, data);
				ipc.server.emit(
					socket,
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
