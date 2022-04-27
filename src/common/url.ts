import { environment } from "src/environments/environment";

export const BASE_URL=environment.apiURL;

export const LOGIN_URL= BASE_URL +'api/login';
export const REGISTER_URL= BASE_URL +'register';
export const VERIF_URL= BASE_URL +'app_forgot_password_request';
export const ADD_PATIENT_URL= BASE_URL +'api/add/patients';
export const GET_PATIENT_URL= BASE_URL +'api/get/patient';
export const GETPROFILE_URL= BASE_URL +'api/getProfile';
export const RESET_URL= BASE_URL +'api/reset/reset';
export const ADD_PREPARATION_URL= BASE_URL +'addproduct';
export const GETALL_Product_URL= BASE_URL +'getproducts';
<<<<<<< HEAD:src/app/common/url.ts
export const UPDATE_CURRENT_USER_URL= BASE_URL +'api/updateCurrentUser';
export const UPDATE_USER_URL= BASE_URL +'api/updateUser';

export const UPDATE_LOGO_URL= BASE_URL +'api/updateLogo';
export const GET_USERS_URL= BASE_URL +'api/get/users';
export const DELETE_USER_URL= BASE_URL +'api/delete/user';
export const GET_ONE_USER_URL= BASE_URL +'api/get/OneUser';




=======
export const addSymptom_URL= BASE_URL +'api/addsymptom';
export const getSymptoms_URL= BASE_URL +'api/getsymptoms';
>>>>>>> 733408228767c975987993cd81e32fce299cb35d:src/common/url.ts

export const GET_ONE_PATIENT_URL= BASE_URL +'api/get/Onepatients';

export const UPDATE_USER_URL= BASE_URL +'api/updateUser';
export const UPDATE_LOGO_URL= BASE_URL +'api/updateLogo';
export const GET_USERS_URL= BASE_URL +'api/get/users';
export const DELETE_USER_URL= BASE_URL +'api/delete/user';
export const ADD_NUTRIENT_URL= BASE_URL +'api/addnutrient';
export const GETALL_NUTRIENTS_URL= BASE_URL +'api/getnutrient ';