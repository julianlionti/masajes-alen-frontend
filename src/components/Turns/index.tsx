import moment, { Moment } from "moment";
import "moment/locale/es";

import React, { ReactNode, useCallback } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserCtx } from "../../providers/UserProvider";
import { Icon } from "../Signin/SiginElements";

import {
  ArrowLeft,
  ArrowRight,
  DateText,
  DayCard,
  DayH2,
  DayHeader,
  DaysContent,
  DayScroll,
  TurnContent,
  TurnHeader,
  TurnItem,
  TurnsRoot,
  TurnWrap,
} from "./TurnElements";
import { primaryColor, primaryColorDark } from "../ButtonElement";
import axios from "axios";
import Urls from "../../utils/Urls";

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
  { start: 19, disabled: false },
  { start: 20, disabled: false },
  { start: 21, disabled: false },
];

const formatStr = (str: string): ReactNode => {
  const first = str[0];
  const uppered = `${first.toUpperCase()}${str.substring(1).toLowerCase()}`;
  return uppered.substring(0, 3);
};

const compareEqual = (date1: Moment, date2: Moment): boolean =>
  date2.startOf("day").diff(date1.startOf("day"), "day") === 0;

const tomorrow = moment().add(1, "d").startOf("day").clone();
export const Turns = (): JSX.Element => {
  const [user] = useUserCtx();
  // const [showConfirmation, setShowConfirmation] = useState(false);
  const [date, setDate] = useState(tomorrow);
  const history = useHistory();

  const renderDays = useCallback(() => {
    const firstDay = date;
    const nextDays = Array(6)
      .fill(null)
      .map((_, i) => firstDay.clone().add(i, "d"));

    const onConfirmation = async (day: Moment, duration: string) => {
      const dayinMonth = day.date();
      const fullMonthName = `${formatStr(day.locale("es").format("MMM"))}`;

      if (!user) history.push("/signin");
      else {
        await Swal.fire({
          title: "Confirmación",
          icon: "info",
          html: `Estas por reservar el turno <b>${duration}</b> del día <b>${dayinMonth} ${fullMonthName}</b>`,
          iconColor: primaryColor,
          confirmButtonText: "Confirmar",
          confirmButtonColor: primaryColorDark,
          backdrop: true,
          showCloseButton: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            try {
              await axios.post(Urls.turn);
              return true;
            } catch (ex) {
              Swal.showValidationMessage(
                `No se pudo completar el pedido: ${ex.message}`
              );
              return false;
            }
          },
        });
      }
    };

    return nextDays.map((day) => {
      const weekDay = formatStr(day.locale("es").format("dddd"));
      const dayinMonth = day.date();
      const monthName = `${formatStr(day.locale("es").format("MMM"))}`;

      return (
        <DayCard key={day.date()}>
          <DayHeader>
            <DayH2>{weekDay}</DayH2>
            <DateText>{`${dayinMonth} ${monthName}`}</DateText>
          </DayHeader>
          <DayScroll>
            {hours
              .map((e) => ({ ...e, disabled: day.day() === 0 }))
              .map(({ start, disabled }) => {
                const duration = `${start}:00 - ${start}.${sessionTime}`;
                return (
                  <TurnItem
                    onClick={() => onConfirmation(day, duration)}
                    disabled={disabled}
                    key={start}
                  >
                    {duration}
                  </TurnItem>
                );
              })}
          </DayScroll>
        </DayCard>
      );
    });
  }, [date, history, user]);

  return (
    <TurnsRoot>
      <TurnWrap>
        <Icon to="/">Pedí tu turno</Icon>
        <TurnContent>
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
        </TurnContent>
      </TurnWrap>
      {/* <ConfirmationDlg
        show={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      /> */}
    </TurnsRoot>
  );
};
