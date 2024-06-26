import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  ApiClient,
} from "sib-api-v3-sdk";
import { BREVO_CONFIG } from "../constants/constants";

export const sendWelcomeEmail = async (email: string): Promise<void> => {
  try {
    const defaultClient = ApiClient.instance;
    const apiInstance = new TransactionalEmailsApi();
    const apiKey =
      BREVO_CONFIG.API_KEY_PREFIX +
      BREVO_CONFIG.API_KEY_MAJOR +
      BREVO_CONFIG.API_KEY_MINOR;
    const apiKeyAuth = defaultClient.authentications["api-key"];
    apiKeyAuth.apiKey = apiKey;
    const templateId = 1;
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.templateId = templateId;
    // Set the recipient
    sendSmtpEmail.to = [{ email: email }];

    // Set the email parameters using the placeholder format
    sendSmtpEmail.params = { email: email, tempPassword: "Password@1"};
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data:any) {
        console.log(
          "Email template sent successfully to " +
            email +
            ". Returned data: " +
            JSON.stringify(data)
        );
      },
      function (error:string) {
        console.error("Error sending email to " + email + ":", error);
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
