import { forwardRef, useImperativeHandle } from 'react';

// import login from './login.mp3';
// import logout from './logout.mp3';
// import popup from './popup.mp3';
// import cart from './cart.mp3';
// import navigation from './navigation.mp3';
// import addToCart from './addToCart.mp3';

const SoundPlayer = forwardRef((props, ref) => {
  const sounds = {
    successSound: 'https://audios-mythical-creatures.s3.us-east-2.amazonaws.com/success.mp3',
    buttonSound: 'https://audios-mythical-creatures.s3.us-east-2.amazonaws.com/button.mp3',
    deleteSound: 'https://audios-mythical-creatures.s3.us-east-2.amazonaws.com/delete.mp3',
    // loginSound: login,
    // logoutSound: logout,
    // popupSound: popup,
    // cartSound: cart,
    // navigationSound: navigation,
    // addToCartSound: addToCart,
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
