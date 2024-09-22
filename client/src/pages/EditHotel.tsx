import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { ManageHotelForm } from "../forms/manageHotelForm/ManageHotelForm";
import { useAppDispatch } from "../hooks/hooks";
import { toastActions } from "../store/Toast-slice";

const EditHotel = () => {
  const { hotelId } = useParams();
  const dispatch = useAppDispatch();

  const { data: hotel } = useQuery("fetchMyHotelById", () =>
    apiClient.fetchMyHotelById(hotelId!),{
        enabled:!!hotelId   // query will run onlly if enable filed has true value 
    }
  );

  const {mutate,isLoading} = useMutation(apiClient.updateMyHotelById,{
    onSuccess:()=>{
        dispatch(toastActions.add({ message: "Hotel Saved !", type: "SUCCESS" }));
    },
    onError:()=>{
        dispatch(toastActions.add({ message: "Error Saving Hotel !", type: "ERROR" }));
    }
  })

  const handleSave = (hotelFormData:FormData)=>{
    mutate(hotelFormData);
  }
  return <ManageHotelForm hotel = {hotel} onSave={handleSave} isLoading = {isLoading} />;
};

export default EditHotel;
