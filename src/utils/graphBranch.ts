import GitBranch from '@/components/graph/branch/Branch';
import BranchComponent from '@/components/graph/branch/BranchComponent.vue';

class GraphBranch extends GitBranch {
    componentBranch = BranchComponent;

    createBranch() {
        return super.createBranch();
    }
}

export default GraphBranch;
