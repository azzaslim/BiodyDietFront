
import { environment } from "src/environments/environment";

export const BASE_URL=environment.apiURL;
export const LOGIN_URL= BASE_URL +'api/login';
export const REGISTER_URL= BASE_URL +'register';
export const VERIF_URL= BASE_URL +'app_forgot_password_request';
export const ADD_PATIENT_URL= BASE_URL +'api/add/patients';
export const GET_PATIENT_URL= BASE_URL +'api/get/patient';
export const GETPROFILE_URL= BASE_URL +'api/getProfile';
export const RESET_URL= BASE_URL +'api/reset/reset';
//export const ADD_PREPARATION_URL= BASE_URL +'addproduct';

export const GETALL_PRODUCTS_URL= BASE_URL +'api/getProducts';

export const UPDATE_CURRENT_USER_URL= BASE_URL +'api/updateCurrentUser';
export const GET_ONE_USER_URL= BASE_URL +'api/get/OneUser';
export const addSymptom_URL= BASE_URL +'api/addsymptom';
export const getSymptoms_URL= BASE_URL +'api/getsymptoms';

export const GET_ONE_PATIENT_URL= BASE_URL +'api/get/Onepatients';
export const UPDATE_USER_URL= BASE_URL +'api/updateUser';
export const UPDATE_LOGO_URL= BASE_URL +'api/updateLogo';
export const GET_USERS_URL= BASE_URL +'api/get/users';
export const DELETE_USER_URL= BASE_URL +'api/delete/user';
export const ADD_NUTRIENT_URL= BASE_URL +'api/addnutrient';

export const GETALL_NUTRIENTS_URL= BASE_URL +'api/getnutrient';
export const GET_ONE_NUTRIENT_URL= BASE_URL +'api/get/OneNutrient';
export const UPDATE_NUTRIENT_URL= BASE_URL +'api/updatenutrient';
export const DELETE_Symptom_URL= BASE_URL +'api/deleteSymptom';
export const GET_ONE_SYMPTOM_URL= BASE_URL +'api/get/OneSymptom';
export const DELETE_PRODUCT_URL= BASE_URL+'api/deleteProduct1';
export const GET_ONE_PRODUCT_URL= BASE_URL+'api/get/OneProduct';
export const UPDATE_PRODUCT_URL= BASE_URL+'api/updateProduct';
export const ADD_PRODUCT_URL= BASE_URL+'api/addproduct';
export const ADD_SUPPLEMENT_URL= BASE_URL+'api/addSuppliment'
export const ADD_PREPARATION_URL= BASE_URL+'api/addPreparation'
export const GETALL_preparations_URL= BASE_URL+'api/getpreparations';
export const GETCOSMETIC_PRODUCTS_URL= BASE_URL+'api/getcosmeticproducts';
export const GETADMINCOSMETIC_PRODUCTS_URL= BASE_URL+'api/getAdmincosmeticproducts';

export const GETALL_COMPLEMENTS_URL= BASE_URL+'api/getcomplements';
export const UPDATE_PRODUCT_VISIBILITY_URL= BASE_URL+'api/updatevisibility';
export const ADD_QUESTIONNAIRE_URL= BASE_URL +'api/addquestionnaire ';
export const GET_QUESTIONNAIRE_URL= BASE_URL +'api/getquestionnaire ';
export const GET_ONE_QUESTIONNAIRE_URL= BASE_URL +'api/get/OneQuestionnaire';

export const DELETE_QUESTIONNAIRE_URL= BASE_URL +'api/delete/questionnaire';
export const UPDATE_QUESTIONNAIRE_URL= BASE_URL +'api/updateQuestionnaire';

export const GET_ONE_PREPARATION_URL = BASE_URL +'api/get/OneProduct';
export const GETALL_SYMPTOMS_URL = BASE_URL +'api/getsymptoms';
export const  ADD_USER_GROUP_URL = BASE_URL +'api/getgroup';
 export const  GET_ONE_GROUP_URL = BASE_URL +'api/get/OneGroup';
 export const  GET_ALL_GROUPS_URL = BASE_URL +'api/getgroup'; 

export const  DELETE_GROUP_URL = BASE_URL +'api/deleteGroup';
export const  UPDATE_GROUP_URL = BASE_URL +'api/getgroup'; 




