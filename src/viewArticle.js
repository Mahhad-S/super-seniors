document.addEventListener('DOMContentLoaded', function() {
    const title = localStorage.getItem('articleTitle');
    const body = localStorage.getItem('articleBody');
    const sttb = localStorage.getItem('articleSttb');
    const sptb = localStorage.getItem('articleSptb');
    const spbb = localStorage.getItem('articleSpbb');
    const sbtb = localStorage.getItem('articleSbtb');
    const category = localStorage.getItem('articleCategory');

    document.getElementById('articleTitle').textContent = title;
    document.getElementById('articleBody').innerHTML = body;
    document.getElementById('articleSttb').innerHTML = sttb;
    document.getElementById('articleSptb').innerHTML = sptb;
    document.getElementById('articleSpbb').innerHTML = spbb;
    document.getElementById('articleSbtb').innerHTML = sbtb;

    const additionalBody = document.getElementById('additionalBody');
    const additionalSidebar = document.getElementById('additionalSidebar');

    if (category === 'general') {
        // Clear local storage for non-general articles' keys
        localStorage.removeItem('articleCHair');
        localStorage.removeItem('articleCSkin');
        localStorage.removeItem('articleCEye');
        localStorage.removeItem('articleCHeight');
        localStorage.removeItem('articleCWeight');
        localStorage.removeItem('articleCSex');
        localStorage.removeItem('articleCGen');
        localStorage.removeItem('articleCRace');
        localStorage.removeItem('articleCEth');
        localStorage.removeItem('articleCNat');
        localStorage.removeItem('articleCAge');
        localStorage.removeItem('articleIPrice');
        localStorage.removeItem('articleIWeight');
        localStorage.removeItem('articleISize');
        localStorage.removeItem('articleICDate');
        localStorage.removeItem('articleIDDate');
        localStorage.removeItem('articleIHist');
        localStorage.removeItem('articleISimb');
        localStorage.removeItem('articleIInWork');
        localStorage.removeItem('articleLPop');
        localStorage.removeItem('articleLDen');
        localStorage.removeItem('articleLAlt');
        localStorage.removeItem('articleLFDate');
        localStorage.removeItem('articleLDDate');
        localStorage.removeItem('articleLGov');
        localStorage.removeItem('articleLHist');
        localStorage.removeItem('articleLDemo');
        localStorage.removeItem('articleLDist');
        localStorage.removeItem('articleLPOIS');
        localStorage.removeItem('articleOSlog');
        localStorage.removeItem('articleODen');
        localStorage.removeItem('articleOAlt');
        localStorage.removeItem('articleOFDate');
        localStorage.removeItem('articleODDate');
        localStorage.removeItem('articleOStr');
        localStorage.removeItem('articleOAgenda');
        localStorage.removeItem('articleOHist');
        localStorage.removeItem('articleODisb');
    } else {
        if (category === 'character') {
            const cHair = localStorage.getItem('articleCHair');
            const cSkin = localStorage.getItem('articleCSkin');
            const cEye = localStorage.getItem('articleCEye');
            const cHeight = localStorage.getItem('articleCHeight');
            const cWeight = localStorage.getItem('articleCWeight');
            const cSex = localStorage.getItem('articleCSex');
            const cGen = localStorage.getItem('articleCGen');
            const cRace = localStorage.getItem('articleCRace');
            const cEth = localStorage.getItem('articleCEth');
            const cNat = localStorage.getItem('articleCNat');
            const cAge = localStorage.getItem('articleCAge');

            additionalSidebar.innerHTML = `
                <h3>Character Details</h3>
                <p>Hair: ${cHair}</p>
                <p>Skin: ${cSkin}</p>
                <p>Eyes: ${cEye}</p>
                <p>Height: ${cHeight}</p>
                <p>Weight: ${cWeight}</p>
                <p>Sex: ${cSex}</p>
                <p>Gender: ${cGen}</p>
                <p>Race: ${cRace}</p>
                <p>Ethnicity: ${cEth}</p>
                <p>Nationality: ${cNat}</p>
                <p>Age: ${cAge}</p>
            `;
        } else if (category === 'items') {
            const iPrice = localStorage.getItem('articleIPrice');
            const iWeight = localStorage.getItem('articleIWeight');
            const iSize = localStorage.getItem('articleISize');
            const iCDate = localStorage.getItem('articleICDate');
            const iDDate = localStorage.getItem('articleIDDate');
            const iHist = localStorage.getItem('articleIHist');
            const iSimb = localStorage.getItem('articleISimb');
            const iInWork = localStorage.getItem('articleIInWork');

            additionalSidebar.innerHTML = `
                <h3>Item Details</h3>
                <p>Price: ${iPrice}</p>
                <p>Weight: ${iWeight}</p>
                <p>Size: ${iSize}</p>
                <p>Creation Date: ${iCDate}</p>
                <p>Destruction Date: ${iDDate}</p>
            `;
            additionalBody.innerHTML = `
                <h2>History</h2>
                <p>${iHist}</p>
                <h2>Symbolism</h2>
                <p>${iSimb}</p>
                <h2>Inner Workings</h2>
                <p>${iInWork}</p>
            `;
        } else if (category === 'locations') {
            const lPop = localStorage.getItem('articleLPop');
            const lDen = localStorage.getItem('articleLDen');
            const lAlt = localStorage.getItem('articleLAlt');
            const lFDate = localStorage.getItem('articleLFDate');
            const lDDate = localStorage.getItem('articleLDDate');
            const lGov = localStorage.getItem('articleLGov');
            const lHist = localStorage.getItem('articleLHist');
            const lDemo = localStorage.getItem('articleLDemo');
            const lDist = localStorage.getItem('articleLDist');
            const lPOIS = localStorage.getItem('articleLPOIS');

            additionalSidebar.innerHTML = `
                <h3>Location Details</h3>
                <p>Population: ${lPop}</p>
                <p>Denonym: ${lDen}</p>
                <p>Alternative Name: ${lAlt}</p>
                <p>Founding Date: ${lFDate}</p>
                <p>Doom Date: ${lDDate}</p>
            `;
            additionalBody.innerHTML = `
                <h2>Government</h2>
                <p>${lGov}</p>
                <h2>History</h2>
                <p>${lHist}</p>
                <h2>Demographics</h2>
                <p>${lDemo}</p>
                <h2>Districts</h2>
                <p>${lDist}</p>
                <h2>Points of Interest</h2>
                <p>${lPOIS}</p>
            `;
        } else if (category === 'organizations') {
            const oSlog = localStorage.getItem('articleOSlog');
            const oDen = localStorage.getItem('articleODen');
            const oAlt = localStorage.getItem('articleOAlt');
            const oFDate = localStorage.getItem('articleOFDate');
            const oDDate = localStorage.getItem('articleODDate');
            const oStr = localStorage.getItem('articleOStr');
            const oAgenda = localStorage.getItem('articleOAgenda');
            const oHist = localStorage.getItem('articleOHist');
            const oDisb = localStorage.getItem('articleODisb');

            additionalSidebar.innerHTML = `
                <h3>Organization Details</h3>
                <p>Slogan: ${oSlog}</p>
                <p>Denonym: ${oDen}</p>
                <p>Alternative Name: ${oAlt}</p>
                <p>Founding Date: ${oFDate}</p>
                <p>Doom Date: ${oDDate}</p>
            `;
            additionalBody.innerHTML = `
                <h2>Structure</h2>
                <p>${oStr}</p>
                <h2>Public Agenda</h2>
                <p>${oAgenda}</p>
                <h2>History</h2>
                <p>${oHist}</p>
                <h2>Disbandment</h2>
                <p>${oDisb}</p>
            `;
        }
    }
});