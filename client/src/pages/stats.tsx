import { Card, CircularProgress } from "@pankod/refine-mui";
import { MonetizationOnRounded, MoneyOff, People } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  getNumberOfPaidTeams,
  getNumberOfUnpaidTeams,
  getTotalParticipantsCount,
  getAllEvents,
  getTotalGitParticipantsCount,
} from "utils/utils";

export const StatsPage: React.FC = () => {
  const [totalParticipation, setTotalParticipation] = useState<number | null>(
    null
  );
  const [totalGitParticipation, setTotalGitParticipation] = useState<
    number | null
  >(null);
  const [paidTeams, setPaidTeams] = useState<number | null>(null);
  const [unpaidTeams, setUnpaidTeams] = useState<number | null>(null);
  const [events, setEvents] = useState<any>(null);

  useEffect(() => {
    getTotalParticipantsCount().then((count) => {
      if (count === null) return console.error("Failed to get count!");

      setTotalParticipation(count);
    });

    getTotalGitParticipantsCount().then((count) => {
      if (count === null) return console.error("Failed to get count!");

      setTotalGitParticipation(count);
    });

    getNumberOfPaidTeams().then((count) => {
      if (count === null) return console.error("Failed to get count!");

      setPaidTeams(count);
    });

    getNumberOfUnpaidTeams().then((count) => {
      if (count === null) return console.error("Failed to get count!");

      setUnpaidTeams(count);
    });

    getAllEvents().then((eve: any) => {
      if (eve === null) return console.error("Failed to get events!");
      let eves: any = [];

      eve.map((event: any) => {
        eves.push({
          title: event.title,
          club: event.club,
          team_size: event.team_size,
          min_team_size: event.min_team_size,
          _id: event._id,
        });
      });
      console.log(eves);
      let groupedEvents: any = {};
      for (const item of eve) {
        if (!groupedEvents[item.club]) {
          groupedEvents[item.club] = [];
        }
        groupedEvents[item.club].push(item);
      }
      setEvents(groupedEvents);
    });
  }, []);

  return (
    <div>
      <h1>Stats</h1>
      <br />
      <Card
        style={{ padding: "1cm", display: "flex", flexDirection: "column" }}
      >
        {totalParticipation !== null ? (
          <div>
            <span style={{ fontSize: "40px", color: "#9999ff" }}>
              <strong>{totalParticipation.toLocaleString("en-IN")}</strong>
            </span>
            <h3>
              <People fontSize="inherit" /> Total Participants
            </h3>
          </div>
        ) : (
          <CircularProgress />
        )}
        <br />
        <br />
        {totalGitParticipation !== null ? (
          <div>
            <span style={{ fontSize: "40px", color: "#9999ff" }}>
              <strong>{totalGitParticipation.toLocaleString("en-IN")}</strong>
            </span>
            <h3>
              <People fontSize="inherit" /> Total Participants from GIT (Note:
              This value is prone to a ±50 margin of error)
            </h3>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Card>
      <br />
      <Card
        style={{ padding: "1cm", display: "flex", flexDirection: "column" }}
      >
        {paidTeams !== null ? (
          <div>
            <span style={{ fontSize: "40px", color: "green" }}>
              <strong>{paidTeams.toLocaleString("en-IN")}</strong>
            </span>
            <h3>
              Teams have registered and{" "}
              <MonetizationOnRounded fontSize="inherit" /> have paid
            </h3>
          </div>
        ) : (
          <CircularProgress />
        )}
        <br />
        <br />
        {unpaidTeams !== null ? (
          <div>
            <span style={{ fontSize: "40px", color: "red" }}>
              <strong>{unpaidTeams.toLocaleString("en-IN")}</strong>
            </span>
            <h3>
              Teams have registered but <MoneyOff fontSize="inherit" /> not paid
            </h3>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Card>
      <br />
      <h1>Event Stats</h1>
      <br />
      {events === null && <CircularProgress />}
      {events !== null &&
        Object.keys(events).map((club: any) => {
          return (
            <div>
              <h1>{club}</h1>
              {events[club].map((event: any) => {
                let paidTeams = 0;
                let totalTeams = event.registered_teams.length;
                event.registered_teams.map((team: any) => {
                  if (team.payment.status) paidTeams++;
                });

                return (
                  <Card
                    style={{
                      padding: "1cm",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "1cm",
                    }}
                  >
                    <div>
                      <h2>{event.title}</h2>
                      <h3>Registered Teams: {totalTeams}</h3>
                      <h3>Paid Teams: {paidTeams}</h3>
                      <h3>Unpaid Teams: {totalTeams - paidTeams}</h3>
                    </div>
                  </Card>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};
