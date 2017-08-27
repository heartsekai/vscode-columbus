'use strict';

import { TextDocument, Position, Definition, DefinitionProvider, CancellationToken, Location, Range } from "vscode";

export default class WMSDefinitionProvider implements DefinitionProvider {
    public provideDefinition(document: TextDocument, position: Position, token: CancellationToken): Location {
        let keyword = document.getWordRangeAtPosition(position);

        if (!keyword) {
            return;
        }

        let name = document.getText(keyword);

        let regex = /goto (\w+)/mi;
        let match: RegExpExecArray = null;
        while (!token.isCancellationRequested &&(match = regex.exec(document.getText()))) {
            if (match[1] == name) {
                return new Location(document.uri, document.positionAt(match.index));
            }
        }

    }

}
