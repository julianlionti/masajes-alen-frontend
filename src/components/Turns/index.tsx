import moment, { Moment } from "moment";
import "moment/locale/es";

import { ReactNode, useCallback } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserCtx } from "../../providers/UserProvider";
import { Icon } from "../Signin/SiginElements";
import CustomScroll from "react-scrollbars-custom";

import {
  ArrowLeft,
  ArrowRight,
  DateText,
  DayCard,
  DayH2,
  DayHeader,
  DaysContent,
  TurnCard,
  TurnContent,
  TurnHeader,
  TurnItem,
  TurnsRoot,
  TurnWrap,
} from "./TurnElements";
import { useEffect } from "react";

const sessionTime = 40;
const hours = [
  { start: 9, disabled: false },
  { start: 10, disabled: false },
  { start: 11, disabled: false },
  { start: 12, disabled: false },
  { start: 14, disabled: false },
  { start: 15, disabled: false },
  { start: 16, disabled: false },
  { start: 17, disabled: false },
  { start: 18, disabled: false },
];

const compareEqual = (date1: Moment, date2: Moment): boolean =>
  date2.startOf("day").diff(date1.startOf("day"), "day") === 0;

const tomorrow = moment().add(1, "d").startOf("day").clone();
export const Turns = (): JSX.Element => {
  const [user] = useUserCtx();
  const [date, setDate] = useState(tomorrow);
  const history = useHistory();

  const renderDays = useCallback(() => {
    const firstDay = date;
    const nextDays = Array(6)
      .fill(null)
      .map((_, i) => firstDay.clone().add(i, "d"));

    return nextDays.map((day) => (
      <DayCard key={day.date()}>
        <DayHeader>
          <DayH2>{formatStr(day.format("dddd"))}</DayH2>
          <DateText>{`${day.date()} ${formatStr(
            day.format("MMMM")
          )}`}</DateText>
        </DayHeader>
        <CustomScroll style={{ height: 350 }}>
          {hours
            .map((e) => ({ ...e, disabled: day.day() === 0 }))
            .map(({ start, disabled }) => (
              <TurnItem
                onClick={() => {
                  if (!user) history.push("/signin");
                  else alert("Confirmar Turno");
                }}
                disabled={disabled}
                key={start}
              >{`${start}:00 - ${start}.${sessionTime}`}</TurnItem>
            ))}
        </CustomScroll>
      </DayCard>
    ));
  }, [date, history, user]);

  return (
    <TurnsRoot>
      <TurnWrap>
        <Icon to="/">Pedí tu turno</Icon>
        <TurnContent>
          <TurnCard>
            <TurnHeader>
              <ArrowLeft
                onClick={() => setDate((e) => e.clone().subtract(1, "d"))}
                disabled={compareEqual(date, tomorrow)}
              />
              <ArrowRight
                onClick={() => setDate((e) => e.clone().add(1, "d"))}
                disabled={compareEqual(date, moment().add(15, "d"))}
              />
              <DateText>Julio 2021</DateText>
            </TurnHeader>
            <DaysContent>{renderDays()}</DaysContent>
          </TurnCard>
        </TurnContent>
      </TurnWrap>
    </TurnsRoot>
  );
};

function formatStr(str: string): ReactNode {
  const first = str[0];
  const uppered = `${first.toUpperCase()}${str.substring(1).toLowerCase()}`;
  return uppered.substring(0, 3);
}
