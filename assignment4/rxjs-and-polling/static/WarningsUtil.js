export default WarningsUtil = (warnings) => {
    const warningUrl = 'http://localhost:8080/warnings';
    let timeLastUpdate;
    const initialWarningSetup = () => {
        ajax.getJSON(warningUrl)
            .subscribe(res => pollSetup(res));
    }
    
    const pollSetup = (res) => {
        parseData(res);
        poll_warnings(`${warningUrl}/since/${timeLastUpdate}`)
            .subscribe(res => parseData(res));
    }
    
    const parseData = (res) => {
        timeLastUpdate = res.time;
        parseWarnings(res.warnings);
    }

    const poll_warnings = url => interval(5000).pipe(concatMap(() => ajax.getJSON(url)))

    const parseWarnings = (newWarnings) => {
        if(warnings.length === 0)
        {
            warnings.push(...newWarnings)
        }
        else
        {
            newWarnings.forEach(warning => {
                if(warningExists(warning))
                {
                    updateWarning(warning);
                }
                else
                {
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
        warningDiv.innerHTML = JSON.stringify(warning);
    }

    const addNewWarning = (warning) => {
        let warningDiv = document.createElement('div');
        
        warningDiv.id = warning.id;
        warningDiv.innerHTML = JSON.stringify(warning);
        document.body.appendChild(warningDiv);
    }


    // maybe it's not necessary to remove them and
    // let the user know that warning has been canceled
    const removeWarning = (warning) => {
        let warningDiv = document.getElementById(warning.id);
        warningDiv.parentNode.removeChild(element);
    }
}