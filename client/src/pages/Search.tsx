import { useQuery } from 'react-query';
import { useAppSeleter } from '../hooks/hooks'
import { RootState } from '../store/store'
import * as apiClient from "../api-client";
import { useState } from 'react';
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';

const Search = () => {
    const searchData = useAppSeleter((state: RootState) => state.search);
    const [page,setPage] = useState<number>(1);
    const [selectedStars,setSelectedStars] = useState<string[]>([]);
    const searchParams = {
        destination:searchData.destination,
        checkIn:searchData.checkIn.toISOString(),
        checkOut:searchData.checkOut.toISOString(),
        adultCount:searchData.adultCount.toString(),
        childCount:searchData.adultCount.toString(),
        page:page.toString()
     
    };
    const {data:hotelData} = useQuery(["SearchHotels",searchParams], ()=> apiClient.searchHotels(searchParams));
    // ["SearchHotels",searchParams] because of this if we got same data set twise then previos data will be chached !!
    // also if searchParams value CHANGED then the query will re run
    console.log("search Data", searchData)
    const handleStarsChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const starRating = event.target.value;
         setSelectedStars((prevStars)=> event.target.checked ? [...prevStars,starRating] : prevStars.filter((star)=> star !== starRating))
    }
    return (
       
             
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
                {/*  grid-cols-[250px_1fr] ==>> left column will get 250px and other will get the other space */}
                <div className='rounded-lg border border-slate-300 p-5 h-fit sticky'>

                    <div className="space-y-5">
                        <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
                       <StarRatingFilter  selectedStars={selectedStars} onChange={handleStarsChange.} />
                    </div>
                
            </div>
            <div className='flex flex-col gap-5 '>
                <div className='flex justify-between items-center '>
                    <span className='text-xl font-bold'>
                        {hotelData?.pagination.total} Hotels found
                        {searchData.destination ? `in ${searchData.destination}`:""}
                    </span>
                    {/* SORT OPTIONS */}
                </div>
                {hotelData?.data.map((hotel)=>(
                    <SearchResultCard  hotel = {hotel}  />
                ))}
                <div>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1}  onPageChange={(pageNumber)=>{setPage(pageNumber)}}  />
                </div>
            </div>
            </div>
           
           
        
    )
}

export default Search
