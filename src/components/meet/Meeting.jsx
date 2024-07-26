import React, { useEffect, useRef, useState } from 'react';
import { Button, Box, Typography, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import { useSelector } from 'react-redux';

const Meeting = () => {
  const userEmail = useSelector(state => state.auth.user?.email);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const pc = useRef(null);

  useEffect(() => {
    const initMedia = async () => {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localVideoRef.current.srcObject = localStream.current;

        // Here you can add your WebRTC setup code
        // For simplicity, this example does not include signaling server setup

        pc.current = new RTCPeerConnection();
        pc.current.ontrack = (event) => {
          if (remoteStream.current) {
            remoteStream.current.addTrack(event.track);
          } else {
            remoteStream.current = new MediaStream([event.track]);
            remoteVideoRef.current.srcObject = remoteStream.current;
          }
        };

        localStream.current.getTracks().forEach((track) => {
          pc.current.addTrack(track, localStream.current);
        });

        // Handle ice candidates, signaling, etc.
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    initMedia();

    return () => {
      localStream.current?.getTracks().forEach((track) => track.stop());
      pc.current?.close();
    };
  }, []);

  const toggleMic = () => {
    const audioTrack = localStream.current.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMicOn(audioTrack.enabled);
  };

  const toggleCam = () => {
    const videoTrack = localStream.current.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsCamOn(videoTrack.enabled);
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screenStream.getVideoTracks()[0];
      pc.current.getSenders().forEach((sender) => {
        if (sender.track.kind === 'video') {
          sender.replaceTrack(screenTrack);
        }
      });

      screenTrack.onended = () => {
        pc.current.getSenders().forEach((sender) => {
          if (sender.track.kind === 'video') {
            sender.replaceTrack(localStream.current.getVideoTracks()[0]);
          }
        });
        setIsScreenSharing(false);
      };

      setIsScreenSharing(true);
    } else {
      pc.current.getSenders().forEach((sender) => {
        if (sender.track.kind === 'video') {
          sender.replaceTrack(localStream.current.getVideoTracks()[0]);
        }
      });
      setIsScreenSharing(false);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#333', color: '#fff', height: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Meeting
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <IconButton color="primary" onClick={toggleMic}>
          {isMicOn ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        <IconButton color="primary" onClick={toggleCam}>
          {isCamOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <IconButton color="primary" onClick={toggleScreenShare}>
          {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          style={{ width: '45%', border: '1px solid #fff' }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          style={{ width: '45%', border: '1px solid #fff' }}
        />
      </Box>
    </Box>
  );
};

export default Meeting;
