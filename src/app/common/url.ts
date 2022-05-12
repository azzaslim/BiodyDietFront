
import { environment } from "src/environments/environment";

export const BASE_URL=environment.apiURL;

export const LOGIN_URL= BASE_URL +'api/login';
export const REGISTER_URL= BASE_URL +'register';
export const VERIF_URL= BASE_URL +'app_forgot_password_request';
export const ADD_PATIENT_URL= BASE_URL +'api/add/patients';
export const GET_PATIENT_URL= BASE_URL +'api/get/patient';
export const GETPROFILE_URL= BASE_URL +'api/getProfile';
export const RESET_URL= BASE_URL +'api/reset/reset';
export const ADD_PREPARATION_URL= BASE_URL +'addProduct';
export const UPDATE_CURRENT_USER_URL= BASE_URL +'api/updateCurrentUser';
export const GET_ONE_USER_URL= BASE_URL +'api/get/OneUser';
export const addSymptom_URL= BASE_URL +'api/addSymptom';
export const getSymptoms_URL= BASE_URL +'api/getSymptoms';
export const GETALL_Product_URL= BASE_URL +'api/getProducts';


export const GET_ONE_PATIENT_URL= BASE_URL +'api/get/OnePatients';

export const UPDATE_USER_URL= BASE_URL +'api/updateUser';
export const UPDATE_LOGO_URL= BASE_URL +'api/updateLogo';
export const GET_USERS_URL= BASE_URL +'api/get/users';
export const DELETE_USER_URL= BASE_URL +'api/delete/user';
export const ADD_NUTRIENT_URL= BASE_URL +'api/addNutrient';
export const GETALL_NUTRIENTS_URL= BASE_URL +'api/getNutrient ';
export const ADD_QUESTIONNAIRE_URL= BASE_URL +'api/addQuestionnaire ';
export const GET_QUESTIONNAIRE_URL= BASE_URL +'api/getQuestionnaire ';
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


