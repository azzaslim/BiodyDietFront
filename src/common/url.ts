import { environment } from "src/environments/environment";

export const BASE_URL=environment.apiURL;



export const LOGIN_URL= BASE_URL +'api/login';
export const REGISTER_URL= BASE_URL +'register';
export const ADD_PREPARATION_URL= BASE_URL +'addproduct';
export const GETALL_Product_URL= BASE_URL +'getproducts';