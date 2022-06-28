# Build and push Docker images to Github Container Registry

## Inputs

## `user`

**Required** The GitHub API user

## `token`

**Required** The GitHub API token

## `tagUseBranchNameWhenPush`
Tag use branch name when push

## Example usage
```
uses: fatjyc/push-gcr-action@v1.0
with:
  user: ${{ user }}
  token: ${{ secrets.GH_TOKEN }}
  tagUseBranchNameWhenPush: ${{ github.ref == format('refs/heads/{0}', github.event.repository.default_branch) }}
```