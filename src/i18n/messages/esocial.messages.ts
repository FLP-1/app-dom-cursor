/**
 * Arquivo: esocial.messages.ts
 * Caminho: src/i18n/messages/esocial.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens para o módulo eSocial
 */

export const esocialMessages = {
  pt: {
    title: "eSocial",
    new: "Novo Evento",
    edit: "Editar Evento",
    delete: "Excluir Evento",
    list: "Lista de Eventos",
    form: {
      title: "Formulário de Evento eSocial",
      fields: {
        tipo: {
          label: "Tipo de Evento",
          placeholder: "Selecione o tipo de evento"
        },
        data: {
          label: "Data",
          placeholder: "Selecione a data"
        },
        descricao: {
          label: "Descrição",
          placeholder: "Digite a descrição"
        }
      }
    },
    validation: {
      tipo: {
        required: "Tipo de evento é obrigatório"
      },
      data: {
        required: "Data é obrigatória"
      },
      descricao: {
        required: "Descrição é obrigatória"
      }
    },
    success: {
      create: "Evento criado com sucesso!",
      update: "Evento atualizado com sucesso!",
      delete: "Evento excluído com sucesso!"
    },
    error: {
      create: "Erro ao criar evento",
      update: "Erro ao atualizar evento",
      delete: "Erro ao excluir evento",
      load: "Erro ao carregar eventos"
    }
  },
  en: {
    title: "eSocial",
    new: "New Event",
    edit: "Edit Event",
    delete: "Delete Event",
    list: "Event List",
    form: {
      title: "eSocial Event Form",
      fields: {
        tipo: {
          label: "Event Type",
          placeholder: "Select event type"
        },
        data: {
          label: "Date",
          placeholder: "Select date"
        },
        descricao: {
          label: "Description",
          placeholder: "Enter description"
        }
      }
    },
    validation: {
      tipo: {
        required: "Event type is required"
      },
      data: {
        required: "Date is required"
      },
      descricao: {
        required: "Description is required"
      }
    },
    success: {
      create: "Event created successfully!",
      update: "Event updated successfully!",
      delete: "Event deleted successfully!"
    },
    error: {
      create: "Error creating event",
      update: "Error updating event",
      delete: "Error deleting event",
      load: "Error loading events"
    }
  }
};
