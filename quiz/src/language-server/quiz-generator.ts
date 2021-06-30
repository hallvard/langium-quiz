import { AstNode, LangiumParser } from 'langium';
import { isQuiz, Quiz, QuizPart } from './generated/ast';
import { QuizServices } from './quiz-module';

export interface Generator {
    generate(quiz : string | AstNode) : string | undefined;
}

/**
 * Generator for HTML that implements Quiz.
 */
export class QuizGenerator implements Generator {

    private readonly parser: LangiumParser;

    constructor(services: QuizServices) {
        this.parser = services.parser.LangiumParser;
    }

    generate(quiz : string | AstNode) : string | undefined {
        let astNode = (typeof(quiz) == 'string' ? this.parser.parse(quiz).value : quiz);
        return (isQuiz(astNode) ? this.quiz2Html(astNode) : undefined);
    }

    quiz2Html(quiz : Quiz) : string {
        let title = (quiz.title || quiz.name);
        let html = 
`<html>
    <head>
	    <title>${title}</title>
	    <meta charset="utf-8"/>
    </head>
    <body>'''
		${quiz.parts.map((part : QuizPart) => this.quizPart2Html(part)).join("\n")}
        <script type="text/javascript">
        function isArray(o) {
            return o.length !== undefined;
        }

        function getInputElement(name) {
            return document.getElementById(name);
        }

        function hasModifier(s, mod) {
            return s.indexOf(mod) >= 0;
        }

        function checkInputEquals(input, prop, value, modifiers) {
            if (typeof input === 'string') {
                input = getInputElement(input);
            }
            var inputValue = input[prop];
            if (hasModifier(modifiers, '_')) {
                inputValue = inputValue.toLowerCase();
            }
            var matches = (inputValue == value);
            if (hasModifier(modifiers, '~')) {
                var regexpObject = new RegExp(value, "");
                matches = regexpObject.test(inputValue);
            }
            return [input, matches];
        }

        function validatedInput(result) {
            var input = result[0];
            if (isArray(input)) {
                for (var i = 0; i < result.length; i++) {
                    validatedInput(result[i]);
                }
                return;
            }
            var valid = true;
            for (var i = 1; i < result.length; i++) {
                if (! result[i]) {
                    valid = false;
                }
            }
            var color = "YellowGreen";
            if (! valid) {
                color = "Red";
            }
            input.style.backgroundColor = color;
        }
        ${quiz.parts.map((part : QuizPart) => this.quizPart2Js(part)).join("\n")}
        </script>
    </body>
</html>`
        return html;
    }

    quizPart2Js(part : QuizPart) : string {
        // generateCheckFunction
        return "";
    }

    quizPart2Html(part : QuizPart) : string {
        // generate
        let title = part.title || part.name;
        return `<h3>${title}</h3>`;
    }
}

