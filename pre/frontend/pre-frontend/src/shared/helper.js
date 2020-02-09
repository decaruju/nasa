export default {
getPosition(address) {
      return {
          lng: address.geometry.location.lng(),
          lat: address.geometry.location.lat(),
      };
  },
};