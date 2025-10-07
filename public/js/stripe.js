
export const bookTour = async (tourId) => {
  try {
    const response = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
    const data  = await response.json();
    console.log('Stripe response data:', data);

    if (data.status !== 'success') {
      throw new Error('Checkout session not created');
    }

    const stripeSession = data.session; // <- this is the actual session object
    console.log('Stripe session id:', stripeSession.id);
    console.log('Redirecting to checkout URL:', stripeSession.url);

    // Manual redirect to Stripe Checkout
    window.location.href = stripeSession.url;

  } catch (err) {
    console.error('Booking error:', err);
    alert('Error booking tour: ' + err.message);
  }
};