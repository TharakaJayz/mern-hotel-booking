import { RegisterFormData } from "./pages/Register";
import { LoginFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  console.log("this is reponse body", responseBody);
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const logOut = async () =>{
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
    credentials:"include",
    method:"POST"
  }
  )

  if(!response.ok){
    throw new Error("Erro during sign out")
  }
}

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
