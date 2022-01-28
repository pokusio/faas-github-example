'use strict'

/*
import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as arrayUtils from 'util';
*/
const fs = require('fs')
const shelljs = require('shelljs') // npm i -s shelljs@0.8.5





/***************************************************************************************************
 *  LIST GITHUB PULL REQUESTS
 ************************************************************************************
 *    -> {@parameter ghRepoName: string} = the github repository name, in which to search for Pull Requests
 *    -> {@parameter ghOrgName: string} = the github organization or user name. The github repository into which we want to search for Pull Requests, is in that Github Organization or User's personal repositories.
 *    -> {@parameter pr_author: string} = author of the Pull Request, e.g. "@Jean-Baptiste-Lasselle"
 *    -> {@parameter prAssignees: string[]} = array of assignees of the Pull Request, e.g. <code>[ "@Jean-Baptiste-Lasselle", "@Yatar", "@ashtonian"]</code>
 *    -> {@parameter prLabels} = arrays of strings, the github labels you want to filter the search with
 *    -> {@parameter prSearchStr} = the github search string you want to look up the issue(s) with
 *    -> {@parameter prSearchPaginationLimit} = max number of results
 **/
const listGithubPullRequests = (ghOrgName/*: string*/,
                                ghRepoName/*: string*/,
                                pr_author/*: string*/,
                                prAssignees/*: string[]*/,
                                prLabels/*: string[]*/,
                                prSearchStr/*: string*/,
                                prSearchPaginationLimit/*: number*/) {
  /****
   * -> let ghOrgName = `${event.data.gh_org_name}`
   * -> let ghRepoName = `${event.data.gh_repo_name}`
   * -> let prLabels = [ "devops", "kubernetes" , "bug"]
   * -> let prAssignees = [ "@Jean-Baptiste-Lasselle", "@Yatar", "@ashtonian"]
   * -> let prSearchStr = "docker-compose up"
   * -> let prSearchPaginationLimit = 3;
   ***/
  /****
   * -> let ghOrgName = `${event.data.gh_org_name}`
   * -> let ghRepoName = `${event.data.gh_repo_name}`
   * -> let prLabels = event.data.pr_labels
   * -> let prAssignees = event.data.gh_pr_assignees
   * -> let prSearchStr = `${event.data.pr_search_str}`
   * -> let prSearchPaginationLimit = event.data.pr_search_pagination_limit;
   ***/
   let prLabelsStr = prLabels.join()
   let prAssigneesStr = prAssignees.join()
   let ghCliListPRCmdResult = shelljs.exec(`ghcli pr list -a "${prAssigneesStr}" -A "${pr_author}" -l "${prLabelsStr}" -L ${prSearchPaginationLimit} -S "${prSearchStr}" -p ${ghOrgName}/${ghRepoName}`);
   if (ghCliListPRCmdResult.code !== 0) {
     // throw new Error(`{[  - - PokusFaasNode16]} - [Github CLI] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + ghCliListPRCmdResult.stderr + "] ")
     console.log(`{[  - - PokusFaasNode16]} - [Github CLI] - successfully pokus-tested-network !!! :D`)
   } else {
     let ghCliListPRCmdResultStdOUT = ghCliListPRCmdResult.stdout;
     let ghCliListPRCmdResultStdERR = ghCliListPRCmdResult.stderr;
     ghCliListPRCmdResultStdOUT = ghCliListPRCmdResultStdOUT.trim();
     console.log(`{[  - - PokusFaasNode16]} -  [ghCliListPRCmdResultStdOUT=[${ghCliListPRCmdResultStdOUT}]] and [ghCliListPRCmdResult.stdout=[${ghCliListPRCmdResult.stdout}]]`)
   }

}

/***************************************************************************************************
 *  CREATE GITHUB PULL REQUEST
 ************************************************************************************
 *    -> {@parameter ghRepoName: string} = the github repository name, in which to create the Pull Request
 *    -> {@parameter ghOrgName: string} = the github organization or user name. The github repository into which we want to create the Pull Request, is in that Github Organization or User's personal repositories.
 *    -> {@parameter prLabels: string[]} = arrays of strings, the github labels you want to filter the search with.
 *    -> {@parameter prSearchStr: string} = the github search string you want to look up the issue(s) with
 *    -> {@parameter prSearchPaginationLimit: number} = max number of results
 *    -> {@parameter pr_title: string} = Pull Request title
 *    -> {@parameter pr_desc_md_file: string} = Pull Request description : the Markdown to insert, is in the File at the specified path
 *    -> {@parameter is_draft: boolean} = boolean, if false the pull request will nt be created as a draft, defaults to false.
 *
 **/

