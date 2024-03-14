import { Member } from "../awsApis";

function formatMemberData(data): Member[] {
  const formattedMembers = [];

  data.forEach((item) => {
    const formattedMember = {
      id: item.ID.toString(),
      name: item["Customer name"],
      email: item["Customer email"],
      phone: item["Customer phone"] !== "" ? item["Customer phone"] : null,
      active: item.Status.toString().toLowerCase() === "active",
      province: item["Delivery province code"] !== "" ? item["Delivery province code"] : null,
      city: item["Delivery city"] !== "" ? item["Delivery city"] : null,
      zip: item["Delivery zip"] !== "" ? item["Delivery zip"] : null,
      country: item["Delivery country code"] !== "" ? item["Delivery country code"] : null,
      address1: item["Delivery address 1"] !== "" ? item["Delivery address 1"] : null,
      address2: item["Delivery address 2"] !== "" ? item["Delivery address 2"] : null,
    };
    
    formattedMembers.push(formattedMember);
  });
  return formattedMembers;
}

export default formatMemberData;
