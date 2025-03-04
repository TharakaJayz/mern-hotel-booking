

const Home = () => {
    return (
        <div className='w-full h-full '>    
            <div className='flex flex-col gap-5 items-center justify-center h-full '>
                <h1 className='text-5xl font-bold uppercase'>Welcome to Hotel Booking</h1>
                <p className='text-lg'>Find your perfect hotel</p>
                <div className="w-full h-[200px] bg-blue-800 flex flex-col items-center justify-center text-white">
                    <h2 className="text-2xl lg:text-3xl text-center capitalize ">Please Sign In  using sample credetials</h2>
                    <h3 className="text-2xl mt-2">Email: <span className="font-bold">tharaka@gmail.com</span> </h3>
                    <h3 className="text-2xl">Password: <span className="font-bold">123456</span></h3>
                </div>
            </div>
        </div>
    )
}

export default Home
