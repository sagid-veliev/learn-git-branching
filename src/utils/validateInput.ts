import commands from '@/constants/constants';

function validateGitBranchOrCheckout(input: string) {
    const splittedCommand: string[] = input.split(' ');
    return splittedCommand.length > 2 && splittedCommand.length < 4;
}

function validate(input: string) {
    if (input.includes('git branch')
        || input.includes('git checkout')
        || input.includes('git merge')
        || input.includes('git rebase')
    ) {
        const branchCommand = `${input.split(' ')[0]} ${input.split(' ')[1]}`;
        return !commands.includes(branchCommand) || !validateGitBranchOrCheckout(input);
    }
    if (input.includes('git revert')) {
        const branchCommand = `${input.split(' ')[0]} ${input.split(' ')[1]}`;
        return !commands.includes(branchCommand);
    }
    if (input.includes('git cherry-pick')) {
        const branchCommand = `${input.split(' ')[0]} ${input.split(' ')[1]}`;
        return !commands.includes(branchCommand);
    }
    return !commands.includes(input);
}

export default validate;
