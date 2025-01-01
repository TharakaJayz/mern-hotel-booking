import { RegisterFormData } from "./pages/Register";
import { LoginFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType, UserType } from "../../server/src/shared/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    console.log("error", responseBody.message);
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const signIn = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};


export const fetchCurrentUser = async ():Promise<UserType>=>{
  const response = await fetch(`${API_BASE_URL}/api/users/me`,{
    credentials:"include"
  })

  if(!response){
    throw new Error("Error fetching user");
  }

  return response.json();
}
export const logOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Erro during sign out");
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error fetching hotel for ${hotelId}`);
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Error updating hotel`);
  }

  return response.json();
};

export type SearchParams = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: string;
  childCount: string;
  page: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOptions?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParms = new URLSearchParams();
  queryParms.append("destination", searchParams.destination || "");
  queryParms.append("checkIn", searchParams.checkIn || "");
  queryParms.append("checkOut", searchParams.checkOut || "");
  queryParms.append("adultCount", searchParams.adultCount || "");
  queryParms.append("childCount", searchParams.childCount || "");
  queryParms.append("page", searchParams.page || "");

  queryParms.append("maxPrice", searchParams.maxPrice || "");
  queryParms.append("sortOptions", searchParams.sortOptions || "");

  searchParams.facilities?.forEach((facility) =>
    queryParms.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParms.append("types", type));
  searchParams.stars?.forEach((star) => queryParms.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParms}`
  );
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const fetchHotelById = async (hotelId:string):Promise<HotelType> =>{
  const response =  await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if(!response.ok){
    throw new Error("Error fetching hotel for id")
  }

  return response.json()
} 
