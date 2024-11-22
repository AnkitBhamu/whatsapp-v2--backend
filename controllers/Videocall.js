function sendVideoOffer(offer, connections_live) {
  let recv_socket = connections_live.get(offer.receiver);
  if (recv_socket) {
    console.log("video offer is : ", offer);
    recv_socket.emit("video-offer", offer);
    // console.log("Video offer sent!!");
  } else {
    // console.log("Video offer not sent! User is offline");
  }
}

function sendVideoAnswer(answer, connections_live) {
  let recv_socket = connections_live.get(answer.caller);
  if (recv_socket) {
    recv_socket.emit("video-answer", answer);
    // console.log("Video answer sent!!");
  } else {
    // console.log("Video answer not sent! User is offline");
  }
}

function sendIceCandidates(candidate, connections_live) {
  let recv_socket = connections_live.get(candidate.receiver);
  if (recv_socket) {
    recv_socket.emit("ice-candidate", candidate);
    // console.log("candidate came is : ", candidate);
    // console.log("Ice candidate sent!!");
  } else {
    console.log("Ice candidate  not sent! User is offline");
  }
}

module.exports = { sendVideoOffer, sendVideoAnswer, sendIceCandidates };
