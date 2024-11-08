import { useMutation } from "react-query";
import { ManageHotelForm } from "../forms/manageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { toastActions } from "../store/Toast-slice";
import { useNavigate } from "react-router-dom";

export const AddHotel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate()
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      dispatch(toastActions.add({ message: "Hotel Saved !", type: "SUCCESS" }));
      navigation("/my-hotels");
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
