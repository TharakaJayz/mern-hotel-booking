import { useForm } from "react-hook-form";
import { UserType } from "../../../../server/src/shared/types";

interface Props {
  currentUser: UserType;
}
type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const BookingForm = ({ currentUser }: Props) => {
  const { handleSubmit, register } = useForm<BookingFormData>({defaultValues:{
    email:currentUser.email , firstName:currentUser.firstName , lastName:currentUser.lastName
  }});
  return <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
    <span className="text-3xl font-bold">Confirm Your Details</span>
    <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">FirstName

            <input type="text" className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" readOnly disabled {...register("firstName")} />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">LastName

            <input type="text" className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" readOnly disabled {...register("lastName")} />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">Email

            <input type="text" className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" readOnly disabled {...register("email")} />
        </label>

    </div>

  </form>;
};

export default BookingForm;
