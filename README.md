# langium-quiz
This repo contains a [Langium](https://github.com/langium/langium) example DSL for quizes (multiple choice questions).

## Features
It provides a Langium DSL for entering quiz questions with answers (correct and options). Here's a sample:

```
quiz "Sample quiz"

part "String questions"

"What's the meaning of life?" 42

"Do you agree?" yes

"What is your favorite color?" (x) "Black" () "White"

"Which of these are colors?" [-] "Black" [] "White" [x] "Red" [x] "Green" [v] "Blue"

"Which of these colors are not part of CMYK"? -Cyan -Magenta -Yellow v Blue

part "XML questions"

<<p>What IT product has the following logo/icon: <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vscode_icon_130084.png"/></p>>? [-]Theia [x]"VS Code"
```

To "execute" the quiz, a (not-yet-finished) HTML generator is provided, that is triggered when a DSL file is changed or using the `Quiz: Generate HTML` command.

You can view the generated HTML in a preview pane using the `Quiz: Preview HTML` command.

## How

The repo was created based on the instructions provided in the [blog announcement](https://www.typefox.io/blog/langium-the-new-language-engineering-tool).

The the grammar was ported from an [Xtext project](https://git.it.ntnu.no/projects/TDT4250/repos/quiz/browse/no.hal.pg.quiz.xtext/src/no/hal/pg/quiz/xtext) and
the generator from an [Eclipse plugin project using Xtend](https://gitlab.stud.idi.ntnu.no/TDT4250/examples/-/tree/master/no.hal.quiz.html).

The preview pane implementation was based on https://dev.to/salesforceeng/how-to-build-a-vs-code-extension-for-markdown-preview-using-remark-processor-1169

## Next steps:

- complete the HTML generator, only a small part of the Xtext source has been ported