/*
'''
	def dispatch void generate(QuizPartRef quizPartRef, StringBuilder stringBuilder) {
		generate(quizPartRef.partRef, stringBuilder)
	}

	def dispatch void generate(QuizPart quizPart, StringBuilder stringBuilder) {
		stringBuilder << "<hr/><h2>" << quizPart.title << "</h2>\n"
		stringBuilder << "<form id='" << quizPart.name << "'>\n"
		quizPart.questions.forEach[generate(it, stringBuilder)]
		stringBuilder << "</form>\n"
		stringBuilder << '''<p/><button onclick='check«quizPart.name.toFirstUpper»()'>Check «quizPart.title»</button>''' << "\n"
	}

	def dispatch void generateCheckFunction(QuizPartRef quizPartRef, StringBuilder stringBuilder) {
		generateCheckFunction(quizPartRef.partRef, stringBuilder)
	}
	def dispatch void generateCheckFunction(QuizPart quizPart, StringBuilder stringBuilder) {
		stringBuilder << '''
function check«quizPart.name.toFirstUpper»() {
	«FOR qa : quizPart.questions»
	validatedInput(check«name(qa).toFirstUpper»());
	«ENDFOR»
}
		'''
		quizPart.questions.forEach[generateCheckFunction(it, stringBuilder)]
	}

	def dispatch void generate(QARef qaRef, StringBuilder stringBuilder) {
		generate(qaRef.qaRef, stringBuilder)
	}
	def dispatch void generateCheckFunction(QARef qaRef, StringBuilder stringBuilder) {
		generateCheckFunction(qaRef.qaRef, stringBuilder)
	}

	def dispatch void generate(QA qa, StringBuilder stringBuilder) {
		stringBuilder << qa.q
		generateInput(qa.a, stringBuilder)
	}
	def dispatch void generateCheckFunction(QA qa, StringBuilder stringBuilder) {
		generateCheckFunction(qa.a, stringBuilder)
	}

	def dispatch void generateOutput(StringQuestion sq, StringBuilder stringBuilder) {
		stringBuilder << "	<p>" << sq.question << "</p>\n"
	}
	def dispatch void generateOutput(XmlQuestion xq, StringBuilder stringBuilder) {
		stringBuilder << xq.xml << "\n"
	}

	def dispatch void generateInput(Answer answer, StringBuilder stringBuilder) {
	}

	def void generateInputElement(Answer answer, String type, StringBuilder stringBuilder) {
		val name = name(answer)
		stringBuilder << '''	<input type='«type»' id='«name»' name='«name»'/>''' << '\n'
	}

	def dispatch void generateInput(StringAnswer answer, StringBuilder stringBuilder) {
		answer.generateInputElement("text", stringBuilder)
	}
	def dispatch void generateCheckFunction(StringAnswer answer, StringBuilder stringBuilder) {
		val modifiers = (if (answer.regexp) "~" else "") + (if (answer.ignoreCase) "_" else "")
		stringBuilder << '''
«answer.checkFunctionHead()» {
	return checkInputEquals('«answer.name»', 'value', '«answer.value»', '«modifiers»');
}
'''
	}

	def dispatch void generateInput(NumberAnswer answer, StringBuilder stringBuilder) {
		answer.generateInputElement("text", stringBuilder)
	}
	def dispatch void generateCheckFunction(NumberAnswer answer, StringBuilder stringBuilder) {
		stringBuilder << '''
«answer.checkFunctionHead()» {
	return checkInputEquals('«answer.name»', 'value', '«answer.value»', '');
}
'''
	}

	def dispatch void generateInput(BooleanAnswer answer, StringBuilder stringBuilder) {
		stringBuilder << '''
	<div id="«name(answer)»">
		<input type="radio" name="radio">Yes</input>
		<input type="radio" name="radio">No</input>
	</div>'''
	}
	def dispatch void generateCheckFunction(BooleanAnswer answer, StringBuilder stringBuilder) {
		stringBuilder << '''
«answer.checkFunctionHead()» {
	var input = getInputElement('«answer.name»');
	return [input, input.getElementsByTagName("input")[«if (Boolean.TRUE == answer.value) 0 else 1»].checked];
}
'''
	}

	def dispatch void generateXml(Xml xml, StringBuilder stringBuilder, (XmlPIAnswerElement, StringBuilder) => void piAnswerHandler) {
		xml.element.generateXml(stringBuilder, piAnswerHandler)
	}

	def dispatch void generateXml(XmlTagElement xml, StringBuilder stringBuilder, (XmlPIAnswerElement, StringBuilder) => void piAnswerHandler) {
		stringBuilder << '<'
		stringBuilder << xml.startTag.name
		for (attribute : xml.startTag.attributes) {
			stringBuilder << ' ' << attribute.name << ' "' + attribute.value << '"'
		}
		if (xml.endTag !== null) {
			stringBuilder << '>' << xml.pre.substring(1, xml.pre.length - 1)
			for (content : xml.contents) {
				content.generateXml(stringBuilder, piAnswerHandler)
			}
			stringBuilder << '<' << xml.endTag << '/'
		} else {
			stringBuilder << '/'
		}
		stringBuilder << '>'
	}

	def dispatch void generateXml(XmlContents xml, StringBuilder stringBuilder, (XmlPIAnswerElement, StringBuilder) => void piAnswerHandler) {
		if (xml.element !== null) {
			xml.element.generateXml(stringBuilder, piAnswerHandler)
			stringBuilder << xml.post.substring(1, xml.post.length - 1)
		}
	}

	def dispatch void generateXml(XmlPIAnswerElement xml, StringBuilder stringBuilder, (XmlPIAnswerElement, StringBuilder) => void piAnswerHandler) {
		piAnswerHandler.apply(xml, stringBuilder)
	}

	def dispatch void generateInput(XmlAnswer answer, StringBuilder stringBuilder) {
		generateXml(answer.xml, stringBuilder) [
			piAnswer, sb |
			piAnswer.answer.generateInput(stringBuilder)
		]
	}
	def dispatch void generateCheckFunction(XmlAnswer answer, StringBuilder stringBuilder) {
		val piAnswers = <XmlPIAnswerElement>newArrayList
		Iterators.addAll(piAnswers, answer.eAllContents.filter(XmlPIAnswerElement))
		for (piAnswer : piAnswers) {
			piAnswer.answer.generateCheckFunction(stringBuilder)
		}
		stringBuilder << '''
«answer.checkFunctionHead()» {
	return [«FOR piAnswer : piAnswers SEPARATOR ", "»«piAnswer.answer.checkFunctionName»()«ENDFOR»];
}
'''
	}

	def void generateOptionsElement(OptionsAnswer answer, StringBuilder stringBuilder, String outerTag, String innerTag, String innerAttr, String... extraOptions) {
		val name = name(answer)
		stringBuilder << '''	<div id="«name»">''' << '\n'
		if (outerTag !== null) {
			stringBuilder << '''	<«outerTag»>''' << '\n'
		}
		for (option : extraOptions) {
			stringBuilder << '''	<«innerTag» «innerAttr ?: ""»>«option»</«innerTag»>''' << '<br/>\n'
		}
		for (option : answer.options) {
			stringBuilder << '''	<«innerTag» «innerAttr ?: ""» name='«name»'>'''
			generate(option, stringBuilder)
			stringBuilder << '''	</«innerTag»>''' << '<br/>\n'
		}
		if (outerTag !== null) {
			stringBuilder << '''	</«outerTag»>''' << '\n'
		}
		stringBuilder << '''	</div>'''
	}

	def dispatch void generateInput(SingleOptionsAnswer answer, StringBuilder stringBuilder) {
		generateOptionsElement(answer, stringBuilder, null, "input", "type='radio'")
	}

	def dispatch void generateInput(ManyOptionsAnswer answer, StringBuilder stringBuilder) {
		generateOptionsElement(answer, stringBuilder, null, "input", "type='checkbox'")
	}

	def dispatch void generateCheckFunction(OptionsAnswer answer, StringBuilder stringBuilder) {
		stringBuilder << '''
«answer.checkFunctionHead()» {
	var input = getInputElement('«answer.name»');
	var inputs = input.getElementsByTagName("input")
	return [input'''
		var i = 0
		for (option : answer.options) {
			stringBuilder << ''', inputs[«i»].checked === «option.correct»'''
			i = i + 1
		}
		stringBuilder << '''];
}
'''
	}

//	def dispatch void generateInput(SingleListOptionsAnswer answer, StringBuilder stringBuilder) {
//		generateOptionsElement(answer, stringBuilder, "select", "option", null, "")
//	}

//	def dispatch void generateCheckFunction(SingleListOptionsAnswer answer, StringBuilder stringBuilder) {
//		stringBuilder << '''
//«answer.checkFunctionHead()» {
//	var input = getInputElement('«answer.name»');
//	return [input, input.getElementsByTagName('select')[0].value == "'''
//		generate(answer.options.findFirst[correct], stringBuilder);
//		stringBuilder << '"];
//}
//'
//	}

	def dispatch void generate(Option option, StringBuilder stringBuilder) {
		stringBuilder << option.option
	}

	def dispatch void generateOutput(StringAnswer answer, StringBuilder stringBuilder) {
		stringBuilder << answer.value
	}
	def dispatch void generateOutput(NumberAnswer answer, StringBuilder stringBuilder) {
		stringBuilder << answer.value
	}
	def dispatch void generateOutput(BooleanAnswer answer, StringBuilder stringBuilder) {
		stringBuilder << if (answer.value) "yes" else "no"
	}

	def dispatch void generateOutput(XmlAnswer answer, StringBuilder stringBuilder) {
		stringBuilder << answer.xml
	}

	def dispatch void generateOutput(Xml xml, StringBuilder stringBuilder) {
		stringBuilder << "<" << xml.element.toString << ">" 
	}

	//

	def String checkFunctionName(Answer answer) {
		"check" + name(answer).toFirstUpper
	}

	def String checkFunctionHead(Answer answer) {
		"function " + checkFunctionName(answer) + "()"
	}

	// << operator
	def StringBuilder operator_doubleLessThan(StringBuilder stringBuilder, EObject eObject) {
		generateOutput(eObject, stringBuilder)
		return stringBuilder;
	}

	// << operator
	def static StringBuilder operator_doubleLessThan(StringBuilder stringBuilder, Object o) {
		return stringBuilder.append(o);
	}

	//
	
//	def asSource(EObject eObject) {
//		NodeModelUtils.getTokenText(NodeModelUtils.getNode(eObject))
//	}
	
	def String name(EObject o, String prefix) {
		prefix + o.eContainer.eContents.indexOf(o) 
	}

	def String name(AbstractQA qa) {
		val qaName = switch (qa) {
			QARef : qa.qaRef.name
			QA : qa.name
		} ?: name(qa, "_q_")
		qa.ancestor(QuizPart).name + "_" + qaName 
	}

	def String name(Answer answer) {
		val name = name(answer.ancestor(QA))
		if (answer.ancestor(XmlPIAnswerElement) !== null)
			name + Util.relativeName(answer, QA)
		else
			name
	}
		
	def static <T> T ancestor(EObject eObject, Class<T> c) {
   		var e = eObject
		while (e !== null) {
			if (c.isInstance(e)) {
				return e as T
			}
			e = e.eContainer
   		}
   		null
   	}}
*/