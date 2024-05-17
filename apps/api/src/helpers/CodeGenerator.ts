export const referralGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let result: string = '';

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const voucherGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let result: string = '';

  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const ticketCodeGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let result: string = '';

  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
