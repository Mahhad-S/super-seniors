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

            document.getElementById('ch_hair').value = article.ch_hair;
            document.getElementById('ch_skin').value = article.ch_skin;
            document.getElementById('ch_eyes').value = article.ch_eyes;
            document.getElementById('ch_height').value = article.ch_height;
            document.getElementById('ch_weight').value = article.ch_weight;
            document.getElementById('ch_sex').value = article.ch_sex;
            document.getElementById('ch_gender').value = article.ch_gender;

            document.getElementById('ch_race').value = article.ch_race;
            document.getElementById('ch_eth').value = article.ch_eth;
            document.getElementById('ch_nationality').value = article.ch_nationality;
            document.getElementById('ch_age').value = article.ch_age;

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

    const ch_hair = document.getElementById('ch_hair').value;
    const ch_skin = document.getElementById('ch_skin').value;
    const ch_eyes = document.getElementById('ch_eyes').value;
    const ch_height = document.getElementById('ch_height').value;
    const ch_weight = document.getElementById('ch_weight').value;
    const ch_sex = document.getElementById('ch_sex').value;
    const ch_gender = document.getElementById('ch_gender').value;

    const ch_race = document.getElementById('ch_race').value;
    const ch_eth = document.getElementById('ch_eth').value;
    const ch_nationality = document.getElementById('ch_nationality').value;
    const ch_age = document.getElementById('ch_age').value;

    const data = { title, body, sttb, sptb, spbb, sbtb, 
                    ch_hair, ch_skin, ch_eyes, ch_height, ch_weight, ch_sex, ch_gender,
                    ch_race, ch_eth, ch_nationality, ch_age};
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

    const ch_hair = document.getElementById('ch_hair').value;
    const ch_skin = document.getElementById('ch_skin').value;
    const ch_eyes = document.getElementById('ch_eyes').value;
    const ch_height = document.getElementById('ch_height').value;
    const ch_weight = document.getElementById('ch_weight').value;
    const ch_sex = document.getElementById('ch_sex').value;
    const ch_gender = document.getElementById('ch_gender').value;

    const ch_race = document.getElementById('ch_race').value;
    const ch_eth = document.getElementById('ch_eth').value;
    const ch_nationality = document.getElementById('ch_nationality').value;
    const ch_age = document.getElementById('ch_age').value;

    localStorage.setItem('articleTitle', title);
    localStorage.setItem('articleBody', body);
    localStorage.setItem('articleSttb', sttb);
    localStorage.setItem('articleSptb', sptb);
    localStorage.setItem('articleSpbb', spbb);
    localStorage.setItem('articleSbtb', sbtb);

    localStorage.setItem('articleCh_hair', ch_hair);
    localStorage.setItem('articleCh_skin', ch_skin);
    localStorage.setItem('articleCh_eyes', ch_eyes);
    localStorage.setItem('articleCh_height', ch_height);
    localStorage.setItem('articleCh_weight', ch_weight);
    localStorage.setItem('articleCh_sex', ch_sex);
    localStorage.setItem('articleCh_gender', ch_gender);

    localStorage.setItem('articleCh_race', ch_race);
    localStorage.setItem('articleCh_eth', ch_eth);
    localStorage.setItem('articleCh_nationality', ch_nationality);
    localStorage.setItem('articleCh_age', ch_age);

    window.open('/viewArticle', '_blank');
}