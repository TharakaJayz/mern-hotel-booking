import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../server/src/shared/types";
import { useAppDispatch, useAppSeleter } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import * as apiClient from "../../api-client";
import { useMutation, useQuery } from "react-query";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { toastActions } from "../../store/Toast-slice";
interface Props {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
}
export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const searchData = useAppSeleter((state: RootState) => state.search);
  const dispatch = useAppDispatch();
  const stripe = useStripe();

  const elements = useElements();
  const { hotelId } = useParams();
  // const [numberOfNights, setNumberOfNights] = useState<number>(0);

  // useEffect(() => {
  //   if (searchData.checkIn && searchData.checkOut) {
  //     const nights =
  //       Math.abs(searchData.checkOut.getTime() - searchData.checkIn.getTime()) /
  //       (1000 * 60 * 60 * 24); // converting to days
  //     setNumberOfNights(Math.ceil(nights));
  //   }
  // }, [searchData.checkIn, searchData.checkOut]);
  useQuery(
    "getHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      adultCount: searchData.adultCount,
      childCount: searchData.childCount,
      checkIn: searchData.checkIn.toISOString(),
      checkOut: searchData.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        dispatch(
          toastActions.add({ message: "Booking Saved!", type: "SUCCESS" })
        );
      },
      onError: (error: Error) => {
        dispatch(toastActions.add({ message: error.message, type: "ERROR" }));
      },
    }
  );

  const onSubmitForm = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          FirstName
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          LastName
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summery</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost:${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Include taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">
          Payment Details
          <CardElement
            id="payment-element"
            className="border rounded-md p-2 text-sm"
          />
        </h3>
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
          type="submit"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
