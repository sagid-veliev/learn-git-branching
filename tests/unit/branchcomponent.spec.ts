// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils';
import EllipseComponent from '@/components/graph/branch/BranchComponent.vue';

describe('BranchComponent.vue', () => {
    it('renders props.name when passed', () => {
        const name = 'master';
        const wrapper = shallowMount(EllipseComponent, {
            props: { name },
        });
        expect(wrapper.text()).toMatch(name);
    });
});
