import { environment } from "src/environments/environment";

export const BASE_URL=environment.apiURL;

export const LOGIN_URL= BASE_URL +'api/login';
export const REGISTER_URL= BASE_URL +'register';
export const VERIF_URL= BASE_URL +'app_forgot_password_request';
export const ADD_PATIENT_URL= BASE_URL +'api/add/patients';
export const GET_ONE_PATIENT_URL= BASE_URL +'api/get/Onepatients';
export const GETPROFILE_URL= BASE_URL +'api/getProfile';
export const RESET_URL= BASE_URL +'api/reset/reset';
export const ADD_PREPARATION_URL= BASE_URL +'addproduct';
export const GETALL_Product_URL= BASE_URL +'getproducts';
export const UPDATE_USER_URL= BASE_URL +'api/updateUser';
export const UPDATE_LOGO_URL= BASE_URL +'api/updateLogo';



