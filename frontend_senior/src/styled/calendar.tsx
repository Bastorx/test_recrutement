import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

type TFlexCalendarProps = {
  maxWidth?: string;
  minHeight?: string;
};
export const Calendar = styled.div<TFlexCalendarProps>`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: ${(props: TFlexCalendarProps) => props.maxWidth || "100vw"};
  min-height: ${(props: TFlexCalendarProps) => props.minHeight || "initial"};
  border-left: 1px solid #a4a4a4;
  border-right: 1px solid #a4a4a4;
  overflow: hidden;
`;

export const CalendarSeparator = styled.div<{ top: number }>`
  width: 100%;
  position: absolute;
  left: 0;
  top: ${(props: { top: number }) => props.top}px;
  height: 1px;
  background-color: #a4a4a4;
`;

export const CalendarSeparatorLabel = styled.div`
  position: absolute;
  left: 3px;
  bottom: 0;
  font-size: 10px;
  color: #a4a4a4;
`;

type TEventComponentProps = {
  top: number;
  height: number;
  width: number;
  left: number;
};
export const EventComponent = styled.div<TEventComponentProps>`
  display: flex;
  align-items: center;
  position: absolute;
  width: ${(props: TEventComponentProps) => props.width}%;
  top: ${(props: TEventComponentProps) => props.top}%;
  left: ${(props: TEventComponentProps) => props.left}%;
  height: ${(props: TEventComponentProps) => props.height}%;
  border-radius: 5px;
  background-color: #48c6ff70;
  box-shadow: inset 0px 0px 0px 1px rgba(0, 36, 128, 0.47);
`;

export const EventComponentText = styled.span`
  flex: 1;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
`;
