#!/bin/bash


# ++++++++++++++++++++++++++
# DEBUG :
#
echo "# ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++#"
echo "    GITHUB CLI - installation"
echo "# ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++#"

# ++++++++++++++++++++++++++


# ./install-gh-cli.sh
export GH_CLI_VERSION="2.4.0"
curl -LO "https://github.com/cli/cli/releases/download/v${GH_CLI_VERSION}/gh_${GH_CLI_VERSION}_linux_amd64.tar.gz"
curl -LO "https://github.com/cli/cli/releases/download/v${GH_CLI_VERSION}/gh_${GH_CLI_VERSION}_checksums.txt"

# ++++++++++++++++++++++++++
# DEBUG :
#
echo "# ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++#"
echo "    DEBUG POINT 1 -  CHECK FILES : "
ECHO "      ls -alh ./gh_${GH_CLI_VERSION}_linux_amd64.tar.gz"
ECHO "      ls -alh ./gh_${GH_CLI_VERSION}_checksums.txt"
echo "# ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++#"
# ++++++++++++++++++++++++++

ls -alh ./gh_${GH_CLI_VERSION}_linux_amd64.tar.gz
ls -alh ./gh_${GH_CLI_VERSION}_checksums.txt

cat ./gh_${GH_CLI_VERSION}_checksums.txt | grep "gh_${GH_CLI_VERSION}_linux_amd64.tar.gz"

mkdir -p ./.pokus.temp
tar -xvf ./gh_${GH_CLI_VERSION}_linux_amd64.tar.gz -C ./.pokus.temp

# ++++++++++++++++++++++++++
# DEBUG :
#
echo "# ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++#"
echo "    DEBUG POINT 2 -  CHECK UNTARRED - ARCHIVE : "
ECHO "      ls -alh ./gh_${GH_CLI_VERSION}_linux_amd64.tar.gz"
ECHO "      ls -alh ./gh_${GH_CLI_VERSION}_checksums.txt"
echo "# ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++ # ++++++++++++++++++++++++++#"
# ++++++++++++++++++++++++++

tree -alh -L 3 ./.pokus.temp
ls -alh ./.pokus.temp/gh_${GH_CLI_VERSION}_linux_amd64

mkdir -p /usr/local/bin/github-cli/${GH_CLI_VERSION}/
cp ./.pokus.temp/gh_${GH_CLI_VERSION}_linux_amd64/bin/gh /usr/local/bin/github-cli/${GH_CLI_VERSION}/gh
ln -s /usr/local/bin/github-cli/${GH_CLI_VERSION}/gh /usr/local/bin/ghcli

tree -alh -L 3 /usr/local/bin/github-cli/

ghcli --version
