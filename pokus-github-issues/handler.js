'use strict'

/*
import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as arrayUtils from 'util';
*/
const fs = require('fs')
const shelljs = require('shelljs') // npm i -s shelljs@0.8.5

const ghService = require('./github/service')
const gitlabService = require('./gitlab/service')
const commonsService = require('./commons/service')

/***********************************************************************************************************************
 *    This function will create github repository:
 *      > into the specified github org,
 *      > with the specified github repo name
 *
 *    The secret named 'pokusbot-gh-token' will e stored on disk at:
 *    /var/openfaas/secrets/pokusbot-gh-token
 *
 *   https://github.com/cli/cli
 */

/***********************************************************************************************************************
 *    EXAMPLE USAGE:
 */
/***********************************************************************************************************************
 *
 * curl -X GET http://127.0.0.1:8080/function/pokus-github-issues \
 *  -H "Content-Type: application/json" \
 *  -d '{ "curl_net_test_url": "https://netflix.com", \
 *         "gh_org_name": "pokusio", \
 *         "gh_repo_name": "faas-github-example", \
 *         "gh_issue_labels": [ "devops", "nodejs", "asap", "whatever" ], \
 *         "gh_issue_assignees": [ "bob156", "anna4web", "tomb8ss", "Jean-Baptiste-Lasselle" ], \
 *         "gh_issue_search_str": "", \
 *         "gh_issue_search_pagination_limit": 7 \
 *        }'
 *
 */
/***********************************************************************************************************************
 *  TO create a Github issue, in the specified repository, with the specified title, description, and an optional milestone name, and  labels, assignees,
 * curl -X POST http://127.0.0.1:8080/function/pokus-github-issues \
 *  -H "Content-Type: application/json" \
 *  -d '{ "curl_net_test_url": "https://netflix.com", \
 *         "gh_org_name": "pokusio", \
 *         "gh_repo_name": "faas-github-example", \
 *         "gh_issue_title": "faas-github-example", \
 *         "gh_issue_desc": "faas-github-example", \
 *         "gh_issue_labels": [ "devops", "nodejs", "asap", "whatever" ], \
 *         "gh_issue_assignees": [ "bob156", "anna4web", "tomb8ss", "Jean-Baptiste-Lasselle" ], \
 *        }'
 *
 **********/
