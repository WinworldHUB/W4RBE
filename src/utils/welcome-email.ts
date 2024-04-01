import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  ApiClient,
} from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

export const sendWelcomeEmail = async (email: string): Promise<void> => {
  try {
    const defaultClient = ApiClient.instance;
    const apiInstance = new TransactionalEmailsApi();
    const apiKey = process.env.API_KEY;
    const apiKeyAuth = defaultClient.authentications["api-key"];
    apiKeyAuth.apiKey = apiKey;
    const templateId = 1;
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.templateId = templateId;
    const randomGeneratedPassword = [...Array(16)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

    // Set the recipient
    sendSmtpEmail.to = [{ email: email }];

    // Set the email parameters using the placeholder format
    sendSmtpEmail.params = { email: email, tempPassword: randomGeneratedPassword};
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
