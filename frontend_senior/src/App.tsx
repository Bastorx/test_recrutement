import React, { useEffect, useRef, useState } from "react";
import {
  AppContainer,
  Calendar,
  CalendarSeparator,
  CalendarSeparatorLabel,
} from "./styled/calendar";
import CalendarEvents from "./components/CalendarEvents";

function App() {
  const [calendarHeight, setCalendarHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const computeCalendarHeight = () => {
      setCalendarHeight(ref.current?.clientHeight ?? 0);
    };
    computeCalendarHeight();
    window.addEventListener("resize", computeCalendarHeight);
    return () => {
      window.removeEventListener("resize", computeCalendarHeight);
    };
  });

  return (
    <AppContainer>
      <Calendar ref={ref} maxWidth="100vw" minHeight="100%">
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <CalendarSeparator
              key={`separator-${i + 1}`}
              top={(i + 1) * (calendarHeight / 12)}
            >
              <CalendarSeparatorLabel>{i + 10}h</CalendarSeparatorLabel>{" "}
            </CalendarSeparator>
          ))}
        <CalendarEvents />
      </Calendar>
    </AppContainer>
  );
}

export default App;
