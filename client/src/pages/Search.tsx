import { useQuery } from "react-query";
import { useAppSeleter } from "../hooks/hooks";
import { RootState } from "../store/store";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacilityFilter from "../components/HotelFacilityFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const searchData = useAppSeleter((state: RootState) => state.search);
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes,setSelectedHotelTypes] = useState<string[]>([])
  const [selectedHotelFacilities,setSelectedHotelFacilities] = useState<string[]>([])
  const [maxSelectedPrice,setMaxSecetedPrice] = useState<number | undefined>();
  const [sortOption,setSortOption] = useState<string>("")
  const searchParams = {
    destination: searchData.destination,
    checkIn: searchData.checkIn.toISOString(),
    checkOut: searchData.checkOut.toISOString(),
    adultCount: searchData.adultCount.toString(),
    childCount: searchData.adultCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types:selectedHotelTypes,
    facilities:selectedHotelFacilities,
    maxPrice:maxSelectedPrice?.toString(),
    sortOptions:sortOption 
  };
  const { data: hotelData } = useQuery(["SearchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  // ["SearchHotels",searchParams] because of this if we got same data set twise then previos data will be chached !!
  // also if searchParams value CHANGED then the query will re run
  console.log("search Data", searchData);
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;
    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotelType) => hotelType !== hotelType)
    );
  };
  const handleHotelFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelFacility = event.target.value;
    setSelectedHotelFacilities((prevHotelFacilities) =>
      event.target.checked
        ? [...prevHotelFacilities, hotelFacility]
        : prevHotelFacilities.filter((hotelFacility) => hotelFacility !== hotelFacility)
    );
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {/*  grid-cols-[250px_1fr] ==>> left column will get 250px and other will get the other space */}
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter   selectedHotelTypes={selectedHotelTypes}  onChange={handleHotelTypeChange} />

          <HotelFacilityFilter  selectedHotelFacilities={selectedHotelFacilities} onChange={handleHotelFacilityChange} />

          <PriceFilter  selectedPrice={maxSelectedPrice} onChange={(value?:number)=>setMaxSecetedPrice(value)} />
        </div>
      </div>
      <div className="flex flex-col gap-5 ">
        <div className="flex justify-between items-center ">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {searchData.destination ? ` in ${searchData.destination}` : ""}
          </span>
          <select name="" id="" value={sortOption} onChange={(event)=> setSortOption(event.target.value)} className="p-2 rounded-md">
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
          
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(pageNumber) => {
              setPage(pageNumber);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
