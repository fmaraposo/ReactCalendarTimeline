/* import React from 'react';
import Timeline, {
  TimelineHeaders,
  DateHeader,
  SidebarHeader,
} from 'react-calendar-timeline';
import moment from 'moment';

import 'react-calendar-timeline/lib/Timeline.css'

let keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title',
};

const groups = [
  { id: 1, title: 'group 1' },
  { id: 2, title: 'group 2' },
];
const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour'),
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour'),
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
  },
];

class ReactTimeline extends React.Component {
  constructor(props) {
    super(props);

    const defaultTimeStart = moment().startOf('day').toDate();
    const defaultTimeEnd = moment().startOf('day').add(1, 'day').toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
    };
    console.log('Items: ', items);
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state; 

    return (
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
      ></Timeline>
    );
  }
}

export default ReactTimeline;
 */