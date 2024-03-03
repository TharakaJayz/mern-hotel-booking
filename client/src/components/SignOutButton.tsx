import { useMutation } from 'react-query'
import * as apiClient from "../api-client";
import { useAppDispatch } from '../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../store/User-slice';
import { toastActions } from '../store/Toast-slice';


const SignOutButton = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const mutation = useMutation(apiClient.logOut,{
        onSuccess:()=>{
            dispatch(toastActions.add({ message: "Signed Out ! ", type: "SUCCESS" }));
            dispatch(userActions.add({isLogged:false}));
            navigation("/");
        },
        onError:(error:Error)=>{
            dispatch(toastActions.add({ message:error.message, type:"ERROR"  }));
        }
    });
    const handleClick = ()  =>{
        mutation.mutate();
    }


  return (
    <button className='text-blue-600 font-bold hover:bg-gray-100 bg-white' onClick={handleClick}>Sign out</button>
  )
}

export default SignOutButton