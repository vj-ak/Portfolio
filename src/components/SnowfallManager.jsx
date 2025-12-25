import React, { useMemo, useEffect } from 'react';
import Snowfall from 'react-snowfall';

const SnowfallManager = () => {
    const isWinter = useMemo(() => {
        const today = new Date();
        const month = today.getMonth(); // 0-indexed (0 is Jan, 11 is Dec)
        const day = today.getDate();

        // Winter is December (11), January (0), February (1), and up to March 20th (2)
        // This logic works for every year automatically as it relies on the month/day of the current date.
        const isDecember = month === 11;
        const isJanOrFeb = month === 0 || month === 1;
        const isMarchWinter = month === 2 && day <= 20;

        return isDecember || isJanOrFeb || isMarchWinter;
    }, []);

    // We can also toggle the 'season-winter' class here if the user wants to keep the snow caps
    // The user didn't explicitly ask to remove snow caps, but did ask to "add snowfall... and set timelimit".
    // I will assume they want the snow caps to work with this time limit too since they just designed them.
    useEffect(() => {
        if (isWinter) {
            document.body.classList.add('season-winter');
        } else {
            document.body.classList.remove('season-winter');
        }
        return () => {
            document.body.classList.remove('season-winter');
        };
    }, [isWinter]);

    if (!isWinter) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999, // High z-index but behind modals if any
            pointerEvents: 'none', // Allow clicks to pass through
        }}>
            <Snowfall
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                snowflakeCount={150}
                radius={[0.5, 2.5]}
                speed={[0.5, 2.5]}
                wind={[0, 1.0]}
                color="#ffffff"
            />
        </div>
    );
};

export default SnowfallManager;
