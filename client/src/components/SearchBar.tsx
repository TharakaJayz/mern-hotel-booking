import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSeleter } from "../hooks/hooks";
import { RootState } from "../store/store";
import { searchActions } from "../store/Search-slice";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const searchState = useAppSeleter((state: RootState) => state.search);

  const [destination, setDestination] = useState<string>(
    searchState.destination
  );
  const [checkIn, setCheckIn] = useState<Date>(searchState.checkIn);

  const [checkOut, setCheckOut] = useState<Date>(searchState.checkOut);

  const [adultCount, setAdultCount] = useState<number>(searchState.adultCount || 1);

  const [childCount, setChildCount] = useState<number>(searchState.childCount || 0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      searchActions.saveSearchValues({
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
      })
    );
    navigation("/search")
  };

  const minDate = new Date()
  const maxDate = new Date()

  maxDate.setFullYear(maxDate.getFullYear()+1);  
  // max date is going to be 1 year from now

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="-mt-8 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 p-3"
      >
        <div className="flex flex-row items-center flex-1 bg-white p-2 ">
          <MdTravelExplore size={25} className="mr-2 " />
          <input
            placeholder="where are you going ?"
            className="text-md w-full focus:outline-none"
            value={destination}
            onChange={(t) => {
              setDestination(t.target.value);
            }}
          />
        </div>
        <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
                Adults:
                <input type="number" className="w-full p-1 focus:outline-none font-bold" min={1}  max={20} value={adultCount}  onChange={(event)=>{setAdultCount(parseInt(event.target.value))}} />
            </label>
            <label className="items-center flex">
                Children:
                <input type="number" className="w-full p-1 focus:outline-none font-bold" min={0}  max={20} value={childCount}  onChange={(event)=>{setChildCount(parseInt(event.target.value))}} />
            </label>
        </div>
        <div>
            <DatePicker  selected={checkIn}  onChange={(date)=>{setCheckIn(date as Date)}} selectStart = {checkIn}  endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-in Date" className="min-w-full bg-white p-2 focus:outline-none"  wrapperClassName = "min-w-full"/>
        </div>
        <div>
            <DatePicker  selected={checkOut}  onChange={(date)=>{setCheckOut(date as Date)}} selectStart = {checkIn}  endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-in Date" className="min-w-full bg-white p-2 focus:outline-none"
                wrapperClassName = "min-w-full"
                />
        </div>
        <div className="flex gap-1">
            <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500" name="Search">Search</button>
            <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">Clear</button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
