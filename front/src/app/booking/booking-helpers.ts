
export const sanitizePhone = (raw: string): string => {
  if (!raw) return "";
  let out = "";
  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i];
    if (
      (ch >= "0" && ch <= "9") ||
      ch === "+" ||
      ch === "-" ||
      ch === " "
    ) {
      out += ch;
    }
  }
  return out;
};
export const isPhonePatternLegal = (phone: string): boolean => {
  if (!phone) return false;
  let digits = 0;
  for (let i = 0; i < phone.length; i += 1) {
    const ch = phone[i];
    if (ch >= "0" && ch <= "9") {
      digits += 1;
      continue;
    }
    if (ch === "+" || ch === "-" || ch === " ") {
      continue;
    }
    return false;
  }
  return digits >= 6 && digits <= 20;
};



export const isEmailPatternLegal = (email: string): boolean => {
  if (!email) return false;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email)) {
    console.log("h")
    return true;
  }
  console.log(email)
  return false;
};




export const toIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseRoomTypeId = (raw: string | null): number | null => {
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
};
