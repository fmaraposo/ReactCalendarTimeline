import React from 'react';
import Timeline, {
  TimelineHeaders,
  DateHeader,
  SidebarHeader,
} from 'react-calendar-timeline';
import moment from 'moment';
import people from '../../people.json';
import leave from '../../leave.json';

/* import 'react-calendar-timeline/lib/Timeline.css'; */

import './ReactTimeline.css';

const groups = [];
for (let i = 0; i < people.length; i++) {
  groups.push({
    department: `${people[i].department}`,
    id: people[i].agreementId,
    height: 30,
    title: `${people[i].employeeName}`,
  });
}

const items = [];
leave.map((leave) => {
  return items.push({
    //item[i].id must be unique
    id: leave.id,
    //item[i].group property must have the same id as group[i].id
    group: leave.agreementId,
    title: leave.type.toString(),
    start_time: moment(leave.start),
    end_time: moment(leave.end),
  });
});

class ReactTimeline extends React.Component {
  constructor(props) {
    super(props);

    const defaultTimeStart = moment().startOf('month').toDate();
    const defaultTimeEnd = moment().startOf('month').add(1, 'month').toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
    };
    console.log('State: ', this.state);
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      >
        <TimelineHeaders className="sticky">
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    );
  }
}

export default ReactTimeline;
