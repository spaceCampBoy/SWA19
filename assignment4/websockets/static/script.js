import { fromEvent } from 'https://dev.jspm.io/rxjs@6/_esm2015';

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
const warningUrl = 'ws://localhost:8090/warnings';

let warnings = [];
let websocket;
let subscribed = true;
let severityFilterValue = 0;

const initialWarningSetup = () => {
    setupConnectionToServer();
    setupSubUnsubButton();
    setupWarningSeveritySelection();
}

const setupConnectionToServer = () => {
    websocket = new WebSocket(warningUrl);
    websocket.onopen = () => {
        subscribeToWarnigs();
    }
    websocket.onmessage = message => {
        parseData(JSON.parse(message.data));
    }
}


const subscribeToWarnigs = () => {
    const message = 'subscribe';
    websocket.send(message);
}

const unsubscribeToWarnigs = () => {
    const message ='unsubscribe';
    websocket.send(message);
}

const parseData = (res) => {
    if(res.warnings)
    {
        parseWarnings(res.warnings);
    }
    else
    {
        parseWarning(res);
    }
}

const parseWarnings = (newWarnings) => {
    if (warnings.length === 0) {
        warnings.push(...newWarnings);
        warnings.forEach(warning => addNewWarning(warning));
    } else {
        newWarnings.forEach(warning => {
            parseWarning(warning);
        });
    }
}

const parseWarning = (warning) => {
    if(warning.severity >= severityFilterValue)
    {
        if (warningExists(warning)) {
            updateWarning(warning);
        } else {
            warnings.push(warning);
            addNewWarning(warning);
        }
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
    if (subscribed) {
        unsubscribeToWarnigs();
        subUnsubBtn.innerHTML = 'Subscribe';
    } else {
        subscribeToWarnigs();
        subUnsubBtn.innerHTML = 'Unsubscribe';
    }
    subscribed = !subscribed;
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