const createGithubPullRequest = (ghRepoName/*: string*/,
                                 ghOrgName/*: string*/,
                                 prLabels/*: string[]*/,
                                 prSearchStr/*: string*/,
                                 prSearchPaginationLimit/*: number*/,
                                 pr_title/*: string*/,
                                 pr_desc_md_file/*: string*/,
                                 is_draft/*: boolean*/) {
  /****
   * -> let prLabels = [ "devops", "kubernetes" , "bug"]
   * -> let prLabelsStr = prLabels.join()
   * -> let prSearchStr = "docker-compose up"
   * -> let prSearchPaginationLimit = 3;
   ***/

  /*******************************************************************************************
   *
   *
   *   Github CLI - [2.4.0]
   *
   *   Usage:  gh pr create [flags]
   *
   *   Flags:
   *     -a, --assignee login       Assign people by their login. Use "@me" to self-assign.
   *     -B, --base branch          The branch into which you want your code merged
   *     -b, --body string          Body for the pull request
   *     -F, --body-file file       Read body text from file
   *     -d, --draft                Mark pull request as a draft
   *     -f, --fill                 Do not prompt for title/body and just use commit info
   *     -H, --head branch          The branch that contains commits for your pull request (default: current branch)
   *     -l, --label name           Add labels by name
   *     -m, --milestone name       Add the pull request to a milestone by name
   *         --no-maintainer-edit   Disable maintainer's ability to modify pull request
   *     -p, --project name         Add the pull request to projects by name
   *         --recover string       Recover input from a failed run of create
   *     -r, --reviewer handle      Request reviews from people or teams by their handle
   *     -t, --title string         Title for the pull request
   *     -w, --web                  Open the web browser to create a pull request
   *
   *
   *******************************************************************************************/

  /****
   * -> let prLabels = event.data.pr_labels
   * -> let prLabelsStr = prLabels.join()
   * -> let prSearchStr = `${event.data.pr_search_str}`
   * -> let prSearchPaginationLimit = event.data.pr_search_pagination_limit;
   ***/
   let prLabelsStr = prLabels.join()
   let ghCliCreatePRCmdResult = shelljs.exec(`ghcli pr create help -l "devops" -l "kubernetes" -l "enhancement" -t "title of the new pr" -F ./my-markdown-file.md -r "@Jean-Baptiste-Lasselle" -p pokusio/website -H "feature/beautiful-livestream-btn" -B "develop" --no-maintainer-edit -m "My milestone name" -d`);
   if (ghCliCreatePRCmdResult.code !== 0) {
     // throw new Error(`{[  - - PokusFaasNode16]} - [Github CLI] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + ghCliCreatePRCmdResult.stderr + "] ")
     console.log(`{[  - - PokusFaasNode16]} - [Github CLI] - successfully pokus-tested-network !!! :D`)
   } else {
     let ghCliCreatePRCmdResultStdOUT = ghCliCreatePRCmdResult.stdout;
     ghCliCreatePRCmdResultStdOUT = ghCliCreatePRCmdResultStdOUT.trim();
     console.log(`{[  - - PokusFaasNode16]} -  [ghCliCreatePRCmdResultStdOUT=[${ghCliCreatePRCmdResultStdOUT}]] and [ghCliCreatePRCmdResult.stdout=[${ghCliCreatePRCmdResult.stdout}]]`)
   }
}




 /************************************************************************************
  *  LIST GITHUB PULL REQUESTS
  ************************************************************************************
  *    -> {@parameter ghRepoName: string} = the github repository name, in which to search for Pull Requests
  *    -> {@parameter ghOrgName: string} = the github organization or user name. The github repository into which we want to search for Pull Requests, is in that Github Organization or User's personal repositories.
  *    -> {@parameter pr_author: string} = author of the Pull Request, e.g. "@Jean-Baptiste-Lasselle"
  *    -> {@parameter prLabels} = arrays of strings, the github labels you want to filter the search with
  *    -> {@parameter prSearchStr} = the github search string you want to look up the issue(s) with
  *    -> {@parameter prSearchPaginationLimit} = max number of results
  **/
