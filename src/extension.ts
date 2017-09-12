'use strict';

import * as vscode from 'vscode';
import { workspace } from "vscode";

import {Issues} from "./Issues";
import { IssueItemProvideer } from "./issueTreeProvider";

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension activated ...')

    let disposable = vscode.commands.registerCommand('extension.ghc', () => {
   
        const issues = new Issues(workspace.workspaceFolders[0].uri.path)
        issues.getIssues().then(res=>{
            console.log(res)
        })

        const issueItemProvider = new IssueItemProvideer(issues)
        vscode.window.registerTreeDataProvider('ghc.issue.treeView',issueItemProvider)

        console.log(workspace.workspaceFolders[0].uri.path)
        vscode.window.showInformationMessage('ghc command issued ');
    })

    context.subscriptions.push(disposable);
}

export function deactivate() {
}