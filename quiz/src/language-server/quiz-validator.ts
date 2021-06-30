import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { QuizAstType, XmlTagElement } from './generated/ast';
import { QuizServices } from './quiz-module';

/**
 * Map AST node types to validation checks.
 */
type QuizChecks = { [type in QuizAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class QuizValidationRegistry extends ValidationRegistry {
    constructor(services: QuizServices) {
        super(services);
        const validator = services.validation.QuizValidator;
        const checks: QuizChecks = {
            XmlTagElement: validator.endTagMatchesStartTag
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class QuizValidator {

    endTagMatchesStartTag(xmlTagElement: XmlTagElement, accept: ValidationAcceptor): void {
        if (xmlTagElement.endTag && xmlTagElement.startTag.name != xmlTagElement.endTag) {
            accept('error', 'End tag must match start tag.', { node: xmlTagElement, property: 'endTag' });
        }
	}

}
