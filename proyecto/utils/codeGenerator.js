
exports.generateVerificationCode = () => {
  const alphabetEnglish = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetSpanish = 'abcdefghijklmnñopqrstuvwxyz';
  const alphabet = Math.random() < 0.5 ? alphabetEnglish : alphabetSpanish;
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet[randomIndex];
  }
  return code;
};
