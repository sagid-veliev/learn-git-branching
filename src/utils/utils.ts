import { Node } from '@/models/types';
import GraphNode from '@/utils/graphNode';
import GraphBranch from '@/utils/graphBranch';
import clear from '@/utils/clearPlayground';
import Api from '@/services/api';
import { NodeResponse } from '@/services/types';

export default async function gitNodes(nodes: Node[], command = 'git commit') {
    let responseData = null;
    await Api.graphWork(nodes[0], command, 1)
        .then((response: NodeResponse) => {
            responseData = JSON.parse(response.data);
        });
    if (responseData) {
        createNodes(responseData);
    }
    return Promise.resolve(responseData);
}

interface GitNode {
    node: Node;
    positionY: number;
    positionX: number;
    positionXBranch: number;
}

export function createNodes(nodes: Node[]) {
    let calcTop = 10;
    let calcLeft = 45;
    let calcLeftBranch = 48;
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
                        calcLeftBranch = (90 / (children + 1));
                    } else {
                        // eslint-disable-next-line no-loop-func
                        const parentNode = result.find((parent: GitNode) => parent.node.id === current?.node.children[0].parent[0]);
                        calcLeft = Number(parentNode?.positionX);
                        calcLeftBranch = Number(parentNode?.positionXBranch);
                    }
                    calcTop += 90;
                    // eslint-disable-next-line no-loop-func
                    current?.node.children.forEach((child: Node, index: number) => {
                        queue.push({
                            node: child,
                            positionY: calcTop,
                            positionX: calcLeft * (index + 1),
                            positionXBranch: (calcLeftBranch * (index + 1)) + 3,
                        });
                    });
                    calcLeft = 45;
                    calcLeftBranch = 48;
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
        const branchInstanceChildren = new GraphBranch(node.node.branch, node.node.currentBranch, node.positionY, node.positionXBranch, node.node.currentNode);
        branchInstanceChildren.createBranch();
    });
}
