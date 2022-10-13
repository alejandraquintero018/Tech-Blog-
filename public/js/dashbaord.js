const newFormHandler = async (event) => {
    event.preventDefault(); 

    const title = document.querySelector('#post-title'); 
    const content = document.querySelector('#post-content'); 

    if(title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST', 
            body: JSON.stringify({ title, content }), 
            headers: {
                'Content-Type': 'applicaiton/json', 
            }, 
        });
        if (response.ok) {
            document.location.replace('/dashboard'); 
        }else {
            console.log(err)
        }
    }
}; 

document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler); 