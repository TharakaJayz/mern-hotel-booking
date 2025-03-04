import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useAppSeleter } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummery from "../components/BookingDetailSummery";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";

const Booking = () => {
  const search = useAppSeleter((state) => state.search);
  const { stripePromise } = useAppSeleter((state) => state.payment);
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    stripePromise.then((stripeInstance: Stripe | null) => {
      setStripe(stripeInstance);
    });
  }, [stripePromise]);
  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );
  const { data: hotel } = useQuery(
    "getHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  console.log("hotel", hotel);
  const { data: currentUser } = useQuery(
    "fetchCurrectUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummery
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripe}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
