import GitNode from '@/components/graph/node/Node';
import EllipseComponent from '@/components/graph/node/EllipseComponent.vue';

class GraphNode extends GitNode {
    componentNode = EllipseComponent;

    createNode() {
        return super.createNode();
    }
}

export default GraphNode;
