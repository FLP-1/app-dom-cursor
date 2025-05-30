export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rest = 11 - (sum % 11);
  const digit1 = rest > 9 ? 0 : rest;

  if (digit1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rest = 11 - (sum % 11);
  const digit2 = rest > 9 ? 0 : rest;

  return digit2 === parseInt(cpf.charAt(10));
}

export function validatePhoneNumber(phone: string): boolean {
  // Remove caracteres não numéricos
  const cleanedPhone = phone.replace(/\D/g, '');

  // Validação básica para números brasileiros com DDD (10 ou 11 dígitos)
  // Pode ser ajustada para formatos internacionais ou mais específicos, se necessário.
  if (cleanedPhone.length >= 10 && cleanedPhone.length <= 11) {
    return true; // Validação básica passa se tiver 10 ou 11 dígitos
  }

  return false;
} 