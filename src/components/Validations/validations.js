import * as yup from "yup";

export let validationSchemaOne = yup.object({
  emailAddress: yup
    .string()
    .email("Please enter valid email address")
    .required("This field can't be left empty"),
  password: yup
    .string()
    .min(7, "Pasword should contain at least 7 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    "Password must contain at least one upperCase, one lowerCase, One numeral, & one Special character ")
    .max(11, "Maximum password lenght is 11 Characters")
    .required("This field can't be left empty"),
});




