let images = document.querySelectorAll('.thumbs img');
for(let im of images)
    im.addEventListener('click',function(){
        let main = document.getElementById('main-img');
        main.src = this.src;
    });

async function addComment(){
    if(confirm("Bạn chắc chắn thêm bình luận?")=== true){
        let c = document.getElementById('comment-content');
        
        let res = await fetch('https://6a8e3658baf2ac84246da1a1.mockapi.io/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: c.value,
                user: 'images/avatar1.jpg'
            })
        });

        if(res.status === 201){
            let h = `
              <li class="comment flex">
                 <div class="col10">
                    <img src="images/avatar1.jpg" alt="Qingxiao"/>
                 </div>
                 <div class="col90">
                    <h4>${c.value}</h4>
                    <p>${moment(new Date().getTime()).locale('vi').fromNow()}</p>
                 </div>
                </li>
            `;
        //let parent = document.querySelector('.comment-list');
        //parent.innerHTML = h + parent.innerHTML;
        let s = document.querySelector('.comment-list > li:first-child');
        s.insertAdjacentHTML(`beforebegin`, h);
        }

       
    }
}

let loadComments = async () => {
    let res = await fetch('https://6a8e3658baf2ac84246da1a1.mockapi.io/comments')
    let data = await res.json();

    let c = document.querySelector('.comment-list');

    let html = ' ';
    for(let com of data){
        html += `
                <li class="comment flex">
                    <div class="col10">
                        <img src=${com.user} alt="Qingxiao"/>
                    </div>
                    <div class="col90">
                        <h4>${com.content}</h4>
                        <p>${moment(com.created_date).locale('vi').fromNow()}</p>
                    </div>
                </li>
                `;
    }
    c.innerHTML = html;
}

window.onload = () => {
    loadComments();
}

let inputs = document.querySelectorAll('.modal-content input');
for(let inp of inputs)
    inp.addEventListener('blur', function(){
        if(!this.value || this.value === ''){
            this.classList.add('error');
        }else{
            this.classList.remove('error');
        }
    });

