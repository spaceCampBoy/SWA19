import {
    fromEvent,
    timer,
    interval
} from 'https://dev.jspm.io/rxjs@6/_esm2015';

import {
    ajax
} from 'https://dev.jspm.io/rxjs@6/_esm2015/ajax';

import {
    map,
    filter,
    concatMap
} from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

const warningColors = {
    0: "s0",
    1: "s1",
    2: "s2",
    3: "s3",
    4: "s4",
    5: "s5",
    6: "s6",
    7: "s7"
}
const warningUrl = 'http://localhost:8080/warnings';
let warningUrlSince;
let warnings = [];
let timeLastUpdate;
let warningPollingObservable;
let subscription;
let subscribedToObservable = false;
let severityFilterValue = 0;

const initialWarningSetup = () => {
    setupSubUnsubButton();
    setupWarningSeveritySelection();
    ajax.getJSON(warningUrl)
        .subscribe(res => pollSetup(res));
}

const pollSetup = (res) => {
    parseData(res);
    warningPollingObservable = poll_warnings();
    subscribeToWarnigs();
    subscribedToObservable = true;
}

const subscribeToWarnigs = () => {

    subscription = warningPollingObservable.subscribe(res => parseData(res));
}

const unsubscribeToWarnigs = () => {
    subscription.unsubscribe();
}

const parseData = (res) => {
    console.log(res);
    timeLastUpdate = res.time;
    warningUrlSince = `${warningUrl}/since/${timeLastUpdate}`;
    parseWarnings(res.warnings);
}

const poll_warnings = () => interval(5000)
    .pipe(concatMap(() => ajax.getJSON(warningUrlSince)))
    .pipe(map(res => {
        if (res.warnings) {
            console.log(res.warnings);
            res.warnings = res.warnings.filter(warning => warning.severity >= severityFilterValue);
        }
        return res;
    }))

const parseWarnings = (newWarnings) => {
    if (warnings.length === 0) {
        warnings.push(...newWarnings);
        warnings.forEach(warning => addNewWarning(warning));
    } else {
        newWarnings.forEach(warning => {
            if (warningExists(warning)) {
                updateWarning(warning);
            } else {
                warnings.push(warning);
                addNewWarning(warning);
            }
        });
    }
}

const warningExists = (warning) => {
    return warnings.findIndex(w => w.id === warning.id) !== -1;
}

const updateWarning = (warning) => {
    let warningDiv = document.getElementById(warning.id);
    warningDiv.classList.remove(warningDiv.classList.value);
    warningDiv.classList.add(warningColors[warning.severity])
    warningDiv.innerHTML = JSON.stringify(warning);
}

const addNewWarning = (warning) => {
    let warningDiv = document.createElement('div');

    warningDiv.id = warning.id;
    warningDiv.innerHTML = JSON.stringify(warning);
    warningDiv.classList.add(warningColors[warning.severity])
    document.querySelector('body').appendChild(warningDiv);
}

const setupSubUnsubButton = () => {
    let btn = document.getElementById('subUnsubBtn');
    // create an observable of button clicks
    const myObservable = fromEvent(btn, 'click');

    // subscribe to the obsevable
    myObservable.subscribe(event => subUnsub(event.target));
}

const subUnsub = (subUnsubBtn) => {
    if (subscribedToObservable) {
        unsubscribeToWarnigs();
        subscribedToObservable = false;
        subUnsubBtn.innerHTML = 'Subscribe';
    } else {
        subscribeToWarnigs();
        subscribedToObservable = true;
        subUnsubBtn.innerHTML = 'Unsubscribe';
    }
}

const setupWarningSeveritySelection = () => {
    let severityFilter = document.getElementById('severitySelect')

    // create an observable of selecting different filter value
    const myObservable = fromEvent(severityFilter, 'change');

    // subscribe to the obsevable
    myObservable.subscribe(event => selectedSeverityChanged(event.target.value));
}


const selectedSeverityChanged = (newValue) => {
    severityFilterValue = newValue;
}

initialWarningSetup();




// // maybe it's not necessary to remove them and
// // let the user know that warning has been canceled
// const removeWarning = (warning) => {
//     let warningDiv = document.getElementById(warning.id);
//     warningDiv.parentNode.removeChild(element);
// }


// const warningUrl = 'http://localhost:8080/warnings';

// •	display current warnings when the page load and update them
// without reloading the page when they are updated on the server. 



// const getAllWarnings = () => {
//     // 
//     poll_warnings(warningUrl).subscribe(res => console.log(res))
// }

// getAllWarnings();




// •	display changes in warnings since last update. 
// •	allow the user to set a minimal severity level to only 
//  display some of the warnings. Don't reload the warnings when the
//  user changes the minimal severity level.
// •	allow the user to complete turn off warnings. 
// Do not receive warnings from the server while they are turned off,
//  but reload them when they are turned on again.




// update the warnings every 5 seconds
// const getUpdatedWarningSince = (datetime) => {
//     poll_warnings(`${warningUrl}/since/${datetime}`)
//         .subscribe(res => console.log(res))
//     // .pipe(pairwise())
//     // .pipe(filter(([original, changed]) => original.moves.length < changed.moves.length))
//     // .pipe(map(([original, changed]) => ({ type: 'make-moves', ...changed, moves: changed.moves.slice(original.moves.length)})))
//     // .pipe(takeWhile(({winner, stalemate}) => !winner && !stalemate, true))
// }

// window.load = () => {
//     const input = document.querySelector('input')
//     const button = document.querySelector('button')
//     const ul = document.querySelector('ul')
//     const getText = () => input.value
//     const addBullet = text => {
//         const li = document.createElement('li')
//         li.innerText = text
//         ul.appendChild(li)
//     }
//     fromEvent(button, 'click')
//     .pipe(map(getText))
//     .pipe(filter(text => text !== ''))
//     .subscribe(addBullet)
// }