const loadGithubService = (ghOrgName/*: string*/,
                           ghRepoName/*: string*/,
                           pr_author/*: string*/,
                           prLabels/*: string*/,
                           prSearchStr/*: string*/,
                           prSearchPaginationLimit/*: number*/) {

  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  const ghPTokenSecretName = `pokusbot-gh-token`
  const ghPTokenSecretFilePath = `/var/openfaas/secrets/${ghPTokenSecretName}`
  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // that's to ...

  const gh_org_or_user = `${event.data.gh_org_name}`
  const gh_repo_name = `${event.data.gh_repo_name}`
  const gh_pr_title = `${event.data.gh_pr_title}`
  const gh_pr_desc = `${event.data.gh_pr_desc}`
  const gh_pr_labels = `${event.data.gh_pr_labels}`
  const gh_pr_assignees = `${event.data.gh_pr_assignees}`

  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");
  console.log(`{[  - - PokusFaasNode16]} - check GH_ORG_OR_USER=[${gh_org_or_user}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_REPO_NAME=[${gh_repo_name}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_PR_TITLE=[${gh_pr_title}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_PR_DESC=[${gh_pr_desc}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_PR_LABELS=[${gh_pr_labels}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_PR_ASSIGNEES=[${gh_pr_assignees}]`);
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");

  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // load secrets
  if (!fs.existsSync(ghPTokenSecretFilePath)) {
    throw new Error("{[PokusFaasNode16]} - [" + `${ghPTokenSecretFilePath}` + "] does not exists, stopping operations");
  } else {
    console.log("{[PokusFaasNode16]} - found [ghPTokenSecretFilePath] secret file located at [" + ghPTokenSecretFilePath + "]");
  }
  console.info("{[PokusFaasNode16]} - Parsing [ghPTokenSecretFilePath] secret file file located at [" + ghPTokenSecretFilePath + "]");
  let ghPTokenSecret = fs.readFileSync(`${ghPTokenSecretFilePath}`,'utf8');
  console.info("{[PokusFaasNode16]} - Parsed Github Personal Access Token from secret file located at [" + ghPTokenSecretFilePath + "] / ghPTokenSecret = [" + ghPTokenSecret + "]");




  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // github cli version
  let ghCliCmdResult = shelljs.exec(`ghcli --version`);
  if (ghCliCmdResult.code !== 0) {
    console.log(`{[  - - PokusFaasNode16]} - [Github CLI] - here is the Github CLI version : `)
  } else {
    let ghCliCmdResultStdOUT = ghCliCmdResult.stdout;
    ghCliCmdResultStdOUT = ghCliCmdResultStdOUT.trim();
    console.log(`{[  - - PokusFaasNode16]} -  [ghCliCmdResultStdOUT=[${ghCliCmdResultStdOUT}]] and [ghCliCmdResult.stdout=[${ghCliCmdResult.stdout}]]`)
  }
  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // github cli help
  let ghCliHelpCmdResult = shelljs.exec(`ghcli --help`);
  if (ghCliHelpCmdResult.code !== 0) {
    // throw new Error(`{[  - - PokusFaasNode16]} - [Github CLI] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + ghCliHelpCmdResult.stderr + "] ")
    console.log(`{[  - - PokusFaasNode16]} - [Github CLI] - `)
  } else {
    let ghCliHelpCmdResultStdOUT = ghCliHelpCmdResult.stdout;
    ghCliHelpCmdResultStdOUT = ghCliHelpCmdResultStdOUT.trim();
    console.log(`{[  - - PokusFaasNode16]} -  [ghCliHelpCmdResultStdOUT=[${ghCliHelpCmdResultStdOUT}]] and [ghCliHelpCmdResult.stdout=[${ghCliHelpCmdResult.stdout}]]`)
  }

  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // github cli login
  let ghCliLoginCmdResult = shelljs.exec(`ghcli auth login --with-token ${ghPTokenSecret}`);
  if (ghCliLoginCmdResult.code !== 0) {
    // throw new Error(`{[  - - PokusFaasNode16]} - [Github CLI] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + ghCliLoginCmdResult.stderr + "] ")
    console.log(`{[  - - PokusFaasNode16]} - [Github CLI] - successfully pokus-logged-in!!! :D`)
  } else {
    let ghCliLoginCmdResultStdOUT = ghCliLoginCmdResult.stdout;
    ghCliLoginCmdResultStdOUT = ghCliLoginCmdResultStdOUT.trim();
    console.log(`{[  - - PokusFaasNode16]} -  [ghCliLoginCmdResultStdOUT=[${ghCliLoginCmdResultStdOUT}]] and [ghCliLoginCmdResult.stdout=[${ghCliLoginCmdResult.stdout}]]`)
  }

  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // network test
  let curlNetTestCmdResult = shelljs.exec(`curl -ivvv -L ${event.body.net_test_url}`);
  if (curlNetTestCmdResult.code !== 0) {
    // throw new Error(`{[  - - PokusFaasNode16]} - [Github CLI] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + curlNetTestCmdResult.stderr + "] ")
    console.log(`{[  - - PokusFaasNode16]} - [Github CLI] - successfully pokus-tested-network !!! :D`)
  } else {
    let curlNetTestCmdResultStdOUT = curlNetTestCmdResult.stdout;
    curlNetTestCmdResultStdOUT = curlNetTestCmdResultStdOUT.trim();
    console.log(`{[  - - PokusFaasNode16]} -  [curlNetTestCmdResultStdOUT=[${curlNetTestCmdResultStdOUT}]] and [curlNetTestCmdResult.stdout=[${curlNetTestCmdResult.stdout}]]`)
  }
  /// ghcli auth login --with-token



}
