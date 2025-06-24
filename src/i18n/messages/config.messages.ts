/**
 * Arquivo: config.messages.ts
 * Caminho: src/i18n/messages/config.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens centralizadas para o módulo de configurações
 */

export const configMessages = {
  pt: {
    header: {
      title: "Configurações",
      subtitle: "Gerencie suas preferências e configurações do sistema"
    },
    categories: {
      profile: "Perfil",
      notifications: "Notificações",
      security: "Segurança",
      appearance: "Aparência"
    },
    sections: {
      preferences: {
        title: "Preferências",
        fields: {
          theme: "Tema",
          language: "Idioma",
          notifications: "Notificações",
          autoUpdate: "Atualização Automática"
        },
        options: {
          light: "Claro",
          dark: "Escuro",
          system: "Sistema",
          portuguese: "Português",
          english: "Inglês"
        },
        save: "Salvar Preferências"
      },
      integrations: {
        title: "Integrações",
        fields: {
          googleDrive: "Google Drive",
          dropbox: "Dropbox",
          slack: "Slack"
        },
        save: "Salvar Integrações"
      },
      security: {
        title: "Segurança",
        fields: {
          twoFactorAuth: "Autenticação de Dois Fatores",
          loginAlerts: "Alertas de Login"
        },
        lastPasswordChange: "Última alteração de senha",
        save: "Salvar Configurações de Segurança"
      }
    },
    error: {
      loadData: "Erro ao carregar dados de configuração",
      savePreferences: "Erro ao salvar preferências",
      saveIntegrations: "Erro ao salvar integrações",
      saveSecurity: "Erro ao salvar configurações de segurança"
    },
    success: {
      preferencesSaved: "Preferências salvas com sucesso!",
      integrationsSaved: "Integrações salvas com sucesso!",
      securitySaved: "Configurações de segurança salvas com sucesso!"
    },
    validation: {
      theme: {
        required: "Tema é obrigatório"
      },
      language: {
        required: "Idioma é obrigatório"
      }
    },
    tooltips: {
      theme: "Escolha o tema visual do sistema",
      language: "Selecione o idioma de interface",
      notifications: "Ative ou desative notificações",
      autoUpdate: "Permitir atualizações automáticas",
      twoFactorAuth: "Adicionar camada extra de segurança",
      loginAlerts: "Receber alertas de login suspeito"
    }
  },
  en: {
    header: {
      title: "Settings",
      subtitle: "Manage your system preferences and configurations"
    },
    categories: {
      profile: "Profile",
      notifications: "Notifications",
      security: "Security",
      appearance: "Appearance"
    },
    sections: {
      preferences: {
        title: "Preferences",
        fields: {
          theme: "Theme",
          language: "Language",
          notifications: "Notifications",
          autoUpdate: "Auto Update"
        },
        options: {
          light: "Light",
          dark: "Dark",
          system: "System",
          portuguese: "Portuguese",
          english: "English"
        },
        save: "Save Preferences"
      },
      integrations: {
        title: "Integrations",
        fields: {
          googleDrive: "Google Drive",
          dropbox: "Dropbox",
          slack: "Slack"
        },
        save: "Save Integrations"
      },
      security: {
        title: "Security",
        fields: {
          twoFactorAuth: "Two-Factor Authentication",
          loginAlerts: "Login Alerts"
        },
        lastPasswordChange: "Last password change",
        save: "Save Security Settings"
      }
    },
    error: {
      loadData: "Error loading configuration data",
      savePreferences: "Error saving preferences",
      saveIntegrations: "Error saving integrations",
      saveSecurity: "Error saving security settings"
    },
    success: {
      preferencesSaved: "Preferences saved successfully!",
      integrationsSaved: "Integrations saved successfully!",
      securitySaved: "Security settings saved successfully!"
    },
    validation: {
      theme: {
        required: "Theme is required"
      },
      language: {
        required: "Language is required"
      }
    },
    tooltips: {
      theme: "Choose the visual theme of the system",
      language: "Select the interface language",
      notifications: "Enable or disable notifications",
      autoUpdate: "Allow automatic updates",
      twoFactorAuth: "Add extra security layer",
      loginAlerts: "Receive suspicious login alerts"
    }
  }
};
