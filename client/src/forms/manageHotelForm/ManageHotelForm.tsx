import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
    
}

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

export const ManageHotelForm = (props: Props) => {
    const formMethods = useForm<HotelFormData>();

    return (
        <FormProvider {...formMethods}>
        <form>
            
            
        </form>
        </FormProvider>
    )
}
