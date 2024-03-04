import { Member } from "../types/member";

const MEMBERS: Member[] = [];

export const getMembers = (): Member[] => MEMBERS;

export const getMember = (id: number): Member | undefined => {
  return MEMBERS.find((m) => m.ID === id);
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
  const index = MEMBERS.findIndex((p) => p.ID === Member.ID);

  if (index < 0) {
    return undefined;
  }

  MEMBERS[index] = Member;

  return Member;
};

export const deleteMember = (id: number): Member | undefined => {
  const index = MEMBERS.findIndex((p) => p.ID === id);

  if (index < 0) {
    return undefined;
  }

  return MEMBERS.splice(index, 1)[0];
};