module.exports = async (event, context) => { // context will be useful

  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  const ghPTokenSecretName = `pokusbot-gh-token`
  const ghPTokenSecretFilePath = `/var/openfaas/secrets/${ghPTokenSecretName}`
  const pokusExSecretCredentialsFileName = `pokusbot-gh-token`
  const pokusExSecretCredentialsFilePath = `/var/openfaas/secrets/${pokusExSecretCredentialsFileName}`
  const curlNetTestUrl = `${event.data.curl_net_test_url}`
  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // that's to ...
  const gh_org_or_user = `${event.data.gh_org_name}`
  const gh_repo_name = `${event.data.gh_repo_name}`
  const gh_issue_title = `${event.data.gh_issue_title}`
  const gh_issue_desc = `${event.data.gh_issue_desc}`
  const gh_issue_labels = `${event.data.gh_issue_labels}`
  const gh_issue_assignees = `${event.data.gh_issue_assignees}`

  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");
  console.log(`{[  - - PokusFaasNode16]} - check GH_ORG_OR_USER=[${gh_org_or_user}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_REPO_NAME=[${gh_repo_name}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_ISSUE_TITLE=[${gh_issue_title}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_ISSUE_DESC=[${gh_issue_desc}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_ISSUE_LABELS=[${gh_issue_labels}]`);
  console.log(`{[  - - PokusFaasNode16]} - check GH_ISSUE_ASSIGNEES=[${gh_issue_assignees}]`);
  console.log(`{[  - - PokusFaasNode16]} - check pokusExSecretCredentialsFileName=[${pokusExSecretCredentialsFileName}]`);
  console.log(`{[  - - PokusFaasNode16]} - check pokusExSecretCredentialsFilePath=[${pokusExSecretCredentialsFilePath}]`);
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");

  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //


  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //


  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // load secrets : GITHUB PERSONAL ACCESS TOKEN
  console.info(`// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //`)
  console.info(`// load secrets : GITHUB PERSONAL ACCESS TOKEN`)
  if (!fs.existsSync(ghPTokenSecretFilePath)) {
    throw new Error("{[PokusFaasNode16]} - [" + `${ghPTokenSecretFilePath}` + "] does not exists, stopping operations");
  } else {
    console.log("{[PokusFaasNode16]} - found [ghPTokenSecretFilePath] secret file located at [" + ghPTokenSecretFilePath + "]");
  }
  console.info("{[PokusFaasNode16]} - Parsing [ghPTokenSecretFilePath] secret file file located at [" + ghPTokenSecretFilePath + "]");
  let ghPTokenSecret = fs.readFileSync(`${ghPTokenSecretFilePath}`,'utf8');
  console.info("{[PokusFaasNode16]} - Parsed Github Personal Access Token from secret file located at [" + ghPTokenSecretFilePath + "] / ghPTokenSecret = [" + ghPTokenSecret + "]");
  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  // load secrets : EXAMPLE SECRET CRDENTIALS FILE
  console.info(`// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //`)
  console.info(`// load secrets : EXAMPLE SECRET CRDENTIALS FILE`)
  if (!fs.existsSync(pokusExSecretCredentialsFilePath)) {
    throw new Error("{[PokusFaasNode16]} - [" + `${pokusExSecretCredentialsFilePath}` + "] does not exists, stopping operations");
  } else {
    console.log("{[PokusFaasNode16]} - found [pokusExSecretCredentialsFilePath] secret file located at [" + pokusExSecretCredentialsFilePath + "]");
  }
  console.info("{[PokusFaasNode16]} - Parsing [pokusExSecretCredentialsFilePath] secret file file located at [" + pokusExSecretCredentialsFilePath + "]");
  let exampleCredentialsFileSecret = fs.readFileSync(`${pokusExSecretCredentialsFilePath}`,'utf8');
  console.info("{[PokusFaasNode16]} - Parsed [Example Credentials File Secret] from secret file located at [" + pokusExSecretCredentialsFilePath + "] / exampleCredentialsFileSecret = [" + exampleCredentialsFileSecret + "]");



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
  const curlNetTestUrl = event.body.curl_net_test_url
  let curlNetTestCmdResult = shelljs.exec(`curl -ivvv -L "${curlNetTestUrl}"`);
  if (curlNetTestCmdResult.code !== 0) {
    // throw new Error(`{[  - - PokusFaasNode16]} - [Github CLI] - An Error occurred executing the [git tag -l | grep ${tag_id}] shell command. Shell error was [` + curlNetTestCmdResult.stderr + "] ")
    console.log(`{[  - - PokusFaasNode16]} - [Github CLI] - successfully pokus-tested-network !!! :D`)
  } else {
    let curlNetTestCmdResultStdOUT = curlNetTestCmdResult.stdout;
    curlNetTestCmdResultStdOUT = curlNetTestCmdResultStdOUT.trim();
    console.log(`{[  - - PokusFaasNode16]} -  [curlNetTestCmdResultStdOUT=[${curlNetTestCmdResultStdOUT}]] and [curlNetTestCmdResult.stdout=[${curlNetTestCmdResult.stdout}]]`)
  }
  /// #



  // Rubbish pokus msg replied, for the moment
  const pokusmsg = `Pokus: le lien [${event.body.name}] a pour valeur [${event.body.url}] + Github Personal Access Token = [${ghPTokenSecret}]`
  const result = {
    'body': JSON.stringify(event.body),
    'content-type': event.headers["content-type"],
    'pokus': 'faas-node16',
    'ghPTokenSecret': `${ghPTokenSecret}`,
    'pokusmsg': `${pokusmsg}`
    /* 'event': event,
       'context': context
    */
  }

  return context
    .status(200)
    .succeed(result)
}

// https://docs.openfaas.com/tutorials/cli-with-node/
