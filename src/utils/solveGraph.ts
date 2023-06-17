import { Node } from '@/models/types';
import GraphNode from '@/utils/graphNode';
import GraphArrow from '@/utils/graphArrow';
import GraphBranch from '@/utils/graphBranch';

let calcTop = 50;
let prevCalcTop = 0;
let prevBranchInstance: any;

function solveGraph(graph: Node[]) {
    (function recursive(array) {
        array.forEach((node: Node, index: number) => {
            prevCalcTop = calcTop;
            if (prevBranchInstance) {
                prevBranchInstance.destroyBranch();
            }
            const branchInstance = new GraphBranch(array[index].branch, array[index].currentBranch, calcTop, 65, true);
            branchInstance.createBranch();
            prevBranchInstance = branchInstance;
            const nodeInstance = new GraphNode(array[index].name, calcTop, 50, true);
            nodeInstance.createNode();
            calcTop += 90;
            if (node.children.length) {
                const arrowInstance = new GraphArrow(prevCalcTop + 40, prevCalcTop, 50);
                arrowInstance.createArrow();
                recursive(array[index].children);
            }
        });
    }(graph));
}

export default solveGraph;
