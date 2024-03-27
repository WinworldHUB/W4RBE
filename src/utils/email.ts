import { SendSmtpEmail, TransactionalEmailsApi, ApiClient } from 'sib-api-v3-sdk';
import { Order, Product } from "../awsApis";
import dotenv from 'dotenv';
dotenv.config();

export const sendInvoiceEmail = async (order: Order, email: string): Promise<void> => {
    try {
        const defaultClient = ApiClient.instance;
        const apiInstance = new TransactionalEmailsApi();
        const apiKey = process.env.API_KEY;
        const apiKeyAuth = defaultClient.authentications['api-key'];
        apiKeyAuth.apiKey = apiKey;

        if (!order) {
            throw new Error("Invalid order. Order details are not in correct format or empty");
        }

        const memberEmail = email;
        const templateId: number = 4;

        // Split the products string into an array of product names
        const productsArray = JSON.parse(order.products) as Product[]

        // Create the email request
        const sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.templateId = templateId;

        sendSmtpEmail.to = [{ "email": memberEmail }];

        // Set the email parameters dynamically based on the order
        const emailParams: { [key: string]: string } = {
            "billedTo": memberEmail,
            "invoiceDate": order.orderDate,
            "packageType": order.packagingType,
            "invoiceValue": order.orderValue.toString()
        };

        // Add product-specific parameters
        productsArray.forEach((product, index) => {
            const itemKeyPrefix = `item${index + 1}`;
            emailParams[`${itemKeyPrefix}`] = product.title;
            emailParams[`${itemKeyPrefix}Quantity`] = product.quantity.toString(); 
            emailParams[`${itemKeyPrefix}Amount`] = product.price.toString();
        });

        // Set the email parameters
        sendSmtpEmail.params = emailParams;

        // Send the email template
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email template sent successfully to ' + email + '. Returned data: ' + JSON.stringify(data));
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
