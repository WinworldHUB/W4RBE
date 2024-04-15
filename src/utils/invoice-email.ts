import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  ApiClient,
} from "sib-api-v3-sdk";
import { Order, PackagingType, Product } from "../awsApis";
import { BREVO_CONFIG } from "../constants/constants";
import { Packaging } from "../types/packagings";

const packaging: Packaging[] = [
  { id: PackagingType.BOX_PACK, cost: 20 },
  { id: PackagingType.FLAT_PACK, cost: 14 },
];
export const sendInvoiceEmail = async (
  order: Order,
  email: string,
  invoiceId: string
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

    if (!order) {
      throw new Error(
        "Invalid order. Order details are not in correct format or empty"
      );
    }

    const memberEmail = email;
    const templateId: number = 4;
    let shippingCharges = 0;
    let productQuantity = 0
    const orderPackage = (order.packagingType === PackagingType.BOX_PACK ? packaging[0] : packaging[1]);
    
    // Split the products string into an array of product names
    const productsArray = JSON.parse(order.products) as Product[];

    const totalProductQuantity = (productsArray ?? []).reduce((total, product) => total + product.quantity ?? 0, 0);

    const orderSubTotal = (productsArray ?? []).reduce((total, product) => total + (product.price ?? 0) * (product.quantity ?? 0), 0);

    const shippingCost = totalProductQuantity * (order.packagingType === PackagingType.BOX_PACK ? packaging[0].cost : packaging[1].cost);
    
    // productsArray.forEach((product) => {
    //   product.quantity = parseInt(product.quantity.toString());
    //   productQuantity += product.quantity
    //   if (order.packagingType === PackagingType.BOX_PACK) {
    //     orderPackage = packaging[0]
    //     const shippingCost = packaging[0].cost * product.quantity;
    //     orderSubTotal += order.orderValue - shippingCost
    //     shippingCharges += shippingCost;
    //   } else {
    //     orderPackage = packaging[1]
    //     const shippingCost = packaging[1].cost * product.quantity;
    //     shippingCharges += shippingCost;
    //   }
    //   orderSubTotal += order.orderValue - shippingCharges
    // });

    // Create the email request
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.templateId = templateId;

    sendSmtpEmail.to = [{ email: memberEmail }];
    // Set the email parameters dynamically based on the order
    const emailParams: { [key: string]: string } = {
      invoiceNumber: invoiceId,
      billedTo: memberEmail,
      invoiceDate: order.orderDate,
      packageType: order.packagingType,
      subTotal: `£${orderSubTotal.toFixed(2).toString()}`,
      shippingCost: `(${orderPackage.cost} * ${totalProductQuantity}) = £${shippingCost.toFixed(2)}`,
      invoiceValue: `£${order.orderValue.toFixed(2).toString()}`,
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
    console.log(
      "Email template sent successfully to " +
        email +
        ". Returned data: " +
        JSON.stringify(data)
    );
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
