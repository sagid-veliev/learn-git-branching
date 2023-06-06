import GitArrow from '@/components/graph/arrow/Arrow';
import ArrowComponent from '@/components/graph/arrow/ArrowComponent.vue';

class GraphArrow extends GitArrow {
    componentArrow = ArrowComponent;

    createArrow() {
        return super.createArrow();
    }
}

export default GraphArrow;
