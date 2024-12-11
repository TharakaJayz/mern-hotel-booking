import {hotelFacilities} from "../config/hotel-options-config";

type Props = {
    selectedHotelFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const HotelFacilityFilter = ({ onChange, selectedHotelFacilities }: Props) => {
    return (
      <div className="border-b border-slate-50-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Facilities</h4>
        {hotelFacilities.map((hotelFacility) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={hotelFacility}
              checked={selectedHotelFacilities.includes(hotelFacility)}
              onChange={onChange}
            />
            <span>{hotelFacility}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default HotelFacilityFilter;
  