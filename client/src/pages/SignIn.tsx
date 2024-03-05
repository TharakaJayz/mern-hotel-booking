import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as apiClient from "../api-client";
import { useAppDispatch } from '../hooks/hooks';
import { toastActions } from '../store/Toast-slice';
import { userActions } from '../store/User-slice';
import { Link, useNavigate } from 'react-router-dom';



export type LoginFormData = {
    email: string
    password: string;
}

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: () => {

            dispatch(toastActions.add({ message: "SignIn successful !", type: "SUCCESS" }));
            dispatch(userActions.add({ isLogged: true }));
            navigation("/");
        },
        onError: (error: Error) => {

            dispatch(toastActions.add({ message: error.message, type: "ERROR" }))
        }
    })

    const onSubmit = handleSubmit((data) => {

        mutation.mutate(data);
    })
    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>
                Sign In
            </h2>
            <label className="text-gray-700 text-sm font-bold flex-1">Email
                <input className="border rounded w-full py-1 px-2 font-normal "  {...register("email", { required: "This field is required", })} type="email" />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">Password
                <input className="border rounded w-full py-1 px-2 font-normal "  {...register("password", { required: "This field is required", minLength: { value: 5, message: "Password must be at least 5 characters" } })} type="password" />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <span className='flex justify-between items-center'>
                <span className='text-sm  '>Not Registerd? <Link className='hover:text-purple-700 underline' to="/register">Create an acount here</Link></span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">Login</button>
            </span>

        </form>
    )
}

export default SignIn