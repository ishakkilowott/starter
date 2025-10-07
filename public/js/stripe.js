import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51SFBlXJdNrxJivljckhLsVJR3uxT79pr11z5KNBJsOHhEDi1BlgdnKGG1YHejshIo5wEyhIs4qJfMvO4MDxHasXX00AcOBjehu');

export const bookTour = async (tourId) => {
  try {
    const response = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
    const session = await response.json();
    console.log(session);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    alert('Error booking tour');
  }
};
