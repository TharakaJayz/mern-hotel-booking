import React from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSeleter } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { searchActions } from "../../store/Search-slice";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  hotelId: string;
  pricePerNight: number;
}

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const searchData = useAppSeleter((state: RootState) => state.search);
  const isLoggedIn = useAppSeleter((state: RootState) => state.user.isLogged);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      adultCount: searchData.adultCount,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      childCount: searchData.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const navigation = useNavigate()
  const location = useLocation()
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
const dispatch = useAppDispatch();
  const onSignInClick = (data:GuestInfoFormData) =>{
    dispatch(searchActions.saveSearchValues({
      destination:"",
      checkIn:data.checkIn,
      checkOut:data.checkOut,
      adultCount:data.adultCount,
      childCount:data.childCount
    }))
    navigation("/sign-in",{state:{from:location}})
  }
  const onSubmit = (data:GuestInfoFormData) =>{
    dispatch(searchActions.saveSearchValues({
      destination:"",
      checkIn:data.checkIn,
      checkOut:data.checkOut,
      adultCount:data.adultCount,
      childCount:data.childCount
    }))
    navigation(`/hotel/${hotelId}/booking`)
  }


  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight} </h3>

      <form onSubmit={ isLoggedIn ? handleSubmit(onSubmit):handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            {" "}
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => {
                setValue("checkIn", date as Date);
              }}
              selectStart={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => {
                setValue("checkOut", date as Date);
              }}
              selectStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This file is required",
                  min: { value: 1, message: "There must be atleast one adult" },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={0}
                max={20}
                {...register("childCount", { valueAsNumber: true })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
