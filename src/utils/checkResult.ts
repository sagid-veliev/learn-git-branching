// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

export default function checkResult(nodes: any, solve: any) {
    return _.isEqual(nodes, solve);
}
