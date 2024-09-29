import { forwardRef, useImperativeHandle } from 'react';

const SoundPlayer = forwardRef((props, ref) => {
  const sounds = {
    successSound: 'https://audios-mythical-creatures.s3.us-east-2.amazonaws.com/success.mp3',
    buttonSound: 'https://audios-mythical-creatures.s3.us-east-2.amazonaws.com/button.mp3',
    deleteSound: 'https://audios-mythical-creatures.s3.us-east-2.amazonaws.com/delete.mp3',
  };

  const playSound = (soundName) => {
    const audio = new Audio(sounds[soundName]);
    audio.play().catch(error => {
      console.log("Error al reproducir el sonido:", error);
    });
  };

  useImperativeHandle(ref, () => ({
    playSound
  }));

  return null; // This component doesn't render anything visible
});

export default SoundPlayer;
