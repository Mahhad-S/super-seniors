document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const category = 'character'; // Or dynamically determine the category based on the page

    if (articleId) {
        try {
            const response = await fetch(`/getArticleDetails/${category}/${articleId}`);
            const article = await response.json();
            
            document.getElementById('title').value = article.title;
            document.querySelector('#editor .ql-editor').innerHTML = article.body;
            document.querySelector('#sttb .ql-editor').innerHTML = article.sttb;
            document.querySelector('#sptb .ql-editor').innerHTML = article.sptb;
            document.querySelector('#spbb .ql-editor').innerHTML = article.spbb;
            document.querySelector('#sbtb .ql-editor').innerHTML = article.sbtb;

            document.getElementById('ch_hair').value = article.cHair;
            document.getElementById('ch_skin').value = article.cSkin;
            document.getElementById('ch_eyes').value = article.cEye;
            document.getElementById('ch_height').value = article.cHeight;
            document.getElementById('ch_weight').value = article.cWeight;
            document.getElementById('ch_sex').value = article.cSex;
            document.getElementById('ch_gender').value = article.cGen;

            document.getElementById('ch_race').value = article.cRace;
            document.getElementById('ch_eth').value = article.cEth;
            document.getElementById('ch_nationality').value = article.cNat;
            document.getElementById('ch_age').value = article.cAge;

        } catch (error) {
            console.error('Error loading article details:', error);
        }
    }
});

document.getElementById('saveButton').addEventListener('click', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.querySelector('#editor .ql-editor').innerHTML;
    const sttb = document.querySelector('#sttb .ql-editor').innerHTML;
    const sptb = document.querySelector('#sptb .ql-editor').innerHTML;
    const spbb = document.querySelector('#spbb .ql-editor').innerHTML;
    const sbtb = document.querySelector('#sbtb .ql-editor').innerHTML;

    const cHair = document.getElementById('ch_hair').value;
    const cSkin = document.getElementById('ch_skin').value;
    const cEye = document.getElementById('ch_eyes').value;
    const cHeight = document.getElementById('ch_height').value;
    const cWeight = document.getElementById('ch_weight').value;
    const cSex = document.getElementById('ch_sex').value;
    const cGen = document.getElementById('ch_gender').value;

    const cRace = document.getElementById('ch_race').value;
    const cEth = document.getElementById('ch_eth').value;
    const cNat = document.getElementById('ch_nationality').value;
    const cAge = document.getElementById('ch_age').value;

    const data = { title, body, sttb, sptb, spbb, sbtb, cHair, 
        cSkin, cEye, cHeight, cWeight, cSex, cGen, cRace, cEth, cNat, cAge
    };
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const category = 'character'; // Or dynamically determine the category based on the page

    try {
        let response;
        if (articleId) {
            // Update existing article
            response = await fetch(`/updateArticle/${category}/${articleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } else {
            // Create new article
            response = await fetch(`/saveArticleCharacter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            console.error('Error saving article:', response.statusText);
        }
    } catch (error) {
        console.error('Error saving article:', error);
    }
});

function viewArticle() {
    const title = document.getElementById('title').value;
    const body = document.querySelector('#editor .ql-editor').innerHTML;
    const sttb = document.querySelector('#sttb .ql-editor').innerHTML;
    const sptb = document.querySelector('#sptb .ql-editor').innerHTML;
    const spbb = document.querySelector('#spbb .ql-editor').innerHTML;
    const sbtb = document.querySelector('#sbtb .ql-editor').innerHTML;
    const cHair = document.getElementById('ch_hair').value;
    const cSkin = document.getElementById('ch_skin').value;
    const cEye = document.getElementById('ch_eyes').value;
    const cHeight = document.getElementById('ch_height').value;
    const cWeight = document.getElementById('ch_weight').value;
    const cSex = document.getElementById('ch_sex').value;
    const cGen = document.getElementById('ch_gender').value;
    const cRace = document.getElementById('ch_race').value;
    const cEth = document.getElementById('ch_eth').value;
    const cNat = document.getElementById('ch_nationality').value;
    const cAge = document.getElementById('ch_age').value;

    localStorage.setItem('articleCategory', 'character');
    localStorage.setItem('articleTitle', title);
    localStorage.setItem('articleBody', body);
    localStorage.setItem('articleSttb', sttb);
    localStorage.setItem('articleSptb', sptb);
    localStorage.setItem('articleSpbb', spbb);
    localStorage.setItem('articleSbtb', sbtb);
    localStorage.setItem('articleCHair', cHair);
    localStorage.setItem('articleCSkin', cSkin);
    localStorage.setItem('articleCEye', cEye);
    localStorage.setItem('articleCHeight', cHeight);
    localStorage.setItem('articleCWeight', cWeight);
    localStorage.setItem('articleCSex', cSex);
    localStorage.setItem('articleCGen', cGen);
    localStorage.setItem('articleCRace', cRace);
    localStorage.setItem('articleCEth', cEth);
    localStorage.setItem('articleCNat', cNat);
    localStorage.setItem('articleCAge', cAge);

    window.open('/viewArticle', '_blank');
}
