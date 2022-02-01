# The `OpenFAAS` Github CLI functions

This is a collection of `OpenFAAS` functions, all having github capabilities of their own :

| `OpenFAAS` function |  Expert in | Misc. | Supports |   |
|-----------------------------------------------|-----------------------------------------------|-----------------------------------------------|-----------------------------------------------|-----------------------------------------------|
| `pokus-github-node` | Pull Requests/Merge Requests | `Github`, `Gitlab`, `Gitea` |   |   |
| `pokus-git-flow-bot` | Git Flow AVH | git flow releases are followed by releasing with github cli to promote gt tag as release, fill in release notes. Also will have gitlab cli and gitea cli | `Github`, `Gitlab`, `Gitea`  |   |
| `pokus-gh-issue-bot` | Issues | git flow releases are followed by releasing with github cli to promote gt tag as release, fill in release notes. Also will have gitlab cli and gitea cli | `Github`, `Gitlab`, `Gitea`  |   |

Cloud functions (`Firebase` and `OpenFAAS`) are awesome to modularize your CICD systems, agnostically :
* You can use the same cloud functions with just `curl`, from any Pipeline step !
* `Circle CI` , `Drone`, `Tekton`, `Jenkins`, `Team city`, `Travis`, ....


* The `pokus-github-node` `OpenFAAS` function

## The `pokus-github-node` `OpenFAAS` function

This `OpenFAAS` function is an expert into managing PRs. together with https://dkron.io/, you can do marvels into your

This `OpenFAAS` function :
* was designed using [the Github CLI `OpenFAAS` template](https://github.com/pokusio/faas-github-example)
* has feature :
  * `POST` create/reopen a new PR :
    * `gh_repo_name: "<your gh repo name>"`, repo name
    * `gh_org_name: "<your gh org or user name>"`, gh org or user name
    * http header `-H 'X-Pokus-faaction: < create|reopen >'`
    * `pr_id` : used iff http header `-H 'X-Pokus-faaction: < edit|comment|assign >'` is set, this parameter gives the id of the PR is reopened and no edition is dine at all (all other parameters are ignored). by default the value is considered `create`
    * from source git branch `src_git_branch: "<branch name>"`,
    * to target source git branch `target_git_branch: "<branch name>"`,
    * `title: "<your title>"`,
    * `description: "<your description>"`,
    * `labels`, an array `labels: [ 'label1', 'label2', 'label3', 'label4' ]`
    * `assignees`, an array `assignees: [ 'assignee1', 'assignee2', 'assignee3', 'assignee4' ]`
  * `GET` search all PRs :
    * `opened: true`, and `closed: true`, to selected closed or opened PRs, both default to false.
    * `search`
  * `UPDATE` to edit/comment/assign a PR ?
  * `DELETE` to close a PR ?

## How to use

### Use the faas functions

This repository versions a set of `OpenFAAS` functions : So this basically is a package (a library?) of `OpenFAAS` functions.

Hereis how you can

### Add a new function
* The Github CLI template makes use of one secret : a `Github Personal Access Token`. So :
  * create a Github personal access token
  * create the `OpenFAAS` secret :

```bash
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # ---
# --- for a secret string
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # ---

export GH_PERSONAL_ACCESS_TOKEN="ghp_VUnUwKli0kTnMJ0D6kNcjuQEvvpTVYmA3NuJEC"

echo "${GH_PERSONAL_ACCESS_TOKEN}" | faas-cli secret create pokusbot-gh-token
# cat ~/Downloads/derek.pem | faas-cli secret create pokusbot-gh-token

# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # ---
# --- for a secret file (sshkeys, gpg keys)
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # ---
echo "huku_DEA176DB9EEF7DEADB00EEFDEADBEEFDEADBEEF" > ./.my.secret.file
faas-cli secret create pokusbot-example-credentials --from-file ./.my.example.secret.file


```

* Create a new _FAAS function_ using the Github CLI `OpenFAAS` template :

```bash
export FAAS_FUNC_NAME="my-new-awesome-function"

export FAAS_TEMPLATE_NAME="pokus-gh-cli-node"
export FAAS_TEMPLATE_NAME="pokus-github-node"

faas-cli template pull https://github.com/pokusio/gh-cli-openfaas-template
faas-cli new --lang "${FAAS_TEMPLATE_NAME}" "${FAAS_FUNC_NAME}"
# will generate the [my-new-awesome-function.yml].

cat << EOF > $(pwd)/${FAAS_FUNC_NAME}.yml
version: 1.0
provider:
  name: openfaas
  gateway: http://127.0.0.1:8080
functions:
  my-new-awesome-function:
    lang: pokus-github-node
    handler: ./my-new-awesome-function
    # image: my-new-awesome-function:latest
    image: 192.168.168.6:5000/pokus/faas-github-cli-node16:0.0.1
    secrets:
      - pokusbot-gh-token
EOF

cp ./template/pokus-github-node/.dockerignore ./
cp ./template/pokus-github-node/package.json ./
cp ./template/pokus-github-node/index.js ./
cp ./template/pokus-github-node/*.sh ./
cp ./template/pokus-github-node/Dockerfile ./

```

* edit the `my-new-awesome-function.yml`, to modify image name and append this to it :

```bash
export FAAS_FUNC_NAME="my-new-awesome-function"
export FAAS_TEMPLATE_NAME="pokus-github-node"
export DOCKHOST_IP_ADDR="192.168.168.6"
cat << EOF > $(pwd)/${FAAS_FUNC_NAME}.yml
version: 1.0
provider:
  name: openfaas
  gateway: http://127.0.0.1:8080
functions:
  ${FAAS_FUNC_NAME}:
    lang: pokus-github-node
    handler: ./${FAAS_FUNC_NAME}n
    # image: ${FAAS_FUNC_NAME}:latest
    image: ${DOCKHOST_IP_ADDR}:5000/pokus/faas-github-cli-node16:0.0.1
    secrets:
      - pokusbot-gh-token
EOF

```

* build n deploy your new _(github cli augmented)-FAAS function_ :

```bash
# Below is a local ip address :
# OpenFAAS : I locally run k3d with 3 servers n 3 agents
# Docker Registry : I locally run docker-compose
export DOCKHOST_IP_ADDR="192.168.168.6"
# "OF_TEMPLATE_IMAGE_NAME"  must be same image name as the
# image property in the [<name of yoour faas function>.yml]
export OF_TEMPLATE_IMAGE_NAME="${DOCKHOST_IP_ADDR}:5000/pokus/faas-gh-cli-node16:latest"

faas-cli up --build-arg AWESOME=true --image "${OF_TEMPLATE_IMAGE_NAME}" -f my-new-awesome-function.yml ${HERAOHERE}/wehereiwork/my-new-awesome-function/handler.js

```

* test your new _(github cli augmented)-FAAS function_ :

```bash
# Below is a local ip address :
# OpenFAAS : I locally run k3d with 3 servers n 3 agents
# Docker Registry : I locally run docker-compose
export DOCKHOST_IP_ADDR="192.168.168.6"

curl -X POST http://127.0.0.1:8080/function/my-new-awesome-function \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://randomuser.me/api/", "name": "pokustest"}'

curl -X POST http://${DOCKHOST_IP_ADDR}:8080/function/my-new-awesome-function \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://randomuser.me/api/", "name": "pokustest"}'

```

## How to spin up a new OpenFAAS template

https://github.com/pokusio/gh-cli-openfaas-template

test-using-template

## ANNEX. References

https://github.com/openfaas/faas-cli/issues/420
