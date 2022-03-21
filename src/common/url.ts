import { environment } from "src/environments/environment";

export const BASE_URL=environment.apiURL;



export const LOGIN_URL= BASE_URL +'login';
export const REGISTER_URL= BASE_URL +'register';
export const VERIF_URL= BASE_URL +'api/reset';
export const RESET_URL= BASE_URL +'api/reset/reset';
export const ADD_PATIENT_URL= BASE_URL +'api/add/patient';
export const GET_PATIENT_URL= BASE_URL +'api/get/patient';