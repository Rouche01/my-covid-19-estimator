const estimateInfection = (period, typeOfPeriod, currentNum) => {
    let convertedPeriod;
    if( typeOfPeriod === 'months') {
        convertedPeriod = period * 30;
    } else if(typeOfPeriod === 'weeks') {
        convertedPeriod = period * 7;
    } else if(typeOfPeriod === 'days') {
        convertedPeriod = period
    }

    let factor = Math.trunc(convertedPeriod / 3);

    return currentNum * (2 ** factor);
}

const covid19ImpactEstimator = (data) => {
    let impact = {}
    let severeImpact = {}
    let impactCurrentlyInfected = data.reportedCases * 10;
    let sevImpactCurrentlyInfected = data.reportedCases *  50;

    impact.currentlyInfected = impactCurrentlyInfected;
    severeImpact.currentlyInfected = sevImpactCurrentlyInfected;
    
    impact.infectionsByRequestedTime = estimateInfection(data.timeToElapse, data.periodType, impactCurrentlyInfected);
    severeImpact.infectionsByRequestedTime = estimateInfection(data.timeToElapse, data.periodType, sevImpactCurrentlyInfected);

    return {
        data = data,
        impact = impact,
        severeImpact = severeImpact
    }
};

export default covid19ImpactEstimator;
