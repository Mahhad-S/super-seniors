var goveQuill = new Quill('#items_hist', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});
var goveQuill = new Quill('#simb', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});
var goveQuill = new Quill('#inWork', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('articleForm');
    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const body = document.querySelector('#editor .ql-editor').innerHTML; 
        const sttb = document.querySelector('#sttb .ql-editor').innerHTML; 
        const sptb = document.querySelector('#sptb .ql-editor').innerHTML;
        const spbb = document.querySelector('#spbb .ql-editor').innerHTML;
        const sbtb = document.querySelector('#sbtb .ql-editor').innerHTML;

        const data = { title, body, sttb, sptb, spbb, sbtb };

        try {
            const response = await fetch('/saveArticleItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

                if (response.ok) {
            window.location.href = '/dashboard';
            } else {
                console.error('Error saving article:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving article:', error);
        }
    });
});

function viewArticle() {
    const title = document.getElementById('title').value;
    const body = document.querySelector('#editor .ql-editor').innerHTML;
    const sttb = document.querySelector('#sttb .ql-editor').innerHTML;
    const sptb = document.querySelector('#sptb .ql-editor').innerHTML;
    const spbb = document.querySelector('#spbb .ql-editor').innerHTML;
    const sbtb = document.querySelector('#sbtb .ql-editor').innerHTML;

    localStorage.setItem('articleTitle', title);
    localStorage.setItem('articleBody', body);
    localStorage.setItem('articleSttb', sttb);
    localStorage.setItem('articleSptb', sptb);
    localStorage.setItem('articleSpbb', spbb);
    localStorage.setItem('articleSbtb', sbtb);

    window.open('/viewArticle', '_blank');
}