// import { Node } from '@/models/types';
// import GraphNode from '@/utils/graphNode';
// import clear from '@/utils/clearPlayground';
// import GraphArrow from '@/utils/graphArrow';
// import GraphNode from '@/utils/graphNode';
// import GraphBranch from '@/utils/graphBranch';

// let prevCalcTop = 0;
// let prevBranchInstance: any;
// const branches = ['main'];
// let currBranch = 'main';
//
// function checkGitBranch(command: string) {
//     return command.includes('git branch') ? 1 : 0;
// }
//
// function checkGitCheckout(command: string) {
//     return command.includes('git checkout');
// }
//
// function checkGitCommit(command: string) {
//     return command === 'git commit';
// }
//
// // function checkGitMerge(command: string) {
// //     return command.includes('git merge');
// // }
//
// function getName(command: string) {
//     const splittedCommand: string[] = command.split(' ');
//     const branchName: string = splittedCommand[splittedCommand.length - 1];
//     return branchName;
// }
//
// function getBranchName(command: string) {
//     return getName(command);
// }
//
// export function getCheckoutName(command: string) {
//     return getName(command);
// }

// function getMergeName(command: string) {
//     return getName(command);
// }

// export default function gitNode(command: string, nodes: Node[], id: number): Node[] {
//     const node: Node = {
//         id,
//         name: `C${id}`,
//         parent: [],
//         children: [],
//         branch: [currBranch],
//         currentBranch: currBranch,
//         currentNode: true,
//     };
//
//     if (command) {
//         if (checkGitBranch(command)) {
//             (function addBranch(array: Node[]) {
//                 array.forEach((item: Node) => {
//                     if (item.children.length === 0) {
//                         item.branch.push(getBranchName(command));
//                     } else {
//                         addBranch(item.children);
//                     }
//                 });
//             }(nodes));
//         } else if (checkGitCheckout(command)) {
//             const checkoutName = getCheckoutName(command);
//             (function nullingNodes(array: Node[]) {
//                 array.forEach((item: Node) => {
//                     if (item.children.length === 0) {
//                         item.currentNode = false;
//                     } else {
//                         nullingNodes(item.children);
//                     }
//                 });
//             }(nodes));
//             nodes = (function checkoutNode(array: Node[]) {
//                 array.forEach((item: Node) => {
//                     if (item.branch.includes(checkoutName)) {
//                         currBranch = checkoutName;
//                         item.currentNode = true;
//                     }
//                     if (item.children.length) {
//                         checkoutNode(item.children);
//                     }
//                 });
//                 return array;
//             }(nodes));
//         } else if (checkGitCommit(command)) {
//             // eslint-disable-next-line no-inner-declarations
//             function searchDeepestChildren(child: Node) {
//                 const currentChild = child.children.find((item: Node) => item.currentBranch === currBranch);
//                 if (currentChild) {
//                     (function recursiveChildren(elem: Node) {
//                         if (elem.children.length) {
//                             const currentChildDeep = elem.children.find((item: Node) => item.currentBranch === currBranch);
//                             if (currentChildDeep) {
//                                 recursiveChildren(currentChildDeep);
//                             }
//                         } else {
//                             node.parent.push(elem.id);
//                             elem.children.push(node);
//                         }
//                     }(currentChild));
//                 } else {
//                     node.parent.push(id);
//                     child.children.push(node);
//                 }
//             }
//             (function addCommit(array: Node[]) {
//                 array.forEach((item: Node) => {
//                     if (item.currentNode) {
//                         item.currentNode = false;
//                         if (item.children.length) {
//                             searchDeepestChildren(item);
//                         } else {
//                             node.parent.push(item.id);
//                             item.children.push(node);
//                         }
//                     } else {
//                         addCommit(item.children);
//                     }
//                 });
//             }(nodes));
//         }
//     }
//     // eslint-disable-next-line no-use-before-define
//     createNodes(nodes);
//     return nodes;
// }
//
// interface GitNode { node: Node; positionY: number; positionX: number; }
//
// function createNodes(nodes: Node[]) {
//     let calcTop = 10;
//     let calcLeft = 45;
//     (function recursive(array: Node[]) {
//         const queue: GitNode[] = [];
//         const result: GitNode[] = [];
//         array.forEach((commit: Node) => {
//             let current: GitNode | undefined = { node: commit, positionY: calcTop, positionX: calcLeft };
//             queue.push({ node: commit, positionY: calcTop, positionX: calcLeft });
//             while (queue.length) {
//                 current = queue.shift();
//                 if (current) {
//                     result.push(current);
//                 }
//                 const children: number | undefined = current?.node.children.length;
//                 if (children) {
//                     if (children > 1) {
//                         calcLeft = 90 / (children + 1);
//                     } else {
//                         // eslint-disable-next-line no-loop-func
//                         const parentNode = result.find((parent: GitNode) => parent.node.id === current?.node.children[0].parent[0]);
//                         calcLeft = Number(parentNode?.positionX);
//                     }
//                     calcTop += 90;
//                     // eslint-disable-next-line no-loop-func
//                     current?.node.children.forEach((child: Node, index: number) => {
//                         queue.push({ node: child, positionY: calcTop, positionX: calcLeft * (index + 1) });
//                     });
//                     calcLeft = 45;
//                 }
//             }
//         });
//         console.log(result);
//         createGraph(result);
//     }(nodes));
// }
//
// function createGraph(nodes: GitNode[]) {
//     clear();
//     nodes.forEach((node: GitNode) => {
//         const nodeInstanceChildren = new GraphNode(node.node.name, node.positionY, node.positionX);
//         nodeInstanceChildren.createNode();
//     });
// }

import { Node } from '@/models/types';
import Api from '@/services/api';

export default async function gitNodes(command: string, id: number) {
    const node: Node = {
        name: `C${id}`,
        parent: [],
        children: [],
        branch: ['*master'],
        currentBranch: 'master',
        currentNode: true,
        type: 0,
    };

    const response = await Api.graphWork(node, command, 1);
    const nodes = response.data;
    console.log(nodes);
    // return nodes;
}
