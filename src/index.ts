import * as github from "@actions/github";
import * as exec from "@actions/exec";
import * as core from "@actions/core";
import { getInputs } from "./context";

async function run() {
    core.info("build and push");
    const input = getInputs();
    const imageName = `ghcr.io/${github.context.repo.owner}/${github.context.repo.repo}`;
    core.info(imageName);
    const shortSha = github.context.sha.substring(0, 7);
    const tag = `${imageName}:${shortSha}`;

    await exec.exec(`docker build ${input.path} --file ${input.dockerfile} --tag ${tag}`);

    await exec
        .getExecOutput(`docker login ghcr.io -u ${input.user} -p ${input.token}`)
        .then(async () => {
            await exec.exec(`docker push ${tag}`);
        });

    if (input.tagUseBranchNameWhenPush && github.context.eventName == "push") {
        core.info("Tag image with branch name");
        const branchTag = `${imageName}:${github.context.ref.replace("refs/heads/", "")}`;
        await exec.exec(`docker tag ${tag} ${branchTag}`);
        await exec
            .getExecOutput(`docker login ghcr.io -u ${input.user} -p ${input.token}`)
            .then(async () => {
                await exec.exec(`docker push ${branchTag}`);
            });
    }
}

try {
    run();
} catch (error) {
    core.setFailed(error.message);
}
