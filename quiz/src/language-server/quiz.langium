grammar Quiz
hidden(WS, SL_COMMENT, ML_COMMENT)

Quiz:
	'quiz' (name = ID)? title = STRING
	// (imports += Import)*
	(parts += QuizPart)*
;

/*
Import: 
	'import' importedNamespace = QNameWithWildcard
;

QName:
  ID ('.' ID)*
;

QNameWithWildcard :
	QName  '.' '*'
;
AbstractQuizPart: QuizPart | QuizPartRef;

QuizPartRef:
	'part' 'ref' partRef = [QuizPart | QName]
;
*/

QuizPart:
	'part' (name = ID)? title = STRING
	(questions += QA)* 
;

/*
AbstractQA: QA | QARef;

QARef:
	'ref' qaRef = [QA | QName]
;
*/

QA:
	(name = ID)?
	q = Question '?'?
	a = Answer
;

Question: StringQuestion | XmlQuestion;

StringQuestion:
	question = STRING
;

XmlQuestion: xml = Xml;

Answer: OptionAnswer | OptionsAnswer;

OptionAnswer: SimpleAnswer | XmlAnswer;

SimpleAnswer: StringAnswer | RegexAnswer | NumberAnswer | BooleanAnswer;

StringAnswer: value = (ID | STRING) (regexp ?= '~')? (lower ?= '_')?;
RegexAnswer: '/' value = STRING '/';
NumberAnswer: value = INT;
BooleanAnswer: {BooleanAnswer} (value ?= 'yes' | 'no');

XmlAnswer:
	xml = Xml
;

OptionsAnswer: SingleOptionsAnswer | ManyOptionsAnswer;

Option: SingleBoxOption | SingleListOption | ManyOption;

SingleOptionsAnswer: SingleBoxOptionsAnswer | SingleListOptionsAnswer;

SingleBoxOptionsAnswer:
	(options += SingleBoxOption)+
;
SingleBoxOption returns Option:
	'(' '-'? |  (correct ?= ('x'|'v'))? ')' option = OptionAnswer
;

SingleListOptionsAnswer:
	(options += SingleListOption)+
;
SingleListOption returns Option:
	('-' | (correct ?= ('x'|'v'))) option = OptionAnswer
;

ManyOptionsAnswer:
	(options += ManyOption)+
;
ManyOption returns Option:
	'[' '-'? | (correct ?= ('x'|'v'))? ']' option = OptionAnswer
;

Xml:
	'<<' element = XmlElement '>>'
;

XmlContents:
	element = XmlElement
	post = XML_TEXT
;

XmlElement: XmlPIAnswerElement | XmlTagElement;

XmlPIAnswerElement:
	'?' answer = SimpleAnswer '?'
;

//XmlPIAnswerElement:
//	'!' '--' answer = SimpleAnswer '--'
//;

XmlTagElement:
	startTag = XmlTag ('/' |
		(pre = XML_TEXT (contents += XmlContents)* ('/' endTag = ID))
	)
;

XmlTag:
	name = ID (attributes += XmlAttribute)*	
;

XmlAttribute:
	name = ID '=' value = STRING
;

terminal XML_TEXT: />(<|([^<>][^<]*<))/;

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;
