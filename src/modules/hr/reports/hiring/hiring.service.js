const Candidate = require("../../recruitment/candidate/candidate.model");
const Offer = require("../../recruitment/offer/offer.model");
const Hire = require("../../recruitment/hire/hire.model");

const getHiringReport = async (filters) => {
    const year = Number(filters.year || new Date().getFullYear());

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const candidates = await Candidate.find({
        appliedDate: { $gte: startDate, $lte: endDate },
    });

    const offers = await Offer.find({
        createdAt: { $gte: startDate, $lte: endDate },
    });

    const hires = await Hire.find({
        createdAt: { $gte: startDate, $lte: endDate },
    }).populate("candidateId");

    const sourceMap = {};

    candidates.forEach((candidate) => {
        const source = candidate.source || "OTHER";

        if (!sourceMap[source]) {
            sourceMap[source] = {
                source,
                candidates: 0,
                hires: 0,
                conversionRate: 0,
            };
        }

        sourceMap[source].candidates += 1;
    });

    hires.forEach((hire) => {
        const source = hire.candidateId?.source || "OTHER";

        if (!sourceMap[source]) {
            sourceMap[source] = {
                source,
                candidates: 0,
                hires: 0,
                conversionRate: 0,
            };
        }

        sourceMap[source].hires += 1;
    });

    const sourceEffectiveness = Object.values(sourceMap).map((item) => {
        item.conversionRate =
            item.candidates === 0
                ? 0
                : Number(((item.hires / item.candidates) * 100).toFixed(2));
        return item;
    });

    const totalCandidates = candidates.length;
    const totalOffers = offers.length;
    const totalHires = hires.length;

    const overallConversionRate =
        totalCandidates === 0
            ? 0
            : Number(((totalHires / totalCandidates) * 100).toFixed(2));

    return {
        year,
        totalCandidates,
        totalOffers,
        totalHires,
        overallConversionRate,
        sourceEffectiveness,
    };
};

module.exports = { getHiringReport };
