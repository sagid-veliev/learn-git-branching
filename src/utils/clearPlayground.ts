export default function clear() {
    const blocksWithNodeClass = document.querySelectorAll('[class*="node"]');
    const blockWithArrowClass = document.querySelectorAll('[class*="arrow"]');
    const nodeList = [...blocksWithNodeClass, ...blockWithArrowClass];
    nodeList.forEach((node: Element) => {
        node.remove();
    });
}
