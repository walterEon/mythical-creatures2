import { forwardRef, useImperativeHandle } from 'react';
import success from './success.mp3';
import button from './button.mp3';
import deleteSound from './delete.mp3';

// import login from './login.mp3';
// import logout from './logout.mp3';
// import popup from './popup.mp3';
// import cart from './cart.mp3';
// import navigation from './navigation.mp3';
// import addToCart from './addToCart.mp3';

const SoundPlayer = forwardRef((props, ref) => {
  const sounds = {
    successSound: success,
    buttonSound: button,
    deleteSound: deleteSound,
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
