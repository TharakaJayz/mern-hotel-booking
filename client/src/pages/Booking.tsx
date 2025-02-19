import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useAppSeleter } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummery from "../components/BookingDetailSummery";

const Booking = () => {
  const search = useAppSeleter((state) => state.search);
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  console.log("nn", numberOfNights);
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const diff = search.checkOut.getTime() - search.checkIn.getTime();
      setNumberOfNights(diff / (1000 * 60 * 60 * 24));
    }
  }, []);
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

  if(!hotel) return <div>Loading...</div>

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
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
