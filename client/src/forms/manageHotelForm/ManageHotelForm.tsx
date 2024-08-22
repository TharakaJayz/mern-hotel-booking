
import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';



export type HotelFormData  = {
    name:string,
    city:string,
    country:string,
    description:string,
    type:string,
    pricePerNigh:number,
    starRating:number,
    facilities:string[],
    imageFiles:FileList,
    adultCount:number,
    childCount:number,
}

export const ManageHotelForm = () => {
    const formMethods = useForm<HotelFormData>();

    return (
        <FormProvider {...formMethods}> 
          {/* child components will get access to useForm functionalities also  */}
        <form className='flex flex-col gap-10'>
            <DetailsSection />
            <TypeSection />
            <FacilitiesSection />
            
        </form>
        </FormProvider>
    )
}
