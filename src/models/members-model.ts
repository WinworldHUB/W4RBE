import { Member } from "../types/member";

const MEMBERS: Member[] = [];

export const getMembers = (): Member[] => MEMBERS;

export const getMember = (email: string): Member | undefined => {
  return MEMBERS.find((m) => m["Customer email"] === email);
};

export const insertMember = (member: Member): Member => {
  MEMBERS.push(member);
  return member;
};
export const insertMembers = (members: Member[]): Member[] => {
  MEMBERS.push(...members);
  return members;
};

export const updateMember = (Member: Member): Member | undefined => {
  const index = MEMBERS.findIndex(
    (p) => p["Customer email"] === Member["Customer email"]
  );

  if (index < 0) {
    return undefined;
  }

  MEMBERS[index] = Member;

  return Member;
};

export const deleteMember = (email: string): Member | undefined => {
  const index = MEMBERS.findIndex((p) => p["Customer email"] === email);

  if (index < 0) {
    return undefined;
  }

  return MEMBERS.splice(index, 1)[0];
};
