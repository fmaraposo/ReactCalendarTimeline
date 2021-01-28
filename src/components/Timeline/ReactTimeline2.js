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
people.map((people) => {
  return groups.push({
    department: `${people.department}`,
    id: people.agreementId,
    height: 30,
    title: `${people.employeeName}`,
  })
})

const items = [];
leave.map((leave) => {
  return items.push({
    //item[i].id must be unique
    id: leave.id,
    //item[i].group property must have the same id as group[i].id
    group: leave.agreementId,
    type: leave.type,
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

  itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    //Change the backgroundColor of the item once it's selected
    const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : item.selectedBgColor) : item.bgColor;
    //Change the borderColor of the item once it's resized
    const borderColor = itemContext.resizing ? "red" : item.color;
    return (
      <div
        //props to style the root element of the item div
        {...getItemProps({
          style: {
            backgroundColor: item.type.toString() === '6020' ? 'blue' :'red',
            color: item.color,
            borderColor,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1
          }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  //Allows the items to change groups
  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];
    
    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            })
          : item
      )
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;
    console.log('handleItemResize', edge)
    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start_time,
              end: edge === "rigt" ? time : item.end_time,
            })
          : item
      )
    });

    console.log("Resized", itemId, time, edge);
  };


  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        itemRenderer={this.itemRenderer}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        useResizeHandle={true}

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
