import { Node } from '@/models/types';
import GraphNode from '@/utils/graphNode';
import GraphBranch from '@/utils/graphBranch';
import clear from '@/utils/clearPlayground';
// import GraphArrow from '@/utils/graphArrow';

// let prevCalcTop = 0;
// let prevBranchInstance: any;
// const branches = ['main'];
let currBranch = 'main';

function checkGitBranch(command: string) {
    return command.includes('git branch') ? 1 : 0;
}

function checkGitCheckout(command: string) {
    return command.includes('git checkout');
}

function checkGitCommit(command: string) {
    return command === 'git commit';
}

function checkGitMerge(command: string) {
    return command.includes('git merge');
}

function getName(command: string) {
    const splittedCommand: string[] = command.split(' ');
    const branchName: string = splittedCommand[splittedCommand.length - 1];
    return branchName;
}

function getBranchName(command: string) {
    return getName(command);
}

export function getCheckoutName(command: string) {
    return getName(command);
}

function getMergeName(command: string) {
    return getName(command);
}

export default function gitNode(command: string, nodes: Node[], id: number): Node[] {
    function searchDeepestChildren(child: Node) {
        const currentChild = child.children.find((item: Node) => item.currentBranch === currBranch);
        if (currentChild) {
            (function recursiveChildren(elem: Node) {
                if (elem.children.length) {
                    const currentChildDeep = elem.children.find((item: Node) => item.currentBranch === currBranch);
                    if (currentChildDeep) {
                        recursiveChildren(currentChildDeep);
                    }
                } else {
                    node.parent.push(elem.id);
                    elem.children.push(node);
                }
            }(currentChild));
        } else {
            node.parent.push(id);
            child.children.push(node);
        }
    }
    function addCommit(array: Node[]) {
        array.forEach((item: Node) => {
            if (item.currentNode) {
                item.currentNode = false;
                if (item.children.length) {
                    searchDeepestChildren(item);
                } else {
                    node.parent.push(item.id);
                    item.children.push(node);
                }
            } else {
                addCommit(item.children);
            }
        });
    }
    function addParent(mergeCommand: string) {
        const mergedBranch = getMergeName(mergeCommand);
        // eslint-disable-next-line no-unused-vars
        let mergedId = 0;
        (function searchLatestCommitOfMergedBeanch(array: Node[]) {
            debugger;
            array.forEach((item: Node) => {
                if (item.currentBranch === mergedBranch) {
                    if (item.children.length === 0) {
                        mergedId = item.id;
                    } else {
                        const children = item.children.find((child: Node) => child.currentBranch === mergedBranch);
                        if (children) {
                            searchLatestCommitOfMergedBeanch([children]);
                        }
                    }
                } else if (item.children.length) {
                    const children = item.children.find((child: Node) => child.currentBranch === mergedBranch);
                    if (children) {
                        searchLatestCommitOfMergedBeanch([children]);
                    }
                }
            });
        }(nodes));
        (function recursiveMergedBranch(array: Node[]) {
            array.forEach((node: Node) => {
                if (node.currentNode) {
                    node.parent.push(mergedId);
                } else {
                    recursiveMergedBranch(node.children);
                }
            });
        }(nodes));
    }
    const node: Node = {
        id,
        name: `C${id}`,
        parent: [],
        children: [],
        branch: [currBranch],
        currentBranch: currBranch,
        currentNode: true,
    };

    if (command) {
        if (checkGitBranch(command)) {
            (function addBranch(array: Node[]) {
                array.forEach((item: Node) => {
                    if (item.children.length === 0) {
                        item.branch.push(getBranchName(command));
                    } else {
                        addBranch(item.children);
                    }
                });
            }(nodes));
        } else if (checkGitCheckout(command)) {
            const checkoutName = getCheckoutName(command);
            (function nullingNodes(array: Node[]) {
                array.forEach((item: Node) => {
                    if (item.children.length === 0) {
                        item.currentNode = false;
                    } else {
                        nullingNodes(item.children);
                    }
                });
            }(nodes));
            nodes = (function checkoutNode(array: Node[]) {
                array.forEach((item: Node) => {
                    if (item.branch.includes(checkoutName)) {
                        currBranch = checkoutName;
                        item.currentNode = true;
                    }
                    if (item.children.length) {
                        checkoutNode(item.children);
                    }
                });
                return array;
            }(nodes));
        } else if (checkGitCommit(command)) {
            // eslint-disable-next-line no-inner-declarations
            addCommit(nodes);
            // eslint-disable-next-line no-inner-declarations
        } else if (checkGitMerge(command)) {
            addCommit(nodes);
            addParent(command);
        }
    }
    // eslint-disable-next-line no-use-before-define
    createNodes(nodes);
    return nodes;
}

interface GitNode { node: Node; positionY: number; positionX: number; positionXBranch: number; }

function createNodes(nodes: Node[]) {
    let calcTop = 10;
    let calcLeft = 45;
    let calcLeftBranch = 49;
    (function recursive(array: Node[]) {
        const queue: GitNode[] = [];
        const result: GitNode[] = [];
        array.forEach((commit: Node) => {
            let current: GitNode | undefined = {
                node: commit,
                positionY: calcTop,
                positionX: calcLeft,
                positionXBranch: calcLeftBranch,
            };
            queue.push({
                node: commit,
                positionY: calcTop,
                positionX: calcLeft,
                positionXBranch: calcLeftBranch,
            });
            while (queue.length) {
                current = queue.shift();
                if (current) {
                    result.push(current);
                }
                const children: number | undefined = current?.node.children.length;
                if (children) {
                    if (children > 1) {
                        calcLeft = 90 / (children + 1);
                        calcLeftBranch = (90 / (children + 1)) + 1;
                    } else {
                        // eslint-disable-next-line no-loop-func
                        const parentNode = result.find((parent: GitNode) => parent.node.id === current?.node.children[0].parent[0]);
                        calcLeft = Number(parentNode?.positionX);
                    }
                    calcTop += 90;
                    // eslint-disable-next-line no-loop-func
                    current?.node.children.forEach((child: Node, index: number) => {
                        queue.push({
                            node: child,
                            positionY: calcTop,
                            positionX: calcLeft * (index + 1),
                            positionXBranch: calcLeftBranch * (index + 1),
                        });
                    });
                    calcLeft = 45;
                }
            }
        });
        createGraph(result);
    }(nodes));
}

function createGraph(nodes: GitNode[]) {
    clear();
    nodes.forEach((node: GitNode) => {
        const nodeInstanceChildren = new GraphNode(node.node.name, node.positionY, node.positionX);
        nodeInstanceChildren.createNode();
        const branchInstanceChildren = new GraphBranch(node.node.branch, currBranch, node.positionY, node.positionXBranch);
        branchInstanceChildren.createBranch();
    });
}
