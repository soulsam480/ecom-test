import firebase from "firebase";
const react = (store) => {
  store.subscribe((mutation, state) => {
    if (state.user.data !== null) {
      var main = state.user.data;
      if (mutation.type === "addToWishlist") {
        firebase
          .database()
          .ref(`/Users/${main.userId}`)
          .set({
            wishlist: state.user.wishlist,
            cart: state.cart,
          })
          .catch((err) => {
            window.alert(err);
          });
      } else if (mutation.type === "removeFromWishlist") {
        firebase
          .database()
          .ref(`/Users/${main.userId}`)
          .set({
            wishlist: state.user.wishlist,
            cart: state.cart,
          })
          .catch((err) => {
            window.alert(err);
          });
      } else if (mutation.type === "addToCart") {
        firebase
          .database()
          .ref(`/Users/${main.userId}`)
          .set({
            wishlist: state.user.wishlist,
            cart: state.cart,
          })
          .catch((err) => {
            window.alert(err);
          });
      } else if (mutation.type === "removeAllFromCart") {
        firebase
          .database()
          .ref(`/Users/${main.userId}`)
          .set({
            wishlist: state.user.wishlist,
            cart: state.cart,
          })
          .catch((err) => {
            window.alert(err);
          });
      }
    }
  });
};
export default react;
