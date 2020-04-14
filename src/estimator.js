const estimateInfection = (period, typeOfPeriod, currentNum) => {
  let convertedPeriod;
  if (typeOfPeriod === 'months') {
    convertedPeriod = period * 30;
  } else if (typeOfPeriod === 'weeks') {
    convertedPeriod = period * 7;
  } else if (typeOfPeriod === 'days') {
    convertedPeriod = period;
  }

  const factor = Math.trunc(convertedPeriod / 3);

  return currentNum * (2 ** factor);
};

const estimateAvailableHospitalBeds = (totalBeds, severeCases) => {
  const initialAvailableBeds = 0.35 * totalBeds;
  const availableBeds = initialAvailableBeds - severeCases;
  return Math.trunc(availableBeds);
};


const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const impactCurrentlyInfected = data.reportedCases * 10;
  const sevImpactCurrentlyInfected = data.reportedCases * 50;

  impact.currentlyInfected = impactCurrentlyInfected;
  severeImpact.currentlyInfected = sevImpactCurrentlyInfected;

  const impactInfectionsEstimate = estimateInfection(data.timeToElapse, data.periodType,
    impactCurrentlyInfected);
  const sevImpactInfectionsEstimate = estimateInfection(data.timeToElapse,
    data.periodType, sevImpactCurrentlyInfected);

  impact.infectionsByRequestedTime = impactInfectionsEstimate;
  severeImpact.infectionsByRequestedTime = sevImpactInfectionsEstimate;

  const impactSevereCasesEstimate = 0.15 * impactInfectionsEstimate;
  const sevImpactSevereCasesEstimate = 0.15 * sevImpactInfectionsEstimate;

  impact.severeCasesByRequestedTime = Math.trunc(impactSevereCasesEstimate);
  severeImpact.severeCasesByRequestedTime = Math.trunc(sevImpactSevereCasesEstimate);

  impact.hospitalBedsByRequestedTime = estimateAvailableHospitalBeds(data.totalHospitalBeds,
    impactSevereCasesEstimate);
  severeImpact.hospitalBedsByRequestedTime = estimateAvailableHospitalBeds(
    data.totalHospitalBeds, sevImpactSevereCasesEstimate
  );

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
