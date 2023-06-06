import { Node } from '@/models/types';
import GraphArrow from '@/utils/graphArrow';
import GraphNode from '@/utils/graphNode';

let calcTop = 10;
let prevCalcTop = 0;

export default function gitNode(command: string, nodes: Node[], id: number): Node[] {
    const { length }: { length: number } = nodes;
    const node: Node = {
        id,
        name: `C${id}`,
        parent: [
            nodes[length - 1].id,
        ],
        type: 0,
        children: [],
    };
    (function recursive(array) {
        array.forEach((obj: Node, index: number) => {
            if (array[index].children.length === 0) {
                const nodeInstance = new GraphNode(array[index].name, calcTop, 55);
                nodeInstance.createNode();
                prevCalcTop = calcTop;
                array[index].children.push(node);
            } else {
                const arrowInstance = new GraphArrow(prevCalcTop + 40, prevCalcTop);
                arrowInstance.createArrow();
            }
            recursive(array[index].children);
        });
    }(nodes));
    calcTop += 90;
    return nodes;
}

// function checkMerge() {
//
// }
