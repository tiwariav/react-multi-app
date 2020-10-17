#!/usr/bin/env bash
# MIT © Sindre Sorhus - sindresorhus.com

# git hook to run a command after `git pull` if a specified file was changed
# Run `chmod +x post-merge` to make it executable then put it into `.git/hooks/`.

GREEN="\033[1;32m"
NOCOLOR="\033[0m"

changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

check_run() {
	matched_files=$(echo "$changed_files" | grep "$1")
  if [[ "$matched_files" ]]; then
    echo "Changes detected in:"
    echo -e "$GREEN$matched_files$NOCOLOR"
    echo ""
    eval "$2"
  fi
}

prompt_npm_install() {
  exec < /dev/tty
  read -n1 -p "Run yarn install? (y/n): " ANSWER
  echo '' # For the new line
  case $ANSWER in
    y|Y)
    yarn install -f
    ;;
  esac
}

check_run ".*package\(-lock\)\?.json" prompt_npm_install

exit 0
