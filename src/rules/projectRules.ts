/**
 * Project Rules - Regras do Projeto DOM
 * Este arquivo contém as definições de tipos e interfaces para as regras do projeto
 */

// Regras de Análise e Documentação
export interface AnalysisRules {
  documentation: {
    required: string[];
    format: 'markdown';
    structure: {
      motivation: string;
      alternatives: string[];
      justification: string;
      learning: string;
    };
  };
}

// Regras de Aprovação
export interface ApprovalRules {
  workflow: {
    steps: string[];
    required: {
      userApproval: boolean;
      documentation: boolean;
      justification: boolean;
    };
  };
}

// Regras de Inovação e Práticas
export interface InnovationRules {
  development: {
    innovation: {
      required: boolean;
      documentation: boolean;
      justification: boolean;
    };
    bestPractices: {
      required: boolean;
      documentation: boolean;
      review: boolean;
    };
  };
}

// Regras de Reutilização
export interface ReusabilityRules {
  components: {
    creation: {
      checkExisting: boolean;
      documentation: boolean;
      testing: boolean;
    };
    usage: {
      preferExisting: boolean;
      modification: 'documented';
      versioning: boolean;
    };
  };
}

// Regras de Compliance e LGPD
export interface ComplianceRules {
  data: {
    protection: {
      encryption: boolean;
      consent: boolean;
      retention: boolean;
      access: boolean;
    };
    documentation: {
      required: boolean;
      review: 'quarterly';
      updates: 'documented';
    };
  };
}

// Regras de Identidade Visual
export interface VisualIdentityRules {
  design: {
    consistency: {
      required: boolean;
      documentation: boolean;
      review: boolean;
    };
    elements: {
      colors: 'palette';
      typography: 'system';
      spacing: 'grid';
      components: 'library';
    };
  };
}

// Regras de Layout e UX
export interface LayoutRules {
  design: {
    style: {
      elegant: boolean;
      modern: boolean;
      innovative: boolean;
      professional: boolean;
    };
    elements: {
      motivation: boolean;
      engagement: boolean;
      interaction: boolean;
    };
  };
}

// Regras de Personas e Interação
export interface PersonaRules {
  interaction: {
    personas: {
      definition: boolean;
      testing: boolean;
      feedback: boolean;
    };
    communication: {
      style: 'targeted';
      marketing: boolean;
      pnl: boolean;
    };
  };
}

// Regras de Implementação
export interface ImplementationRules {
  development: {
    steps: {
      analysis: boolean;
      approval: boolean;
      implementation: boolean;
      review: boolean;
    };
    quality: {
      testing: boolean;
      documentation: boolean;
      review: boolean;
    };
  };
}

// Regras de Aprendizado
export interface LearningRules {
  documentation: {
    aspects: {
      understanding: boolean;
      training: boolean;
      newApproaches: boolean;
      insights: boolean;
    };
    format: {
      clear: boolean;
      structured: boolean;
      accessible: boolean;
    };
  };
}

// Exportação de todas as regras
export interface ProjectRules {
  analysis: AnalysisRules;
  approval: ApprovalRules;
  innovation: InnovationRules;
  reusability: ReusabilityRules;
  compliance: ComplianceRules;
  visualIdentity: VisualIdentityRules;
  layout: LayoutRules;
  persona: PersonaRules;
  implementation: ImplementationRules;
  learning: LearningRules;
} 