import { TEvent } from "../types/event.type";

export const concurrentEvents = (
  event1: Required<TEvent>,
  event2: Required<TEvent>,
) => {
  if (
    event2.start_date < event1.end_date &&
    event2.end_date > event1.start_date
  ) {
    return true;
  } else if (
    event2.end_date > event1.start_date &&
    event2.start_date < event1.end_date
  ) {
    return true;
  }
  return false;
};

export const getFormattedEvents = (input: TEvent[]): Required<TEvent>[] => {
  return input.map((event) => {
    const start_date = new Date(0);
    const [, hours, minutes] = event.start.match(
      /(\d{2}):(\d{2})/,
    ) as RegExpMatchArray; // TODO: check it really match
    start_date.setUTCHours(parseInt(hours, 10));
    start_date.setUTCMinutes(parseInt(minutes, 10));
    const end_date = new Date(start_date);
    end_date.setUTCMinutes(start_date.getUTCMinutes() + event.duration);
    return {
      ...event,
      start_date,
      end_date,
      position: { column: 1, columns: 1 },
    } as Required<TEvent>;
  });
};

export const checkEventsAndSetColumns = (
  events: Required<TEvent>[],
): Required<TEvent>[] => {
  for (let i = 0; i < events.length; i++) {
    const previousConcurrentEvent = events
      .slice(0, i)
      .filter((e) => concurrentEvents(e, events[i]));
    let column = 1;
    const checkConcurrentColumns = (): number => {
      if (previousConcurrentEvent.find((e) => e.position.column === column)) {
        column++;
        return checkConcurrentColumns();
      }
      return column;
    };
    events[i].position.column = checkConcurrentColumns();
  }
  for (let i = 0; i < events.length; i++) {
    const allConcurrentEvent = events.filter((e) =>
      concurrentEvents(e, events[i]),
    );
    const columnPositions = allConcurrentEvent.map((e) => e.position.column);
    const columnMaxPositions = allConcurrentEvent.map(
      (e) => e.position.columns,
    );
    events[i].position.columns = Math.max(
      ...columnPositions,
      ...columnMaxPositions,
    );
    for (let j = 0; j < allConcurrentEvent.length; j++) {
      if (allConcurrentEvent[j].position.columns < events[i].position.columns) {
        allConcurrentEvent[j].position.columns = events[i].position.columns;
      }
    }
  }
  return events;
};

// 720 minutes per semi-days. This function convert duration to percent of a semi-day
export const durationToSemiDayPercent = (duration: number) =>
  (duration / 720) * 100;

// Compute percent of day passed before date and bwn 9AM to 9PM
export const startDateToSemiDayPercent = (date: Date) => {
  const minutesElapsed =
    date.getUTCHours() * 60 + date.getUTCMinutes() - 60 * 9;
  return durationToSemiDayPercent(minutesElapsed);
};
