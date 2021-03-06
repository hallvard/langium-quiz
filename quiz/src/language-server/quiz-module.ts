import { createDefaultModule, DefaultModuleContext, inject, LangiumServices, Module, PartialLangiumServices } from 'langium';
import { Generator, QuizGenerator } from './quiz-generator';
import { QuizGeneratedModule } from './generated/module';
import { QuizValidationRegistry, QuizValidator } from './quiz-validator';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type QuizAddedServices = {
    validation: {
        QuizValidator: QuizValidator
    },
    generation: {
        QuizGenerator: Generator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type QuizServices = LangiumServices & QuizAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const QuizModule: Module<QuizServices, PartialLangiumServices & QuizAddedServices> = {
    validation: {
        ValidationRegistry: (injector) => new QuizValidationRegistry(injector),
        QuizValidator: () => new QuizValidator()
    },
    generation: {
        QuizGenerator: (injector) => new QuizGenerator(injector)
    }
};

/**
 * Inject the full set of language services by merging three modules:
 *  - Langium default services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 */
export function createQuizServices(context?: DefaultModuleContext): QuizServices {
    return inject(
        createDefaultModule(context),
        QuizGeneratedModule,
        QuizModule
    );
}
