import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  ApiClient,
} from "sib-api-v3-sdk";
import { BREVO_CONFIG } from "../constants/constants";

interface EmailParams {
  [key: string]: string;
}

interface EmailOptions {
  templateId: number;
  toEmail: string;
  params: EmailParams;
  subject?: string;
}

export class TransactionalEmailService {
  private apiInstance: TransactionalEmailsApi;

  constructor() {
    const defaultClient = ApiClient.instance;
    this.apiInstance = new TransactionalEmailsApi();
    const apiKey = `${BREVO_CONFIG.API_KEY_PREFIX}${BREVO_CONFIG.API_KEY_MAJOR}${BREVO_CONFIG.API_KEY_MINOR}`;
    const apiKeyAuth = defaultClient.authentications["api-key"];
    apiKeyAuth.apiKey = apiKey;
  }

  public async sendEmail({
    templateId,
    toEmail,
    params,
    subject,
  }: EmailOptions): Promise<void> {
    try {
      const sendSmtpEmail = new SendSmtpEmail();
      sendSmtpEmail.templateId = templateId;
      sendSmtpEmail.to = [{ email: toEmail }];
      sendSmtpEmail.params = params;

      if (subject) {
        sendSmtpEmail.subject = subject;
      }

      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(
        `Email template sent successfully to ${toEmail}. Returned data: ${JSON.stringify(
          data
        )}`
      );
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
