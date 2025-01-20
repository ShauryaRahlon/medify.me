import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://medify-me-1.onrender.com");

function Connect() {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [remoteEmailId, setRemoteEmailId] = useState<string>("");

  useEffect(() => {
    // Event: Joined Room
    socket.on("joined-room", ({ roomId }: { roomId: string }) => {
      console.log("Joined room:", roomId);
    });

    // Event: Incoming Call
    socket.on(
      "incoming-call",
      async ({
        from,
        offer,
      }: {
        from: string;
        offer: RTCSessionDescriptionInit;
      }) => {
        console.log("Incoming call from:", from);
        const pc = createPeerConnection(from);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("call-accepted", { emailId: from, answer });
      }
    );

    // Event: Call Accepted
    socket.on(
      "call-accepted",
      async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
        if (peerConnection) {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        }
      }
    );

    // Event: ICE Candidate
    socket.on(
      "ice-candidate",
      ({ candidate }: { candidate: RTCIceCandidateInit }) => {
        if (peerConnection) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      }
    );

    // Cleanup on component unmount
    return () => {
      socket.off("joined-room");
      socket.off("incoming-call");
      socket.off("call-accepted");
      socket.off("ice-candidate");
    };
  }, [peerConnection]);

  const createPeerConnection = (remoteEmailId: string): RTCPeerConnection => {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          emailId: remoteEmailId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    setPeerConnection(pc);
    return pc;
  };

  const handleJoinRoom = (): void => {
    if (!emailId || !roomId) {
      alert("Please enter email and room ID");
      return;
    }
    socket.emit("join-room", { emailId, roomId });
  };

  const startCall = async (): Promise<void> => {
    if (!remoteEmailId) {
      alert("Please enter the email of the person you want to call");
      return;
    }
    const pc = createPeerConnection(remoteEmailId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("call-user", { emailId: remoteEmailId, offer });
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setLocalStream(stream);
      })
      .catch((err) => console.error("Error accessing media devices:", err));
  }, []);

  return (
    <div>
      <div>
        <input
          type="email"
          placeholder="Your Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div>
        <input
          type="email"
          placeholder="Email to Call"
          value={remoteEmailId}
          onChange={(e) => setRemoteEmailId(e.target.value)}
        />
        <button onClick={startCall}>Start Call</button>
      </div>
      <div>
        <video ref={localVideoRef} autoPlay muted style={{ width: "45%" }} />
        <video ref={remoteVideoRef} autoPlay style={{ width: "45%" }} />
      </div>
    </div>
  );
}

export default Connect;
