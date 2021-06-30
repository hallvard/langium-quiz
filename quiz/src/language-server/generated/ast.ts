/******************************************************************************
 * This file was generated by langium-cli 0.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { AstNode, AstReflection, isAstNode } from 'langium';

export interface Answer extends AstNode {
    readonly $container: QA;
}

export const Answer = 'Answer';

export function isAnswer(item: unknown): item is Answer {
    return reflection.isInstance(item, Answer);
}

export interface Option extends AstNode {
    readonly $container: OptionsAnswer | SingleOptionsAnswer;
    correct: boolean
    option: OptionAnswer
}

export const Option = 'Option';

export function isOption(item: unknown): item is Option {
    return reflection.isInstance(item, Option);
}

export interface OptionAnswer extends AstNode {
    readonly $container: Option;
    xml: Xml
}

export const OptionAnswer = 'OptionAnswer';

export function isOptionAnswer(item: unknown): item is OptionAnswer {
    return reflection.isInstance(item, OptionAnswer);
}

export interface OptionsAnswer extends AstNode {
    options: Array<Option>
}

export const OptionsAnswer = 'OptionsAnswer';

export function isOptionsAnswer(item: unknown): item is OptionsAnswer {
    return reflection.isInstance(item, OptionsAnswer);
}

export interface QA extends AstNode {
    readonly $container: QuizPart;
    a: Answer
    name: string
    q: Question
}

export const QA = 'QA';

export function isQA(item: unknown): item is QA {
    return reflection.isInstance(item, QA);
}

export interface Question extends AstNode {
    readonly $container: QA;
}

export const Question = 'Question';

export function isQuestion(item: unknown): item is Question {
    return reflection.isInstance(item, Question);
}

export interface Quiz extends AstNode {
    name: string
    parts: Array<QuizPart>
    title: string
}

export const Quiz = 'Quiz';

export function isQuiz(item: unknown): item is Quiz {
    return reflection.isInstance(item, Quiz);
}

export interface QuizPart extends AstNode {
    readonly $container: Quiz;
    name: string
    questions: Array<QA>
    title: string
}

export const QuizPart = 'QuizPart';

export function isQuizPart(item: unknown): item is QuizPart {
    return reflection.isInstance(item, QuizPart);
}

export interface SimpleAnswer extends AstNode {
    readonly $container: XmlPIAnswerElement;
    value: string
}

export const SimpleAnswer = 'SimpleAnswer';

export function isSimpleAnswer(item: unknown): item is SimpleAnswer {
    return reflection.isInstance(item, SimpleAnswer);
}

export interface SingleOptionsAnswer extends AstNode {
    options: Array<Option>
}

export const SingleOptionsAnswer = 'SingleOptionsAnswer';

export function isSingleOptionsAnswer(item: unknown): item is SingleOptionsAnswer {
    return reflection.isInstance(item, SingleOptionsAnswer);
}

export interface Xml extends AstNode {
    readonly $container: XmlQuestion | OptionAnswer;
    element: XmlElement
}

export const Xml = 'Xml';

export function isXml(item: unknown): item is Xml {
    return reflection.isInstance(item, Xml);
}

export interface XmlAttribute extends AstNode {
    readonly $container: XmlTag;
    name: string
    value: string
}

export const XmlAttribute = 'XmlAttribute';

export function isXmlAttribute(item: unknown): item is XmlAttribute {
    return reflection.isInstance(item, XmlAttribute);
}

export interface XmlContents extends AstNode {
    readonly $container: XmlTagElement;
    element: XmlElement
    post: string
}

export const XmlContents = 'XmlContents';

export function isXmlContents(item: unknown): item is XmlContents {
    return reflection.isInstance(item, XmlContents);
}

export interface XmlElement extends AstNode {
    readonly $container: Xml | XmlContents;
}

export const XmlElement = 'XmlElement';

export function isXmlElement(item: unknown): item is XmlElement {
    return reflection.isInstance(item, XmlElement);
}

export interface XmlTag extends AstNode {
    readonly $container: XmlTagElement;
    attributes: Array<XmlAttribute>
    name: string
}

export const XmlTag = 'XmlTag';

export function isXmlTag(item: unknown): item is XmlTag {
    return reflection.isInstance(item, XmlTag);
}

export interface XmlAnswer extends OptionAnswer {
}

export const XmlAnswer = 'XmlAnswer';

export function isXmlAnswer(item: unknown): item is XmlAnswer {
    return reflection.isInstance(item, XmlAnswer);
}

export interface ManyOptionsAnswer extends OptionsAnswer {
}

export const ManyOptionsAnswer = 'ManyOptionsAnswer';

export function isManyOptionsAnswer(item: unknown): item is ManyOptionsAnswer {
    return reflection.isInstance(item, ManyOptionsAnswer);
}

export interface StringQuestion extends Question {
    question: string
}

export const StringQuestion = 'StringQuestion';

export function isStringQuestion(item: unknown): item is StringQuestion {
    return reflection.isInstance(item, StringQuestion);
}

export interface XmlQuestion extends Question {
    xml: Xml
}

export const XmlQuestion = 'XmlQuestion';

export function isXmlQuestion(item: unknown): item is XmlQuestion {
    return reflection.isInstance(item, XmlQuestion);
}

export interface BooleanAnswer extends SimpleAnswer {
}

export const BooleanAnswer = 'BooleanAnswer';

export function isBooleanAnswer(item: unknown): item is BooleanAnswer {
    return reflection.isInstance(item, BooleanAnswer);
}

export interface NumberAnswer extends SimpleAnswer {
}

export const NumberAnswer = 'NumberAnswer';

export function isNumberAnswer(item: unknown): item is NumberAnswer {
    return reflection.isInstance(item, NumberAnswer);
}

export interface RegexAnswer extends SimpleAnswer {
}

export const RegexAnswer = 'RegexAnswer';

export function isRegexAnswer(item: unknown): item is RegexAnswer {
    return reflection.isInstance(item, RegexAnswer);
}

export interface StringAnswer extends SimpleAnswer {
    lower: boolean
    regexp: boolean
}

export const StringAnswer = 'StringAnswer';

export function isStringAnswer(item: unknown): item is StringAnswer {
    return reflection.isInstance(item, StringAnswer);
}

export interface SingleBoxOptionsAnswer extends SingleOptionsAnswer {
}

export const SingleBoxOptionsAnswer = 'SingleBoxOptionsAnswer';

export function isSingleBoxOptionsAnswer(item: unknown): item is SingleBoxOptionsAnswer {
    return reflection.isInstance(item, SingleBoxOptionsAnswer);
}

export interface SingleListOptionsAnswer extends SingleOptionsAnswer {
}

export const SingleListOptionsAnswer = 'SingleListOptionsAnswer';

export function isSingleListOptionsAnswer(item: unknown): item is SingleListOptionsAnswer {
    return reflection.isInstance(item, SingleListOptionsAnswer);
}

export interface XmlPIAnswerElement extends XmlElement {
    answer: SimpleAnswer
}

export const XmlPIAnswerElement = 'XmlPIAnswerElement';

export function isXmlPIAnswerElement(item: unknown): item is XmlPIAnswerElement {
    return reflection.isInstance(item, XmlPIAnswerElement);
}

export interface XmlTagElement extends XmlElement {
    contents: Array<XmlContents>
    endTag: string
    pre: string
    startTag: XmlTag
}

export const XmlTagElement = 'XmlTagElement';

export function isXmlTagElement(item: unknown): item is XmlTagElement {
    return reflection.isInstance(item, XmlTagElement);
}

export type QuizAstType = 'Answer' | 'Option' | 'OptionAnswer' | 'OptionsAnswer' | 'QA' | 'Question' | 'Quiz' | 'QuizPart' | 'SimpleAnswer' | 'SingleOptionsAnswer' | 'Xml' | 'XmlAttribute' | 'XmlContents' | 'XmlElement' | 'XmlTag' | 'XmlAnswer' | 'ManyOptionsAnswer' | 'StringQuestion' | 'XmlQuestion' | 'BooleanAnswer' | 'NumberAnswer' | 'RegexAnswer' | 'StringAnswer' | 'SingleBoxOptionsAnswer' | 'SingleListOptionsAnswer' | 'XmlPIAnswerElement' | 'XmlTagElement';

export type QuizAstReference = never;

export class QuizAstReflection implements AstReflection {

    getAllTypes(): string[] {
        return ['Answer', 'Option', 'OptionAnswer', 'OptionsAnswer', 'QA', 'Question', 'Quiz', 'QuizPart', 'SimpleAnswer', 'SingleOptionsAnswer', 'Xml', 'XmlAttribute', 'XmlContents', 'XmlElement', 'XmlTag', 'XmlAnswer', 'ManyOptionsAnswer', 'StringQuestion', 'XmlQuestion', 'BooleanAnswer', 'NumberAnswer', 'RegexAnswer', 'StringAnswer', 'SingleBoxOptionsAnswer', 'SingleListOptionsAnswer', 'XmlPIAnswerElement', 'XmlTagElement'];
    }

    isInstance(node: unknown, type: string): boolean {
        return isAstNode(node) && this.isSubtype(node.$type, type);
    }

    isSubtype(subtype: string, supertype: string): boolean {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            case XmlAnswer: {
                return this.isSubtype(OptionAnswer, supertype);
            }
            case ManyOptionsAnswer: {
                return this.isSubtype(OptionsAnswer, supertype);
            }
            case StringQuestion:
            case XmlQuestion: {
                return this.isSubtype(Question, supertype);
            }
            case BooleanAnswer:
            case NumberAnswer:
            case RegexAnswer:
            case StringAnswer: {
                return this.isSubtype(SimpleAnswer, supertype);
            }
            case SingleBoxOptionsAnswer:
            case SingleListOptionsAnswer: {
                return this.isSubtype(SingleOptionsAnswer, supertype);
            }
            case XmlPIAnswerElement:
            case XmlTagElement: {
                return this.isSubtype(XmlElement, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(referenceId: QuizAstReference): string {
        switch (referenceId) {
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }
}

export const reflection = new QuizAstReflection();