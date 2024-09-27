import { useQuery } from 'react-query';
import { useAppSeleter } from '../hooks/hooks'
import { RootState } from '../store/store'
import * as apiClient from "../api-client";
import { useState } from 'react';

const Search = () => {
    const searchData = useAppSeleter((state: RootState) => state.search);
    const [page,setPage] = useState<number>(1);
    const searchParams = {
        destination:searchData.destination,
        checkIn:searchData.checkIn.toISOString(),
        checkOut:searchData.checkOut.toISOString(),
        adultCount:searchData.adultCount.toString(),
        childCount:searchData.adultCount.toString(),
        page:page.toString()

        
    }
    const {data:hotelData} = useQuery(["SearchHotels",searchParams], ()=> apiClient.searchHotels(searchParams));
    // ["SearchHotels",searchParams] because of this if we got same data set twise then previos data will be chached !!
    console.log("search Data", searchData)
    return (
        <div>
            
        </div>
    )
}

export default Search
