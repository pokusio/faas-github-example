'use strict'

/*
import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as arrayUtils from 'util';
*/
const fs = require('fs')
const shelljs = require('shelljs') // npm i -s shelljs@0.8.5


/***************************************************************************************************
 *  LIST GITLAB ISSUES
 ************************************************************************************
 *    -> {@parameter gitlabRepoName: string} = the gitlab repository name, in which to search for Pull Requests
 *    -> {@parameter gitlabOrgName: string} = the gitlab organization or user name. The gitlab repository into which we want to search for Pull Requests, is in that Gitlab Organization or User's personal repositories.
 *    -> {@parameter issues_author: string} = author of the Pull Request, e.g. "@Jean-Baptiste-Lasselle"
 *    -> {@parameter issuesLabels} = arrays of strings, the gitlab labels you want to filter the search with
 *    -> {@parameter issuesSearchStr} = the gitlab search string you want to look up the issue(s) with
 *    -> {@parameter issuesSearchPaginationLimit} = max number of results
 **/
const getGitlabIssues = (issueLabels, issueLabelsStr, issueSearchStr, issueSearchPaginationLimit) {
  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // IF THIS IS A GET HTTP METHOD : List all ISSUEs
  /****
   *
   * -> let issueLabels = [ "devops", "kubernetes" , "bug"]
   * -> let issueLabelsStr = issuesLabels.join()
   * -> let issueSearchStr = "docker-compose up"
   * -> let issueSearchPaginationLimit = 3;
   *
   * -> let issueLabels = event.data.gitlab_issue_labels
   * -> let issueLabelsStr = issueLabels.join()
   * -> let issueSearchStr = event.data.gitlab_issue_search_str
   * -> let issueSearchPaginationLimit = event.data.gitlab_issue_search_pagination_limit;
   *
   ***/
  let gitlabCliListIssuesCmdResultStdOUT = "no issues were found"
  let gitlabCliListIssuesCmdResult = shelljs.exec(`gitlabcli issue list -l "${issueLabelsStr}" -L ${issueSearchPaginationLimit} -S "${issueSearchStr}" `);
  if (gitlabCliListIssuesCmdResult.code !== 0) {
    // throw new Error(`{[  - - PokusFaasNode16]} - [Gitlab CLI] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + gitlabCliListIssuesCmdResult.stderr + "] ")
    console.log(`{[  - - PokusFaasNode16]} - [Gitlab CLI] - successfully searched issues labelled "${issueLabelsStr}", with search query "${issueSearchStr}", and returned less than "${issueSearchPaginationLimit}" results  !!! :D`)
    gitlabCliListIssuesCmdResultStdOUT = gitlabCliListIssuesCmdResult.stdout;
  } else {
    gitlabCliListIssuesCmdResultStdOUT = gitlabCliListIssuesCmdResult.stdout;
    let gitlabCliListIssuesCmdResultStdERR = gitlabCliListIssuesCmdResult.stderr;
    gitlabCliListIssuesCmdResultStdOUT = gitlabCliListIssuesCmdResultStdOUT.trim();
    console.log(`{[  - - PokusFaasNode16]} - [gitlabCliListIssuesCmdResultStdOUT=[${gitlabCliListIssuesCmdResultStdOUT}]] and [gitlabCliListIssuesCmdResult.stdout=[${gitlabCliListIssuesCmdResult.stdout}]]`)
  }

}


/***************************************************************************************************
 *  CREATE GITLAB PULL REQUEST
 ************************************************************************************
 *    -> {@parameter gitlabRepoName: string} = the gitlab repository name, in which to create the Pull Request
 *    -> {@parameter gitlabOrgName: string} = the gitlab organization or user name. The gitlab repository into which we want to create the Pull Request, is in that Gitlab Organization or User's personal repositories.
 *    -> {@parameter issueLabels: string[]} = arrays of strings, the gitlab labels you want to filter the search with.
 *    -> {@parameter issueSearchStr: string} = the gitlab search string you want to look up the issue(s) with
 *    -> {@parameter issueSearchPaginationLimit: number} = max number of results
 *    -> {@parameter issue_title: string} = Pull Request title
 *    -> {@parameter issue_desc_md_file: string} = Pull Request description : the Markdown to insert, is in the File at the specified path
 *    -> {@parameter is_draft: boolean} = boolean, if false the pull request will nt be created as a draft, defaults to false.
 *
 **/

const createGitlabIssue = (gitlabRepoName/*: string*/,
                           gitlabOrgName/*: string*/,
                           issueLabels/*: string[]*/,
                           issueSearchStr/*: string*/,
                           issueSearchPaginationLimit/*: number*/,
                           issue_title/*: string*/,
                           issue_desc_md_file/*: string*/,
                           is_draft/*: boolean*/) {
  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  //

  let curlNetTestCmdResult = shelljs.exec(`gitlabcli issue create -l devops -t "issue created with gitlab cli" -m "Release_0.0.0" -p "${event.body.gitlab_org_name}/${event.body.gitlab_repo_name}"`);
  if (curlNetTestCmdResult.code !== 0) {
    // throw new Error(`{[  - - PokusFaasNode16]} - [Gitlab CLI] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + curlNetTestCmdResult.stderr + "] ")
    console.log(`{[  - - PokusFaasNode16]} - [Gitlab CLI] - successfully pokus-tested-network !!! :D`)
  } else {
    let curlNetTestCmdResultStdOUT = curlNetTestCmdResult.stdout;
    curlNetTestCmdResultStdOUT = curlNetTestCmdResultStdOUT.trim();
    console.log(`{[  - - PokusFaasNode16]} -  [curlNetTestCmdResultStdOUT=[${curlNetTestCmdResultStdOUT}]] and [curlNetTestCmdResult.stdout=[${curlNetTestCmdResult.stdout}]]`)
  }
  /// #
}
