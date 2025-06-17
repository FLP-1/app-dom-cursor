/**
 * Arquivo: projectRulesConfig.ts
 * Caminho: src/rules/projectRulesConfig.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Configuração das regras do projeto DOM
 */

import { ProjectRules } from '@/rules/projectRules';

/**
 * Configuração das regras do projeto DOM
 */
export const projectRulesConfig: ProjectRules = {
  analysis: {
    documentation: {
      required: ['docs/*.txt'],
      format: 'markdown',
      structure: {
        motivation: 'Documentação clara dos motivos e objetivos',
        alternatives: ['Alternativa 1', 'Alternativa 2'],
        justification: 'Justificativa da escolha da solução',
        learning: 'Aspectos de aprendizado e insights'
      }
    }
  },
  approval: {
    workflow: {
      steps: [
        'proposta_inicial',
        'aprovacao_usuario',
        'implementacao',
        'revisao',
        'aprovacao_final'
      ],
      required: {
        userApproval: true,
        documentation: true,
        justification: true
      }
    }
  },
  innovation: {
    development: {
      innovation: {
        required: true,
        documentation: true,
        justification: true
      },
      bestPractices: {
        required: true,
        documentation: true,
        review: true
      }
    }
  },
  reusability: {
    components: {
      creation: {
        checkExisting: true,
        documentation: true,
        testing: true
      },
      usage: {
        preferExisting: true,
        modification: 'documented',
        versioning: true
      }
    }
  },
  compliance: {
    data: {
      protection: {
        encryption: true,
        consent: true,
        retention: true,
        access: true
      },
      documentation: {
        required: true,
        review: 'quarterly',
        updates: 'documented'
      }
    }
  },
  visualIdentity: {
    design: {
      consistency: {
        required: true,
        documentation: true,
        review: true
      },
      elements: {
        colors: 'palette',
        typography: 'system',
        spacing: 'grid',
        components: 'library'
      }
    }
  },
  layout: {
    design: {
      style: {
        elegant: true,
        modern: true,
        innovative: true,
        professional: true
      },
      elements: {
        motivation: true,
        engagement: true,
        interaction: true
      }
    }
  },
  persona: {
    interaction: {
      personas: {
        definition: true,
        testing: true,
        feedback: true
      },
      communication: {
        style: 'targeted',
        marketing: true,
        pnl: true
      }
    }
  },
  implementation: {
    development: {
      steps: {
        analysis: true,
        approval: true,
        implementation: true,
        review: true
      },
      quality: {
        testing: true,
        documentation: true,
        review: true
      }
    }
  },
  learning: {
    documentation: {
      aspects: {
        understanding: true,
        training: true,
        newApproaches: true,
        insights: true
      },
      format: {
        clear: true,
        structured: true,
        accessible: true
      }
    }
  }
}; 
