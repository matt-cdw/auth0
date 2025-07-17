import React from "react";
import { useForm } from "react-hook-form";
import Button from "@/common/Button";
import Alert from "@/common/Alert";
import FormField from "@/common/FormField";
import CaptchaBox from "@/common/CaptchaBox";
import { getFieldError } from "@/utils/helpers/errorUtils";
import { useCreateAccountManager } from "../hooks/useCreateAccountManager";

import "../styles/CreateAccountForm.css";

export interface CreateAccountFormData {
  firstName: string;
  lastName: string;
  username?: string;
  password: string;
  captcha?: string;
  accountType?: string;
}

const CreateAccountForm: React.FC = () => {

  const {
    createAccountInstance,
    handleCreateAccount,
    errors,
    captcha,
    texts    
  } = useCreateAccountManager();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<CreateAccountFormData>();

  const generalErrors =
    errors?.filter((e) => !e.field || e.field === null) || []; 

  const {
    showUsername,
    showAccountType,
    showEmailBlock,
    showInvitation,
    prefilledEmail,
  } = useCreateAccountManager();

  const isCaptchaAvailable = !!captcha;
  const captchaImage = captcha?.image;

  const onSubmit = (formData: CreateAccountFormData) => {
    handleCreateAccount(
      formData.firstName,
      formData.lastName,
      formData.username,
      formData.password,
      formData.captcha,
      formData.accountType
    );
  };

  return (
    <>
      {/* Invitation Segment */}
      {showInvitation && (
          <div
            className="text-sm text-center text-gray-800 px-4 py-3 mb-4 leading-relaxed invitation-text"
            dangerouslySetInnerHTML={{ __html: texts.invitation }}
          />
      )}


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {generalErrors.length > 0 && (
          <div className="space-y-3 mb-4">
            {generalErrors.map((error, i) => (
              <Alert key={i} type="error" message={error.message} />
            ))}
          </div>
        )}

        {/* Show pre-filled email block if coming from invite */}
        {showEmailBlock && (
          <div className="text-sm text-center text-text-default mb-4">
            <span className="bg-gray-100 text-sm px-4 py-2 inline-block rounded border">
              {prefilledEmail}
            </span>
          </div>
        )}

        {/* Show Account Type selection */}
        {showAccountType && (
          <div className="mb-4 account-block">
            <label className="block font-bold mb-2 text-sm">Choose an Account Type</label>
            <div className="flex gap-4">
              {[
                { value: "cdw.com", title: "CDW.com", subtitle: "Business, Personal" },
                {
                  value: "cdwg.com",
                  title: "CDWG.com",
                  subtitle: "Government, Education, Healthcare",
                },
              ].map((item) => (
                <div
                  key={item.value}
                  onClick={() => setValue("accountType", item.value, { shouldValidate: true })}
                  className={`account-option ${
                    watch("accountType") === item.value ? "selected" : ""
                  }`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-600 whitespace-pre-line">{item.subtitle}</div>
                </div>
              ))}              
            </div>

            <div className='enter-account-info'>Enter Account Information</div>

            {formErrors.accountType && (
              <p className="text-red-600 text-sm mt-1">
                {formErrors.accountType.message}
              </p>
            )}
          </div>


        )}

        {/* First Name */}
        <FormField
          className="mb-4 login-field"
          labelProps={{ htmlFor: "firstName", children: "First Name" }}
          inputProps={{
            ...register("firstName", { required: "First name is required" }),
            id: "firstName",
            type: "text",
            autoComplete: "given-name",
          }}
          error={formErrors.firstName?.message}
        />

        {/* Last Name */}
        <FormField
          className="mb-4 login-field"
          labelProps={{ htmlFor: "lastName", children: "Last Name" }}
          inputProps={{
            ...register("lastName", { required: "Last name is required" }),
            id: "lastName",
            type: "text",
            autoComplete: "family-name",
          }}
          error={formErrors.lastName?.message}
        />

        {/* Optional Username */}
        {showUsername && (
          <FormField
            className="mb-4 login-field"
            labelProps={{ htmlFor: "username", children: "Create Username" }}
            inputProps={{
              ...register("username", {
                required: "Username is required",
                maxLength: 50,
              }),
              id: "username",
              type: "text",
              autoComplete: "username",
            }}
            error={formErrors.username?.message}
          />
        )}

        {/* Password */}
        <FormField
          className="mb-4 login-field"
          labelProps={{ htmlFor: "password", children: "Create Password" }}
          inputProps={{
            ...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            }),
            id: "password",
            type: "password",
            autoComplete: "new-password",
          }}
          error={formErrors.password?.message}
        />

        {/* CAPTCHA */}
        {isCaptchaAvailable && captchaImage && (
          <CaptchaBox
            className="mb-4 login-field"
            id="captcha-signup"
            name="captcha"
            label="CAPTCHA"
            imageUrl={captchaImage}
            imageAltText="CAPTCHA challenge"
            inputProps={{
              ...register("captcha", {
                required: "Enter CAPTCHA",
                maxLength: 15,
              }),
            }}
            error={formErrors.captcha?.message || getFieldError("captcha", errors)}
          />
        )}

      <span className="login-disclaimer">
        By creating an account, you agree to <a href="#">CDW's Privacy Policy</a> and <a href="#">Terms and Conditions</a>
      </span>


        {/* Submit */}
        <Button type="submit" fullWidth isLoading={isSubmitting} loadingText="Creating...">
          Create Account
        </Button>
      </form>
    </>
  );
};

export default CreateAccountForm;
