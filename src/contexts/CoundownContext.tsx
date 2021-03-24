import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  isActive: boolean;
  isHasFinished: boolean;
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

let countDownTimeout: NodeJS.Timeout;


export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProviderProps) {
  const {startNewChallenge} = useContext(ChallengeContext);


  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isHasFinished, setIsHasFinished] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  
  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(25 * 60);
    setIsHasFinished(false);
  }

  useEffect(()=> {
    if(isActive && time >0){
      countDownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if(isActive && time === 0){
      setIsHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])



  return(
    <CountdownContext.Provider value={{
      isActive,
      isHasFinished,
      minutes,
      seconds,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}