// src/components/App.tsx
import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import type { Votes, VoteType } from "../../types/vots";
import VoteOptions from "../VoteOptions/VoteOptions";
import { useState } from "react";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification"


export default function App() {
  const [votes, SetVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  function handleVote(type: VoteType) : void {
    switch (type) {
      case 'good':
        SetVotes({...votes, good: votes.good +1})
        break;
      case 'bad':
        SetVotes({...votes, bad: votes.bad +1})
        break;
      case 'neutral':
        SetVotes({...votes, neutral: votes.neutral +1})
      break;
      default:
        break; 
    }
  }
  function resetVotes() : void{
     SetVotes({
    good: 0,
    neutral: 0,
    bad: 0,
  })
  }
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={votes.good+votes.bad+votes.neutral ? true : false} />
      {votes.good+votes.bad+votes.neutral? <VoteStats votes={votes} totalVotes={votes.good+votes.bad+votes.neutral} positiveRate={(votes.good+votes.bad+votes.neutral)
    ? Math.round((votes.good / (votes.good+votes.bad+votes.neutral)) * 100)
    : 0}/> : <Notification/>}
    </div>
  );
}
