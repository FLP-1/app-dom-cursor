/**
 * Arquivo: useCheckoutForm.ts
 * Caminho: src/hooks/useCheckoutForm.ts
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema de validação para checkout
const checkoutSchema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  numeroCartao: z.string().min(16, 'Número do cartão inválido'),
  validade: z.string().min(5, 'Validade obrigatória'),
  cvv: z.string().min(3, 'CVV obrigatório'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const useCheckoutForm = () => {
  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
  });

  // TODO: Implementar integração com API e mensagens de erro/sucesso internacionalizáveis
  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    // TODO: Implementar lógica de checkout
  };

  return {
    ...methods,
    onSubmit,
    control: methods.control,
  };
};

export default useCheckoutForm;
export { useCheckoutForm }; 
