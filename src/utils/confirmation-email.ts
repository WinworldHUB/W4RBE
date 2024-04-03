import {
    SendSmtpEmail,
    TransactionalEmailsApi,
    ApiClient,
  } from "sib-api-v3-sdk";
  import dotenv from "dotenv";
  import { BREVO_CONFIG } from "../constants/constants";
  dotenv.config();
  
  export const sendSignUpEmail = async (
    email: string,
    UserId: string
  ): Promise<void> => {
    try {
      const defaultClient = ApiClient.instance;
      const apiInstance = new TransactionalEmailsApi();
      const apiKey =
        BREVO_CONFIG.API_KEY_PREFIX +
        BREVO_CONFIG.API_KEY_MAJOR +
        BREVO_CONFIG.API_KEY_MINOR;
      const apiKeyAuth = defaultClient.authentications["api-key"];
      apiKeyAuth.apiKey = apiKey;
      const templateId = 7;
      const sendSmtpEmail = new SendSmtpEmail();
      sendSmtpEmail.templateId = templateId;
      sendSmtpEmail.to = [{ email: email }];
      sendSmtpEmail.params = { userId: UserId };
      apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data: any) {
          console.log(
            "Email template sent successfully to " +
              email +
              ". Returned data: " +
              JSON.stringify(data)
          );
        },
        function (error: string) {
          console.error("Error sending email to " + email + ":", error);
        }
      );
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };
  