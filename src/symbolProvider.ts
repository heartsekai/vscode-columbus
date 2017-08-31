'use strict';

import {SymbolInformation, SymbolKind, DocumentSymbolProvider, Location, TextDocument, Position, CancellationToken,Range} from 'vscode';

export default class WMSDocumentSymbolProvider implements DocumentSymbolProvider {
    public provideDocumentSymbols(document: TextDocument, token: CancellationToken): SymbolInformation[] {
        var body = document.getText();
        if (token.isCancellationRequested) {
            return undefined;
        }
        
        // Add all Blocks

        let regex = /(\[)(header|useradd|userrepeat|userremove|clientadd|clientrepeat|clientremove|serveradd|serverrepeat|serverremove)(\])/gim;
        let symbols = [];
        let e: RegExpExecArray = null;
        while (!token.isCancellationRequested && (e = regex.exec(body))) {
            symbols.push(
                new SymbolInformation(
                    e[1] + e[2] + e[3],
                    SymbolKind.Function,
                    new Range(document.positionAt(e.index + e[0].length), document.positionAt(e.index + e[0].length) )
                )
            );
        }

        // add all goto
        regex = /^\s*:(\w+)/gm;
        e = null;
        while (!token.isCancellationRequested && (e = regex.exec(body))) {
            symbols.push(
                new SymbolInformation(
                    e[1],
                    SymbolKind.Variable,
                    new Range(document.positionAt(e.index + e[0].length), document.positionAt(e.index + e[0].length) )
                )
            );
        }
        
        return symbols;
    }

}