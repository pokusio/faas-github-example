'use strict'

/*
import * as shelljs from 'shelljs';
import * as fs from 'fs';
import * as arrayUtils from 'util';
*/
const fs = require('fs')
const shelljs = require('shelljs') // npm i -s shelljs@0.8.5


/***************************************************************************************************
 *  LIST GITLAB MERGE REQUESTS
 ************************************************************************************
 *    -> {@parameter ghRepoName: string} = the github repository name, in which to search for Pull Requests
 *    -> {@parameter ghOrgName: string} = the github organization or user name. The github repository into which we want to search for Pull Requests, is in that Github Organization or User's personal repositories.
 *    -> {@parameter mr_author: string} = author of the Pull Request, e.g. "@Jean-Baptiste-Lasselle"
 *    -> {@parameter mrLabels} = arrays of strings, the github labels you want to filter the search with
 *    -> {@parameter mrSearchStr} = the github search string you want to look up the issue(s) with
 *    -> {@parameter mrSearchPaginationLimit} = max number of results
 **/
const testGitlabService = (ghRepoName/*: string*/,
                           ghOrgName/*: string*/,
                           mr_author/*: string*/,
                           mrLabels/*: string*/,
                           mrSearchStr/*: string*/,
                           mrSearchPaginationLimit/*: number*/) {
  throw new Error(`[testGitlabService] - Not Implemented Yet`)
}

/***************************************************************************************************
 *  LIST GITLAB MERGE REQUESTS
 ************************************************************************************
 *    -> {@parameter ghRepoName: string} = the github repository name, in which to search for Pull Requests
 *    -> {@parameter ghOrgName: string} = the github organization or user name. The github repository into which we want to search for Pull Requests, is in that Github Organization or User's personal repositories.
 *    -> {@parameter mr_author: string} = author of the Pull Request, e.g. "@Jean-Baptiste-Lasselle"
 *    -> {@parameter mrLabels} = arrays of strings, the github labels you want to filter the search with
 *    -> {@parameter mrSearchStr} = the github search string you want to look up the issue(s) with
 *    -> {@parameter mrSearchPaginationLimit} = max number of results
 **/
const listGitlabPullRequests = (ghRepoName/*: string*/,
                                ghOrgName/*: string*/,
                                mr_author/*: string*/,
                                mrLabels/*: string*/,
                                mrSearchStr/*: string*/,
                                mrSearchPaginationLimit/*: number*/) {
  throw new Error(`[listGithubPullRequests] - Not Implemented Yet`)
}



 /***************************************************************************************************
  *  CREATE GITLAB MERGE REQUEST
  ************************************************************************************
  *    -> {@parameter glabRepoName: string} = the gitlab repository name, in which to create the Pull Request
  *    -> {@parameter glabOrgName: string} = the gitlab organization or user name. The gitlab repository into which we want to create the Pull Request, is in that gitlab Organization or User's personal repositories.
  *    -> {@parameter mrLabels: string[]} = arrays of strings, the gitlab labels you want to filter the search with.
  *    -> {@parameter mrSearchStr: string} = the gitlab search string you want to look up the issue(s) with
  *    -> {@parameter mrSearchPaginationLimit: number} = max number of results
  *    -> {@parameter mr_title: string} = Pull Request title
  *    -> {@parameter mr_desc_md_file: string} = Pull Request description : the Markdown to insert, is in the File at the specified path
  *    -> {@parameter is_draft: boolean} = boolean, if false the pull request will nt be created as a draft, defaults to false.
  *
  **/
const createGitlabPullRequest = (ghRepoName/*: string*/,
                                 ghOrgName/*: string*/,
                                 prLabels/*: string[]*/,
                                 prSearchStr/*: string*/,
                                 prSearchPaginationLimit/*: number*/,
                                 pr_title/*: string*/,
                                 pr_desc_md_file/*: string*/,
                                 is_draft/*: boolean*/) {


    throw new Error(`[createGitlabPullRequest] - Not Implemented Yet`);



}
