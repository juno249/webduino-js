'use strict';

var webduino = require('../..'),
  board,
  led;

board = new webduino.WebArduino('device_id');

// board = new webduino.Arduino({
//   'transport': 'serial',
//   'path': '/dev/cu.usbmodem1421'
// });

// board = new webduino.Arduino({
//   'transport': 'bluetooth',
//   'address': '30:14:09:30:15:67'
// });

board.on(webduino.BoardEvent.READY, function () {
  led = new webduino.module.Led(board, board.getDigitalPin(10));
  led.blink(50);

  setTimeout(function () {
    board.close();
  }, 5000);
});

board.on(webduino.BoardEvent.ERROR, function (err) {
  console.log(err);
});

board.on(webduino.BoardEvent.BEFORECLOSE, function () {
  console.log('before close');
});

board.on(webduino.BoardEvent.CLOSE, function () {
  console.log('close');
  // test: should not emit 'close' again
  board.close();
});
