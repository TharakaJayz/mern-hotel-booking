
import { FormProvider, useForm } from 'react-hook-form'



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
        <form>
            
            
        </form>
        </FormProvider>
    )
}
