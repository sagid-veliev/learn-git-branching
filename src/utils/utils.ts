import { Node } from '@/models/types';
import GraphNode from '@/utils/graphNode';
import GraphBranch from '@/utils/graphBranch';
import clear from '@/utils/clearPlayground';
import Api from '@/services/api';
import { NodeResponse } from '@/services/types';
import GraphArrow from '@/utils/graphArrow';

let responseData: any = null;
let responseRemoteData: any = null;
const arrowNodes: any[] = [];
let origin = false;

export default async function gitNodes(nodes: Node[], command = 'git commit') {
    await Api.graphWork(nodes[0], command, 1)
        .then((response: NodeResponse) => {
            responseData = JSON.parse(response.data);
            responseRemoteData = JSON.parse(response.remote_data);
        });
    if (responseData && !responseRemoteData) {
        createNodes(responseData);
    }
    if (responseData && responseRemoteData) {
        clear();
        createNodes(responseData, 40, 43);
        origin = true;
        createNodes(responseRemoteData, 70, 73);
    }
    return Promise.resolve(responseData);
}

interface GitNode {
    node: Node;
    positionY: number;
    positionX: number;
    positionXBranch: number;
}

export function createNodes(nodes: Node[], calcLeftParam?: number, calcLeftBranchParam?: number) {
    let calcTop = 10;
    let calcLeft = calcLeftParam ?? 45;
    let calcLeftBranch = calcLeftBranchParam ?? 48;
    (function recursive(array: Node[]) {
        const queue: GitNode[] = [];
        const result: GitNode[] = [];
        let children: number | undefined = 0;
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
                children = current?.node.children.length;
                console.log(current?.node.name, current?.node.children.length);
                if (children) {
                    if (children > 1) {
                        calcLeft = 90 / (children + 1);
                        calcLeftBranch = (90 / (children + 1)) + 3;
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
                            positionXBranch: calcLeftBranch * (index + 1) - (3 * index),
                        });
                    });
                    calcLeft = calcLeftParam ?? 45;
                    calcLeftBranch = calcLeftBranchParam ?? 48;
                }
            }
        });
        createGraph(result);
    }(nodes));
}

interface ArrowData {
    dataNode: Node,
    gitNode: HTMLElement | null,
}

function createGraph(nodes: GitNode[]) {
    if (responseData && !responseRemoteData) {
        clear();
    }
    const graphNodes: ArrowData[] = [];
    nodes.forEach((node: GitNode) => {
        const nodeInstanceChildren = new GraphNode(node.node.name, node.positionY, node.positionX);
        nodeInstanceChildren.createNode();
        graphNodes.push({ dataNode: node.node, gitNode: nodeInstanceChildren.element });
        const branchInstanceChildren = new GraphBranch(node.node.branch, node.node.currentBranch, node.positionY, node.positionXBranch, node.node.currentNode);
        branchInstanceChildren.createBranch();
    });
    if (graphNodes.length > 1) {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < graphNodes.length; i++) {
            if (graphNodes[i].dataNode.parent.length) {
                graphNodes[i].dataNode.parent.forEach((parentId: number) => {
                    const selfNode = graphNodes[i];
                    const parentNode = graphNodes.find((elem: ArrowData) => elem.dataNode.id === parentId);
                    arrowNodes.push({
                        x1: Number(selfNode.gitNode?.offsetLeft) + 12,
                        y1: Number(selfNode.gitNode?.offsetTop) + 12,
                        x2: Number(parentNode?.gitNode?.offsetLeft) + 12,
                        y2: Number(parentNode?.gitNode?.offsetTop) + 12,
                    });
                });
            }
        }
    }
    if (origin) {
        const arrowInstanceChildren = new GraphArrow(arrowNodes);
        arrowInstanceChildren.createArrow();
    }
}
