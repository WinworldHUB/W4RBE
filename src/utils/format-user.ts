import { Member } from "../awsApis";

function formatMemberData(members): Member[] {
  const formattedMembers = [];

  members.forEach((member) => {
    try {
      const formattedMember = member["id"]
        ? member
        : ({
            id: member.ID.toString(),
            name: member["Customer name"],
            email: member["Customer email"],
            phone:
              member["Customer phone"] !== "" ? member["Customer phone"] : null,
            active: true,
            province:
              member["Delivery province code"] !== ""
                ? member["Delivery province code"]
                : null,
            city:
              member["Delivery city"] !== "" ? member["Delivery city"] : null,
            zip: member["Delivery zip"] !== "" ? member["Delivery zip"] : null,
            country:
              member["Delivery country code"] !== ""
                ? member["Delivery country code"]
                : null,
            address1:
              member["Delivery address 1"] !== ""
                ? member["Delivery address 1"]
                : null,
            address2:
              member["Delivery address 2"] !== ""
                ? member["Delivery address 2"]
                : null,
            deliveryPerson: "",
            deliveryEmail: "",
            deliveryAddress1: "",
            deliveryAddress2: "",
          } as Member);
      formattedMembers.push(formattedMember);
    } catch (error) {
      console.error("Error formatting member data: ", error);
    }
  });
  return formattedMembers;
}

export default formatMemberData;
