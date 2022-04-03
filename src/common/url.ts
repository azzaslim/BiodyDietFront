import { environment } from "src/environments/environment";

export const BASE_URL=environment.apiURL;
<<<<<<< HEAD
export const LOGIN_URL= BASE_URL +'api/login';
export const REGISTER_URL= BASE_URL +'register';
export const VERIF_URL= BASE_URL +'app_forgot_password_request';
//export const RESET_URL= BASE_URL +'reset/' + localStorage.getItem('token');
export const ADD_PATIENT_URL= BASE_URL +'api/add/patients';
export const GET_PATIENT_URL= BASE_URL +'api/get/patient';
export const ADD_PREPARATION_URL= BASE_URL +'api/add/preparation';
export const GETPROFILE_URL= BASE_URL +'api/getProfile';
=======




//export const LOGIN_URL= BASE_URL +'login';
export const REGISTER_URL= BASE_URL +'register';
export const VERIF_URL= BASE_URL +'api/reset';
export const RESET_URL= BASE_URL +'api/reset/reset';
export const ADD_PATIENT_URL= BASE_URL +'add/patient';
export const GET_PATIENT_URL= BASE_URL +'get/patient';
export const LOGIN_URL= BASE_URL +'api/login';
export const ADD_PREPARATION_URL= BASE_URL +'addproduct';
export const GETALL_Product_URL= BASE_URL +'getproducts';
>>>>>>> 04eed1fc2cd7d18d83ffd994bfdf907b7eb007f3

