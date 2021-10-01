function order(text) {
    let data = [], lines = [], subElement = [];
    var temp = '', c;

    for (i=0; i<text.length; i++) {
        c = text.charAt(i);
        if (c == '\n') {
            lines.push(temp);
            temp = '';
        } else {
            temp += c;
        }
    }
    
    for (i=0; i<3; i++) {
        lines.shift();
    }

    lines.forEach(element => {
        var reading = true, lastReadingStatus = false;
        temp = '';
        for (i=0; i<element.length; i++) {
            let c = element.charAt(i);
            if ( ( (c >= 'A') && ( c <= 'Z') ) || // if mayus
                 ( (c >= 'a') && ( c <= 'z') ) || // Or if minius
                 ( (c >= '0') && ( c <= '9') ) || // Or is a number
                 ( (c == '.') || (c == '-') || (c == '/') || (c == ':')) ) { // Or any special character how ( . - / : )
                reading = true;
            } else {
                reading = false;
            }
            if (reading) {
                temp += c;
            } else {
                if (lastReadingStatus) {
                    subElement.push(temp);
                    temp = '';
                }
            }
            lastReadingStatus = reading;
        }
        var processName = '', pid = '', sesion = '', numSesion = '', memorie = '', status = '', user = '', timeCPU = '', title = '';
        var extra = 0, separatorExtra;
        for (i=0; i<subElement.length; i++) {
            if (extra == 0) processName = subElement[extra];
            if (extra == 1) pid = subElement[extra];
            if (extra == 2) sesion = subElement[extra];
            if (extra == 3) numSesion = subElement[extra];
            if (extra == 4) memorie = subElement[extra] + ' ' + subElement[extra+1];
            if (extra == 5) status = subElement[extra+1];
            if (extra == 6) user = subElement[extra+1];
            if (extra == 7) timeCPU = subElement[extra+1];
            if (extra > 7) {
                if(timeCPU.length > 0){
                    if (!(timeCPU.charAt(0) >= '0' && timeCPU.charAt(0) <= '9')) {
                        timeCPU = subElement[extra];
                        separatorExtra = extra+1;
                    } else {
                        if (extra > separatorExtra) title += ' ';
                        title += subElement[extra];
                    }
                }
            }
            extra++;
        }
        if (pid.charAt(0) >= 0 && pid.charAt(0) <= 9) {
            data.push( { processName, pid, sesion, numSesion, memorie, status, user, timeCPU, title } );
        }
        subElement = [];
    });
    return data;
}

module.exports.order = order;