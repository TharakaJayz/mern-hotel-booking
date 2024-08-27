import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="w-full px-3 py-5 bg-gray-300 flex flex-col md:flex-row justify-between gap-5">
        <label className="text-gray-700 text-sm font-bold w-[100%] md:w-[50%] md:max-w-[50%]">
          Adults
          <input
            className="border rounded w-full py-1 px-2 font-normal "
            {...register("adultCount", { required: "This field is required" })}
            type="number"
            min={1}
          />
          
        </label>
        <label className="text-gray-700 text-sm font-bold w-[100%] md:w-[50%]  md:max-w-[50%]">
          Children
          <input
            className="border rounded w-full py-1 px-2 font-normal "
            {...register("childCount", { required: "This field is required" })}
            type="number"
            min={1}
          />
        
        </label>
      </div>
      {errors.childCount && (
        <span className="text-red-500 text-sm font-bold">
          {errors.childCount.message}
        </span>
      )}
      {errors.adultCount && (
        <span className="text-red-500 text-sm font-bold">
          {errors.adultCount.message}
        </span>
      )}
    </div>
  );
};

export default GuestsSection;
