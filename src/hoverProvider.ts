'use strict';

import * as vscode from 'vscode';

import {HoverProvider, Hover, MarkedString, TextDocument, CancellationToken, Position} from 'vscode';

let Library = require('./Library/Command')
console.log('We are in the class');

export default class WMSHoverProvider implements HoverProvider {
    /**
     * provideHover
     */
    public provideHover(document: TextDocument, position: Position, token: CancellationToken): Hover {
        let wordRange = document.getWordRangeAtPosition(position);
        
        if (!wordRange) {
            return;
        }

        let name = document.getText(wordRange);
        if (Library.Library[name]) {
            return new Hover(Library.Library[name].parameters, wordRange);
        }

    }

}
