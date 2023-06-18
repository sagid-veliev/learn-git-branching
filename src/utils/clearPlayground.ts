export default function clear() {
    const blocksWithNodeClass = document.querySelectorAll('[class*="node"]');
    const blockWithArrowClass = document.querySelectorAll('[class*="arrow"]');
    const blockWithBranchClass = document.querySelectorAll('[class*="branch"]');
    const nodeList = [...blocksWithNodeClass, ...blockWithArrowClass, ...blockWithBranchClass];
    nodeList.forEach((node: Element) => {
        node.remove();
    });
}
