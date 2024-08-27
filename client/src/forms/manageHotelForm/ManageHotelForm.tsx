
import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';



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
    const {handleSubmit} = formMethods;

    const onSubmit = handleSubmit ((formDataJson:HotelFormData)=>{
        // create new FormData object & call our API
        console.log("form data", formDataJson);
        const formData = new FormData();
        formData.append("name",formDataJson.name);
        formData.append("city",formDataJson.city);
        formData.append("country",formDataJson.country);
        formData.append("description",formDataJson.description);
        formData.append("type",formDataJson.type);
        formData.append("name",formDataJson.name);
        formData.append("pricePerNigh",formDataJson.pricePerNigh.toExponential.toString());
        formData.append("starRating",formDataJson.starRating.toExponential.toString());
        formData.append("adultCount",formDataJson.adultCount.toExponential.toString());
        formData.append("childCount",formDataJson.childCount.toExponential.toString());
    })
    return (
        <FormProvider {...formMethods}> 
          {/* child components will get access to useForm functionalities also  */}
        <form className='flex flex-col gap-10' onSubmit={onSubmit}>
            <DetailsSection />
            <TypeSection />
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />
            <span className='flex justify-end'>
                <button type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>Save</button>
            </span>
        </form>
        </FormProvider>
    )
}
