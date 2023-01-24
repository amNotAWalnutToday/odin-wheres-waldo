import { useEffect } from "react";
import { Li } from './ThingsToFind';

const Timer = ( {timeTaken, incrementTimer, parseTime} ) => {
    useEffect(() => {
        const timer = setTimeout(incrementTimer, 1000);
        return () => {clearTimeout(timer)};
    }, [timeTaken, incrementTimer]);

    return <Li className="timer" >{parseTime(timeTaken)}</Li>
}

export default Timer;
