import React, { useState } from "react";
import { useAppDispatch, useAppSeleter } from "../hooks/hooks";
import { RootState } from "../store/store";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchState = useAppSeleter((state: RootState) => state.search);

  const [destination, setDestination] = useState<string>(
    searchState.destination
  );
  const [checkIn, setCheckIn] = useState<Date>(searchState.checkIn);

  const [checkOut, setCheckOut] = useState<Date>(searchState.checkOut);

  const [adultCount, setAdultCount] = useState<number>(searchState.adultCount);

  const [childCount, setChildCount] = useState<number>(searchState.childCount);

  return <div></div>;
};

export default SearchBar;
