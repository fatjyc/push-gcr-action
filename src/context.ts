import * as core from "@actions/core";

export interface Inputs {
    user: string;
    token: string;
    dockerfile: string;
    path: string;
    tagUseBranchNameWhenPush: boolean;
}

export function getInputs(): Inputs {
    return {
        user: core.getInput("user", { required: true }),
        token: core.getInput("token", { required: true }),
        dockerfile: core.getInput("dockerfile", { trimWhitespace: true }) || "Dockerfile",
        path: core.getInput("path", { trimWhitespace: true }) || ".",
        tagUseBranchNameWhenPush: core.getBooleanInput("tagUseBranchNameWhenPush") || false,
    };
}
