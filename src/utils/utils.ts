import { Node } from '@/models/types';
import GraphArrow from '@/utils/graphArrow';
import GraphNode from '@/utils/graphNode';
import GraphBranch from '@/utils/graphBranch';

let calcTop = 10;
let prevCalcTop = 0;
// let prevBranchInstance: any;
let currentNode = 'main';
const branches = ['main'];

function checkGitBranch(command: string) {
    return command.includes('git branch') ? 1 : 0;
}

function getBranchName(command: string) {
    const splittedCommand: string[] = command.split(' ');
    const branchName: string = splittedCommand[splittedCommand.length - 1];
    return branchName;
}

function checkGitCheckout(command: string) {
    return command.includes('git checkout');
}

export function getCheckoutName(command: string) {
    const splittedCommand: string[] = command.split(' ');
    const checkoutName: string = splittedCommand[splittedCommand.length - 1];
    return checkoutName;
}

export default function gitNode(command: string, nodes: Node[], id: number): Node[] {
    const node: Node = {
        id,
        name: `C${id}`,
        parent: [],
        type: checkGitBranch(command),
        children: [],
        branch: [currentNode],
        currentBranch: currentNode,
    };
    (function recursive(array) {
        array.forEach((obj: Node, index: number) => {
            if (array[index].children.length === 0) {
                // if (prevBranchInstance) {
                //     prevBranchInstance.destroyBranch();
                // }
                // логика для git branch
                if (checkGitBranch(command)) {
                    prevCalcTop = calcTop - 90;
                    const branchName = getBranchName(command);
                    array[index].branch.push(branchName);
                    branches.push(branchName);
                    const branchInstance = new GraphBranch(array[index].branch, array[index].currentBranch, prevCalcTop, 54);
                    branchInstance.createBranch();
                    // prevBranchInstance = branchInstance;
                } else if (checkGitCheckout(command)) {
                    prevCalcTop = calcTop - 90;
                    currentNode = getCheckoutName(command);
                    // eslint-disable-next-line no-param-reassign
                    array[index].currentBranch = currentNode;
                    const branchInstance = new GraphBranch(array[index].branch, array[index].currentBranch, prevCalcTop, 54);
                    branchInstance.createBranch();
                    // prevBranchInstance = branchInstance;
                } else {
                    // eslint-disable-next-line no-param-reassign
                    node.branch = [currentNode];
                    // eslint-disable-next-line no-param-reassign
                    node.currentBranch = currentNode;
                    const branchInstance = new GraphBranch(node.branch, node.currentBranch, calcTop, 54);
                    branchInstance.createBranch();
                    // prevBranchInstance = branchInstance;
                    node.parent.push(array[index].id);
                    // логика для отображения первого коммита, если команды никакой нет
                    if (!command) {
                        const nodeInstanceChildren = new GraphNode(array[index].name, calcTop, 50);
                        nodeInstanceChildren.createNode();
                    } else {
                        array[index].children.push(node);
                    }
                    if (array[index].children.length) {
                        const arrowInstance = new GraphArrow(prevCalcTop + 40, prevCalcTop);
                        arrowInstance.createArrow();
                        const nodeInstanceChildren = new GraphNode(array[index].children[index].name, calcTop, 50);
                        nodeInstanceChildren.createNode();
                    }
                    prevCalcTop = calcTop;
                }
            } else {
                recursive(array[index].children);
            }
        });
    }(nodes));
    if (!checkGitBranch(command) && !checkGitCheckout(command)) {
        calcTop += 90;
    }
    return nodes;
}
