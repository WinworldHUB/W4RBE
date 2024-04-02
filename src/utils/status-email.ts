import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  ApiClient,
} from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

export const sendStatusEmail = async (
  orderNumber: string,
  email: string,
  deliveryStatus: string
): Promise<void> => {
  try {
    const defaultClient = ApiClient.instance;
    const apiInstance = new TransactionalEmailsApi();
    const apiKey = process.env.API_KEY;
    const apiKeyAuth = defaultClient.authentications["api-key"];
    apiKeyAuth.apiKey = apiKey;
    const templateId = 5;
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.templateId = templateId;
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.params = {
      orderNumber: orderNumber,
      deliveryStatus: deliveryStatus,
    };
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
