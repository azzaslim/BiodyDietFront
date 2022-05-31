import { environment } from "src/environments/environment";

export const BASE_URL=environment.apiURL;

export const LOGIN_URL= BASE_URL +'api/login';
export const REGISTER_URL= BASE_URL +'register';
export const VERIF_URL= BASE_URL +'app_forgot_password_request';
export const ADD_PATIENT_URL= BASE_URL +'api/add/patients';
export const GET_PATIENT_URL= BASE_URL +'/api/get/patientsByUser';
export const GETPROFILE_URL= BASE_URL +'api/getProfile';
export const RESET_URL= BASE_URL +'api/reset/reset';
export const UPDATE_LOGO_URL= BASE_URL +'api/updateLogo';
export const GET_USERS_URL= BASE_URL +'api/get/users';
export const DELETE_USER_URL= BASE_URL +'api/delete/user';

export const GET_ONE_USER_URL= BASE_URL +'api/get/OneUser';
/* export const ADD_NUTRIENT_URL= BASE_URL +'api/addnutrient';
export const GETALL_NUTRIENTS_URL= BASE_URL +'api/getnutrients'; */
export const DELETE_Nutrient_URL= BASE_URL +'api/deleteNutrient';
export const GET_ONE_SYMPTOM_URL= BASE_URL +'api/get/OneSymptom';
export const GET_ONE_PATIENT_URL= BASE_URL +'api/get/OnePatients';
export const ADD_PREPARATION_URL= BASE_URL +'addproduct';
export const UPDATE_CURRENT_USER_URL= BASE_URL +'api/updateCurrentUser';
export const addSymptom_URL= BASE_URL +'api/addsymptom';
export const getSymptoms_URL= BASE_URL +'api/getsymptoms';
export const UPDATE_USER_URL= BASE_URL +'api/updateUser';
export const ADD_QUESTIONNAIRE_URL= BASE_URL +'api/addQuestionnaire ';
export const GET_QUESTIONNAIRE_URL= BASE_URL +'api/getQuestionnaire ';
export const ADD_NUTRIENT_URL= BASE_URL +'api/addnutrient';
export const GETALL_NUTRIENTS_URL= BASE_URL +'api/getnutrients';
export const GET_ONE_NUTRIENT_URL= BASE_URL +'api/get/OneNutrient';
export const UPDATE_NUTRIENT_URL= BASE_URL +'api/updatenutrient';
export const DELETE_Symptom_URL= BASE_URL +'api/deleteSymptom';
export const DELETE_PRODUCT_URL= BASE_URL+'api/deleteProduct';
export const GET_ONE_PRODUCT_URL= BASE_URL+'api/get/OneProduct';
export const UPDATE_PRODUCT_URL= BASE_URL+'/api/updateProduct';
export const ADD_PRODUCT_URL= BASE_URL+'api/addproduct';
export const GETALL_preparations_URL= BASE_URL+'api/getpreparations';
export const GETALL_PRODUCTS_URL= BASE_URL+'api/getProducts';
export const GETALL_COMPLEMENTS_URL= BASE_URL+'api/getcomplements';
export const GET_ONE_QUESTIONNAIRE_URL= BASE_URL +'api/get/OneQuestionnaire';
export const DELETE_QUESTIONNAIRE_URL= BASE_URL +'api/delete/questionnaire';
export const UPDATE_QUESTIONNAIRE_URL= BASE_URL +'api/updateQuestionnaire';
export const GET_ALL_PATIENT_URL= BASE_URL +'get/AllPatients';
export const ADD_USER_URL= BASE_URL +'api/addUser';
export const ADD_ANSWER_URL= BASE_URL +'api/addAnswer';
export const GET_ANSWERS_URL= BASE_URL +'api/getAnswers';
export const DELETE_ANSWER_URL= BASE_URL +'api/delete/answer';
export const GET_ONE_ANSWER_URL= BASE_URL +'api/get/OneAnswer';
export const UPDATE_ANSWER_URL= BASE_URL +'api/updateAnswer';
export const GETALL_PREPARATION_URL= BASE_URL +'api/getPreparations';
export const GETALL_SUPPLIMENTS_URL= BASE_URL +'api/getSuppliments';
export const GET_ONE_PREPARATION_URL = BASE_URL +'api/get/OneProduct';
export const GETALL_SYMPTOMS_URL = BASE_URL +'api/getsymptoms'

