import React, { useMemo } from "react";
import input from "../data/input.json";
import { TEvent } from "../types/event.type";
import {
  checkEventsAndSetColumns,
  durationToSemiDayPercent,
  getFormattedEvents,
  startDateToSemiDayPercent,
} from "../utils/event";
import { EventComponent, EventComponentText } from "../styled/calendar";

const CalendarEvents = () => {
  const events = useMemo(() => {
    const formattedEvents = getFormattedEvents(input as TEvent[]);
    return checkEventsAndSetColumns(formattedEvents);
  }, []);

  return (
    <>
      {events.map((event, i) => (
        <EventComponent
          key={event.id}
          top={startDateToSemiDayPercent(event.start_date)}
          height={durationToSemiDayPercent(event.duration)}
          width={100 / event.position.columns}
          left={((event.position.column - 1) / event.position.columns) * 100}
        >
          <EventComponentText>{event.id}</EventComponentText>
        </EventComponent>
      ))}
    </>
  );
};

export default CalendarEvents;
