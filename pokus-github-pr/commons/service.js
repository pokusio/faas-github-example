'use strict'

/*
import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as arrayUtils from 'util';
*/
const fs = require('fs')
const shelljs = require('shelljs') // npm i -s shelljs@0.8.5









/***************************************************************************************************
 *  LOAD SECRETS
 ************************************************************************************
 *    -> {@parameter ghPTokenSecretFilePath: string} = path, in the container, to the file containing the value of the "Github Personal Access Token"
 *    -> {@parameter pokusExSecretCredentialsFilePath: string} = path, in the container, to the example secret credentials file.x
 **/
const loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath) {
  // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
  //
  console.log(`{[  - - loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - check pokusExSecretCredentialsFileName=[${pokusExSecretCredentialsFileName}]`);
  console.log(`{[  - - loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - check pokusExSecretCredentialsFilePath=[${pokusExSecretCredentialsFilePath}]`);
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");
  console.log("// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //");

  /****
   *
   * -> let issueLabels = [ "devops", "kubernetes" , "bug"]
   * -> let issueLabelsStr = issuesLabels.join()
   * -> let issueSearchStr = "docker-compose up"
   * -> let issueSearchPaginationLimit = 3;
   *
   * -> let issueLabels = event.data.gh_issue_labels
   * -> let issueLabelsStr = issueLabels.join()
   * -> let issueSearchStr = event.data.gh_issue_search_str
   * -> let issueSearchPaginationLimit = event.data.gh_issue_search_pagination_limit;
   *
   ***/
   // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
   // load secrets : GITHUB PERSONAL ACCESS TOKEN
   console.info(`// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //`)
   console.info(`// load secrets : GITHUB PERSONAL ACCESS TOKEN`)
   if (!fs.existsSync(ghPTokenSecretFilePath)) {
     throw new Error("{[loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - [" + `${ghPTokenSecretFilePath}` + "] does not exists, stopping operations");
   } else {
     console.log("{[loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - found [ghPTokenSecretFilePath] secret file located at [" + ghPTokenSecretFilePath + "]");
   }
   console.info("{[loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - Parsing [ghPTokenSecretFilePath] secret file file located at [" + ghPTokenSecretFilePath + "]");
   let ghPTokenSecret = fs.readFileSync(`${ghPTokenSecretFilePath}`,'utf8');
   console.info("{[loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - Parsed Github Personal Access Token from secret file located at [" + ghPTokenSecretFilePath + "] / ghPTokenSecret = [" + ghPTokenSecret + "]");
   // --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //
   // load secrets : EXAMPLE SECRET CRDENTIALS FILE
   console.info(`// --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- //`)
   console.info(`// load secrets : EXAMPLE SECRET CRDENTIALS FILE`)
   if (!fs.existsSync(pokusExSecretCredentialsFilePath)) {
     throw new Error("{[loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - [" + `${pokusExSecretCredentialsFilePath}` + "] does not exists, stopping operations");
   } else {
     console.log("{[loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - found [pokusExSecretCredentialsFilePath] secret file located at [" + pokusExSecretCredentialsFilePath + "]");
   }
   console.info("{[loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - Parsing [pokusExSecretCredentialsFilePath] secret file file located at [" + pokusExSecretCredentialsFilePath + "]");
   let exampleCredentialsFileSecret = fs.readFileSync(`${pokusExSecretCredentialsFilePath}`,'utf8');
   console.info("{[loadSecrets = (ghPTokenSecretFilePath, pokusExSecretCredentialsFilePath)]} - Parsed [Example Credentials File Secret] from secret file located at [" + pokusExSecretCredentialsFilePath + "] / exampleCredentialsFileSecret = [" + exampleCredentialsFileSecret + "]");



}
