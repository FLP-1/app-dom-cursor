import { ProjectRules } from './projectRules';
import { projectRulesConfig } from './projectRulesConfig';

/**
 * Validador das regras do projeto DOM
 */
export class ProjectRulesValidator {
  private rules: ProjectRules;

  constructor(rules: ProjectRules = projectRulesConfig) {
    this.rules = rules;
  }

  /**
   * Valida se todas as regras obrigatórias estão configuradas
   */
  public validateAll(): boolean {
    return (
      this.validateAnalysis() &&
      this.validateApproval() &&
      this.validateInnovation() &&
      this.validateReusability() &&
      this.validateCompliance() &&
      this.validateVisualIdentity() &&
      this.validateLayout() &&
      this.validatePersona() &&
      this.validateImplementation() &&
      this.validateLearning()
    );
  }

  /**
   * Valida as regras de análise
   */
  private validateAnalysis(): boolean {
    const { documentation } = this.rules.analysis;
    return (
      documentation.required.length > 0 &&
      documentation.format === 'markdown' &&
      !!documentation.structure.motivation &&
      documentation.structure.alternatives.length > 0 &&
      !!documentation.structure.justification &&
      !!documentation.structure.learning
    );
  }

  /**
   * Valida as regras de aprovação
   */
  private validateApproval(): boolean {
    const { workflow } = this.rules.approval;
    return (
      workflow.steps.length > 0 &&
      workflow.required.userApproval &&
      workflow.required.documentation &&
      workflow.required.justification
    );
  }

  /**
   * Valida as regras de inovação
   */
  private validateInnovation(): boolean {
    const { development } = this.rules.innovation;
    return (
      development.innovation.required &&
      development.innovation.documentation &&
      development.innovation.justification &&
      development.bestPractices.required &&
      development.bestPractices.documentation &&
      development.bestPractices.review
    );
  }

  /**
   * Valida as regras de reutilização
   */
  private validateReusability(): boolean {
    const { components } = this.rules.reusability;
    return (
      components.creation.checkExisting &&
      components.creation.documentation &&
      components.creation.testing &&
      components.usage.preferExisting &&
      components.usage.modification === 'documented' &&
      components.usage.versioning
    );
  }

  /**
   * Valida as regras de compliance
   */
  private validateCompliance(): boolean {
    const { data } = this.rules.compliance;
    return (
      data.protection.encryption &&
      data.protection.consent &&
      data.protection.retention &&
      data.protection.access &&
      data.documentation.required &&
      data.documentation.review === 'quarterly' &&
      data.documentation.updates === 'documented'
    );
  }

  /**
   * Valida as regras de identidade visual
   */
  private validateVisualIdentity(): boolean {
    const { design } = this.rules.visualIdentity;
    return (
      design.consistency.required &&
      design.consistency.documentation &&
      design.consistency.review &&
      design.elements.colors === 'palette' &&
      design.elements.typography === 'system' &&
      design.elements.spacing === 'grid' &&
      design.elements.components === 'library'
    );
  }

  /**
   * Valida as regras de layout
   */
  private validateLayout(): boolean {
    const { design } = this.rules.layout;
    return (
      design.style.elegant &&
      design.style.modern &&
      design.style.innovative &&
      design.style.professional &&
      design.elements.motivation &&
      design.elements.engagement &&
      design.elements.interaction
    );
  }

  /**
   * Valida as regras de personas
   */
  private validatePersona(): boolean {
    const { interaction } = this.rules.persona;
    return (
      interaction.personas.definition &&
      interaction.personas.testing &&
      interaction.personas.feedback &&
      interaction.communication.style === 'targeted' &&
      interaction.communication.marketing &&
      interaction.communication.pnl
    );
  }

  /**
   * Valida as regras de implementação
   */
  private validateImplementation(): boolean {
    const { development } = this.rules.implementation;
    return (
      development.steps.analysis &&
      development.steps.approval &&
      development.steps.implementation &&
      development.steps.review &&
      development.quality.testing &&
      development.quality.documentation &&
      development.quality.review
    );
  }

  /**
   * Valida as regras de aprendizado
   */
  private validateLearning(): boolean {
    const { documentation } = this.rules.learning;
    return (
      documentation.aspects.understanding &&
      documentation.aspects.training &&
      documentation.aspects.newApproaches &&
      documentation.aspects.insights &&
      documentation.format.clear &&
      documentation.format.structured &&
      documentation.format.accessible
    );
  }
} 