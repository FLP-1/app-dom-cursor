# Manual de Cadastro de Empregador e Empregado Doméstico (eSocial Doméstico)

## Sumário
- [1. Introdução](#1-introducao)
- [2. Cadastro de Empregador Doméstico (Pessoa Física)](#2-cadastro-de-empregador-domestico-pessoa-fisica)
- [3. Cadastro de Empregado Doméstico (Pessoa Física)](#3-cadastro-de-empregado-domestico-pessoa-fisica)
- [4. Funções/Cargos Permitidos (CBO)](#4-funcoescargos-permitidos-cbo)
- [5. Tooltips e Orientações de UI](#5-tooltips-e-orientacoes-de-ui)
- [6. Referências](#6-referencias)

---

## 1. Introdução
Este manual padroniza o cadastro de empregador e empregado doméstico pessoa física no sistema DOM, integrado ao eSocial. Todos os desenvolvedores devem seguir estas orientações para garantir conformidade legal, usabilidade e integração correta com o eSocial.

---

## 2. Cadastro de Empregador Doméstico (Pessoa Física)

### Campos Obrigatórios
| Campo                | Tooltip                                                                                   |
|----------------------|------------------------------------------------------------------------------------------|
| CPF                  | CPF do empregador. Exemplo: 123.456.789-00                                               |
| Nome completo        | Nome civil do empregador, conforme consta no CPF.                                        |
| Data de nascimento   | Data de nascimento do empregador.                                                        |
| Sexo                 | Sexo do empregador (Masculino/Feminino).                                                 |
| Nacionalidade        | Nacionalidade do empregador (ex: Brasileiro, Estrangeiro).                               |
| Grau de instrução    | Grau de escolaridade do empregador.                                                      |
| Nome da mãe          | Nome completo da mãe do empregador.                                                      |
| Endereço completo    | Logradouro, número, complemento (opcional), bairro, CEP, município, UF.                  |
| Telefone             | Telefone de contato do empregador.                                                       |
| E-mail               | E-mail de contato do empregador.                                                         |
| Data de início da validade | Data a partir da qual as informações são válidas no eSocial.                       |

### Campos Opcionais
| Campo                | Tooltip                                                                                   |
|----------------------|------------------------------------------------------------------------------------------|
| Nome social          | Nome social, se houver (para pessoas transgênero, por exemplo).                          |
| Inscrição CAEPF      | Número de inscrição no CAEPF (Cadastro de Atividade Econômica da Pessoa Física), se houver.|
| Complemento de endereço | Complemento do endereço, se necessário.                                               |
| Telefone secundário  | Outro telefone de contato.                                                               |

---

## 3. Cadastro de Empregado Doméstico (Pessoa Física)

### Campos Obrigatórios
| Campo                | Tooltip                                                                                   |
|----------------------|------------------------------------------------------------------------------------------|
| CPF                  | CPF do empregado. Exemplo: 123.456.789-00                                                |
| Nome completo        | Nome civil do empregado, conforme consta no CPF.                                         |
| Data de nascimento   | Data de nascimento do empregado.                                                         |
| Sexo                 | Sexo do empregado (Masculino/Feminino).                                                  |
| Nacionalidade        | Nacionalidade do empregado (ex: Brasileiro, Estrangeiro).                                |
| Grau de instrução    | Grau de escolaridade do empregado.                                                       |
| Nome da mãe          | Nome completo da mãe do empregado.                                                       |
| Endereço completo    | Logradouro, número, complemento (opcional), bairro, CEP, município, UF.                  |
| Telefone             | Telefone de contato do empregado.                                                        |
| E-mail               | E-mail de contato do empregado.                                                          |
| Data de admissão     | Data em que o empregado iniciou o trabalho.                                              |
| Matrícula            | Código de identificação do empregado no sistema do empregador.                           |
| Categoria do trabalhador | Código da categoria do trabalhador (ex: 111 para empregado doméstico).                |
| Remuneração          | Valor do salário base do empregado.                                                      |
| Cargo                | Cargo ou função exercida pelo empregado (ex: Doméstica, Cuidador, Motorista).           |
| Jornada de trabalho  | Descrição da jornada semanal (ex: 44h semanais).                                         |
| CTPS                 | Número, série e UF da Carteira de Trabalho e Previdência Social.                         |
| PIS/PASEP            | Número de inscrição do empregado no PIS/PASEP.                                           |

### Campos Opcionais
| Campo                | Tooltip                                                                                   |
|----------------------|------------------------------------------------------------------------------------------|
| Nome social          | Nome social, se houver.                                                                  |
| Estado civil         | Estado civil do empregado.                                                               |
| Raça/Cor             | Raça ou cor do empregado, conforme classificação do IBGE.                                |
| Dependentes          | Informações sobre dependentes para fins de IRRF ou salário-família.                      |
| Deficiência          | Indicar se o empregado possui alguma deficiência.                                        |
| E-mail alternativo   | Outro e-mail de contato.                                                                 |
| Telefone alternativo | Outro telefone de contato.                                                               |

---

## 4. Funções/Cargos Permitidos (CBO) para Empregados Domésticos

Abaixo estão as principais funções reconhecidas pelo eSocial e pela CBO (Classificação Brasileira de Ocupações) para o emprego doméstico. O código CBO é obrigatório no cadastro do empregado doméstico.

| Código CBO | Descrição do Cargo/Função         | Observações/Relevância para o projeto                |
|------------|-----------------------------------|------------------------------------------------------|
| 5121-05    | Empregado(a) doméstico(a)         | Função genérica para serviços gerais na residência.  |
| 5121-10    | Cozinheiro(a) do serviço doméstico| Responsável pelo preparo de refeições na residência.  |
| 5121-15    | Governanta do serviço doméstico   | Responsável pela administração da residência.         |
| 5121-20    | Mordomo                           | Responsável por servir, organizar eventos, etc.       |
| 5121-25    | Caseiro(a)                        | Responsável por cuidar de casa de campo, sítio, etc.  |
| 5121-30    | Cuidador(a) de idosos             | Responsável pelo cuidado de idosos no ambiente doméstico. |
| 5162-05    | Babá                              | Responsável pelo cuidado de crianças.                 |
| 5162-10    | Acompanhante de idosos            | Auxilia idosos em atividades diárias, sem cuidados médicos. |
| 5143-20    | Jardineiro(a)                     | Cuida de jardins e áreas verdes residenciais.         |
| 5143-25    | Motorista particular              | Dirige para a família, faz transporte de pessoas.     |
| 5143-30    | Lavadeira do serviço doméstico    | Responsável por lavar e passar roupas na residência.  |
| 5143-35    | Passadeira do serviço doméstico   | Responsável por passar roupas na residência.          |
| 5143-40    | Arrumador(a) de roupas            | Organiza e guarda roupas e pertences.                 |
| 5143-45    | Camareira do serviço doméstico    | Limpa e arruma quartos e áreas íntimas.               |
| 5143-50    | Zelador(a) de residência          | Responsável pela manutenção e segurança da residência.|

**Observações:**
- O campo **CBO** deve ser preenchido obrigatoriamente no cadastro do empregado doméstico.
- O sistema deve apresentar a lista acima em um select com busca, exibindo código e descrição.
- O código CBO deve ser enviado exatamente conforme a tabela oficial do eSocial.
- Para funções não listadas acima, consultar a legislação vigente e a tabela CBO do eSocial.

---

## 5. Tooltips e Orientações de UI

- Todos os campos obrigatórios devem ser validados conforme o padrão do eSocial.
- Os tooltips devem ser exibidos em todos os campos para garantir clareza e acessibilidade.
- O cadastro deve ser acessível, responsivo e internacionalizável.
- Utilize sempre os tipos corretos (ex: datas, números, strings) e evite o uso de `any`.
- Siga o padrão de design e UX do projeto.

**Exemplo de Tooltip para o campo CBO:**
> CBO: "Selecione o código e a função do empregado conforme a Classificação Brasileira de Ocupações (CBO). Exemplo: 5121-05 - Empregado(a) doméstico(a)."

---

## 6. Referências
- [Tabela CBO eSocial](https://www.gov.br/esocial/pt-br/documentacao-tecnica/tabelas/tabela-1-cbo.pdf)
- [Manual do eSocial Doméstico](https://www.gov.br/esocial/pt-br/documentacao-tecnica)
- [Classificação Brasileira de Ocupações - MTE](http://www.mtecbo.gov.br/)

---

**Este manual é de uso obrigatório para todo o time de desenvolvimento do sistema DOM. Dúvidas ou sugestões devem ser discutidas com o time de produto e arquitetura.** 