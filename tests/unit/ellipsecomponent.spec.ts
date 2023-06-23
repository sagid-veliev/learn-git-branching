// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils';
import EllipseComponent from '@/components/graph/node/EllipseComponent.vue';

describe('EllipseComponent.vue', () => {
    it('renders props.name when passed', () => {
        const name = 'new name';
        const wrapper = shallowMount(EllipseComponent, {
            props: { name },
        });
        expect(wrapper.text()).toMatch(name);
    });
});
