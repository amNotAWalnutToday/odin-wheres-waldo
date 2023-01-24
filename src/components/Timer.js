import { useEffect } from "react";
import { Li } from './ThingsToFind';

const Timer = ( {timeTaken, incrementTimer} ) => {
    useEffect(() => {
        const timer = setTimeout(incrementTimer, 1000);
        return () => {clearTimeout(timer)};
    }, [timeTaken, incrementTimer]);

    const parseTime = () => {
        let seconds;
        const minutes = Math.floor(timeTaken / 60);
        if(minutes > 0) seconds = timeTaken - (minutes * 60); 
        else seconds = timeTaken;
        return `${minutes}m ${seconds}s`
    }

    return <Li className="timer" >{parseTime()}</Li>
}

export default Timer;
