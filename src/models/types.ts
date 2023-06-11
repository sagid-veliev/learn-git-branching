export interface Node {
    id: number,
    name: string,
    parent: number[],
    type: number,
    children: Array<Node>,
    branch: string[],
    currentBranch: string,
}
