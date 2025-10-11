const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const username = prompt("What's your name?");
  socket.emit('new_user', username, (data) => {
    // socket으로 통신된 함수의 return값을 불러올 수 있음
    console.log(data);
  });
  // callback함수로 emit된 데이터를 받을 수 있음
  socket.on('hello_user', (data) => {
    console.log(data);
  });
}

function init() {
  helloUser();
}

init();
