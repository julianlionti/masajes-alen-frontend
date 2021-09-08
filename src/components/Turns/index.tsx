import moment, { Moment } from "moment";
import "moment/locale/es";

import { ReactNode, useCallback } from "react";
import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  DateText,
  DayCard,
  DayH2,
  DayHeader,
  DaysContent,
  DayScroll,
  TurnHeader,
  TurnItem,
} from "./TurnElements";
import { ScreenContainer } from "../ScreenContainer/ScreenContainer";
import { useSelector } from "../../utils/Store";
import { useRef } from "react";
import { AlertDialog } from "../AlertDialog/AlertDialog";
import { useDispatch } from "react-redux";
import { cleanPostedTurn, postTurn } from "../../reducers/turn";
import { useHistory } from "react-router-dom";
import Cookies from "../../utils/Cookies";
import Config from "../../utils/Config";
import { ContactAlert } from "../ContactoInfo/ContactAlert";

const sessionTime = 40;
const hours = [
  { start: 9 },
  { start: 10 },
  { start: 11 },
  { start: 12 },
  { start: 14 },
  { start: 15 },
  { start: 16 },
  { start: 17 },
  { start: 18 },
];

const formatStr = (str: string): ReactNode => {
  const first = str[0];
  const uppered = `${first.toUpperCase()}${str.substring(1).toLowerCase()}`;
  return uppered.substring(0, 3);
};

const compareEqual = (date1: Moment, date2: Moment): boolean =>
  date2.startOf("day").diff(date1.startOf("day"), "day") === 0;

const tomorrow = moment().add(1, "d").startOf("day").clone();

type TurnConfirmation = {
  dayInMonth: number;
  fullMonthName: string;
  day: Moment;
  duration: string;
};

export const Turns = (): JSX.Element => {
  const history = useHistory();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const dispatch = useDispatch();
  const turnRef = useRef<TurnConfirmation | null>(null);
  const [mustLogin, setMustLogin] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { loading, turns, error, success } = useSelector(({ turn }) => turn);
  const { user } = useSelector(({ user }) => user);

  const [date, setDate] = useState(tomorrow);

  const onConfirmated = useCallback(
    (wasAccepted) => {
      setShowConfirmation(false);

      if (!user.email) {
        setShowContactInfo(true);
      } else {
        if (wasAccepted && turnRef.current) {
          dispatch(postTurn({ day: turnRef.current.day.toDate().toString() }));
        }
      }
    },
    [dispatch, user]
  );

  const handleContactInfo = useCallback(
    (accepted) => {
      setShowContactInfo(false);
      if (accepted && turnRef.current) {
        dispatch(postTurn({ day: turnRef.current.day.toDate().toString() }));
      }
    },
    [dispatch]
  );

  const renderDays = useCallback(() => {
    const firstDay = date;
    const nextDays = Array(6)
      .fill(null)
      .map((_, i) => firstDay.clone().add(i, "d"));

    const onTurn = async (day: Moment, start: number) => {
      const userToken = Cookies.get(Config.USER_KEY);
      if (!userToken) {
        setMustLogin(true);
        return;
      }

      const duration = `${start}:00 - ${start}.${sessionTime}`;
      day.set("h", start);
      const dayInMonth = day.date();
      const fullMonthName = `${formatStr(day.locale("es").format("MMM"))}`;
      turnRef.current = { day, fullMonthName, dayInMonth, duration };
      setShowConfirmation(true);
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
              .map(({ start }) => {
                const duration = `${start}:00 - ${start}.${sessionTime}`;
                const turnTime = day.clone().set("h", start).toISOString();

                const disabled =
                  turns.map((e) => e.day).includes(turnTime) ||
                  day.isoWeekday() === 7;

                return (
                  <TurnItem
                    onClick={() => onTurn(day, start)}
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
  }, [date, turns]);

  return (
    <ScreenContainer title="Pedi tu turno" loading={loading}>
      <TurnHeader>
        <ArrowLeft
          onClick={() => setDate((e) => e.clone().subtract(1, "d"))}
          disabled={compareEqual(date, tomorrow)}
        />
        <ArrowRight
          onClick={() => setDate((e) => e.clone().add(1, "d"))}
          disabled={compareEqual(date, moment().add(15, "d"))}
        />
        <DateText>{`${date.format("MMM")} ${date.format("YYYY")}`}</DateText>
      </TurnHeader>
      <DaysContent>{turns && renderDays()}</DaysContent>
      <AlertDialog
        icon="question"
        onClose={onConfirmated}
        show={showConfirmation}
        title={"Confirmación"}
        subtitle={
          turnRef.current ? (
            <span>
              Estás por reservar el turno{" "}
              <b>{` ${turnRef.current.duration} `}</b>del día
              <b>
                {` ${turnRef.current.dayInMonth} ${turnRef.current.fullMonthName} `}
              </b>
            </span>
          ) : (
            ""
          )
        }
      />
      <ContactAlert show={showContactInfo} onClose={handleContactInfo} />

      <AlertDialog
        btns={["close"]}
        onClose={() => dispatch(cleanPostedTurn())}
        show={!!success || !!error}
        icon={success ? "success" : error ? "error" : undefined}
        title={success ? "Confirmado!" : "Ocurrió un error"}
        subtitle={
          success ? (
            <span>
              El turno fue <b>reservado</b> satisfactoriamente. Gracias!
            </span>
          ) : (
            error
          )
        }
      />
      <AlertDialog
        title="Masajes Alen"
        icon="information"
        subtitle={
          <span>
            Para sacar un turno es <b>necesario</b> iniciar sesión
            <br />
            Haga click en <b>aceptar</b> y será reirigido
          </span>
        }
        show={mustLogin}
        onClose={(wasAccepted) => {
          setMustLogin(false);

          if (wasAccepted) {
            history.replace("/signin", { from: "turns" });
          }
        }}
      ></AlertDialog>
    </ScreenContainer>
  );
};
