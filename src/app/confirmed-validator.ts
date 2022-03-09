import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(controleName:string,matchingControlName:string)
{
    return (FormGroup:FormGroup)=>{
        const control =FormGroup.controls[controleName];
        const matchingControl = FormGroup.controls[matchingControlName];
        if(matchingControl.errors && !matchingControl.errors['confirmedValidator']){
            return 
        }
if (control.value!== matchingControl.value){
    matchingControl.setErrors({ConfirmedValidator:true});
}
else{
    matchingControl.setErrors(null);
}
    }
}