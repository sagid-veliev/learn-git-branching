export interface Node {
    id: number,
    name: string,
    parent: number[],
    children: Array<Node>,
    branch: string[],
    currentBranch: string,
    currentNode: boolean,
    type: number,
    copy: boolean,
}
