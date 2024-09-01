import { useMutation } from "react-query";
import { ManageHotelForm } from "../forms/manageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { toastActions } from "../store/Toast-slice";

export const AddHotel = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      dispatch(toastActions.add({ message: "Hotel Saved !", type: "SUCCESS" }));
    },

    onError: () => {
      dispatch(
        toastActions.add({ message: "Error Saving Hotel", type: "ERROR" })
      );
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    console.log("handleSave triggerd")
     mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};
