import { Member } from "../awsApis";

function formatMemberData(data) {
  return {
    id: data.ID.toString(),
    name: data["Customer name"],
    email: data["Customer email"],
    phone: data["Customer phone"] !== "" ? data["Customer phone"] : null,
    active: data.Status === "Active",
    province: data["Delivery province code"] !== "" ? data["Delivery province code"] : null,
    city: data["Delivery city"] !== "" ? data["Delivery city"] : null,
    zip: data["Delivery zip"] !== "" ? data["Delivery zip"] : null,
    country: data["Delivery country code"] !== "" ? data["Delivery country code"] : null,
    address1: data["Delivery address 1"] !== "" ? data["Delivery address 1"] : null,
    address2: data["Delivery address 2"] !== "" ? data["Delivery address 2"] : null,
  };
}

export default formatMemberData