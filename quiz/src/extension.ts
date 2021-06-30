import * as vscode from 'vscode';
import * as path from 'path';
import { workspace } from 'vscode';
import { commands } from 'vscode';
import {
    LanguageClient, LanguageClientOptions, ServerOptions, TransportKind
} from 'vscode-languageclient/node';
import { TextEncoder } from 'util';
import { QuizServices, createQuizServices } from './language-server/quiz-module';

let quizFileWatcher : vscode.FileSystemWatcher;
let client: LanguageClient;

let quizServices: QuizServices;

// This function is called when the extension is activated.
export function activate(context: vscode.ExtensionContext): void {
    quizServices = createQuizServices();
    quizFileWatcher = workspace.createFileSystemWatcher('**/*.quiz');
    let quizGeneratorHandler = (uri: vscode.Uri) => {
        generateHtml(uri);
    };
    quizFileWatcher.onDidChange(quizGeneratorHandler);
    quizFileWatcher.onDidCreate(quizGeneratorHandler);
    client = startLanguageClient(context);

    context.subscriptions.push(quizFileWatcher);
    context.subscriptions.push(commands.registerCommand('quiz.generateHtml', (uri: vscode.Uri) => {
        if (! uri) {
            let documentUri = vscode.window.activeTextEditor?.document.uri;
            if (documentUri) {
                uri = documentUri;
            }
        }
        if (uri) {
            generateHtml(uri);
        }
    }));
}

// This function is called when the extension is deactivated.
export function deactivate(): Thenable<void> | undefined {
    if (client) {
        return client.stop();
    }
    return undefined;
}

function startLanguageClient(context: vscode.ExtensionContext): LanguageClient {
    const serverModule = context.asAbsolutePath(path.join('out', 'language-server', 'main'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'quiz' }],
        synchronize: {
            // Notify the server about file changes to files contained in the workspace
            fileEvents: quizFileWatcher
        }
    };

    // Create the language client and start the client.
    const client = new LanguageClient(
        'quiz',
        'Quiz',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
    return client;
}

function generateHtml(uri: vscode.Uri) {
    vscode.workspace.openTextDocument(uri).then((document) => {
        if (document.languageId == "quiz") {
            let generator = quizServices.generation.QuizGenerator;
            let html = generator.generate(document.getText());
            workspace.fs.writeFile(vscode.Uri.file(uri.fsPath + ".html"), new TextEncoder().encode(html));
        }
    });
}
