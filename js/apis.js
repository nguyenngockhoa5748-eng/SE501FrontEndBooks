let loading = () => {
    return  `<i class="fa-solid fa-spinner fa-spin"></i>;`
}

let  loadCategories = async () => {
    let res = await fetch('https://6a8e39aebaf2ac84246da470.mockapi.io/categories');
    let data = await res.json();
    return data
}

let loadBooks = async () => {
    let url = 'https://6a8e39aebaf2ac84246da470.mockapi.io/books';
    if(kw){
        url += `?title=${kw}`;
    }
    let res = await fetch(url);
    let data = await res.json();
    return data
}

let deleteBook = async (id) => {
    let url = `https://6a8e39aebaf2ac84246da470.mockapi.io/books/${id}`;
    let res = await fetch(url, {
        method: "delete"
    });
    return res.status
}

window.onload = () => {
    // let data = loadCategories();
    let m = document.querySelector('.submenu');
    m.innerHTML - `<li>${loading()}</li>`
    //Nap danh mục
    loadCategories().then(data => {
        console.table(data);
        let html = ''
        for(let d of data){
            html += `<li><a href="#">${d.name}</a></li>`
        }
        m.innerHTML = html;
    });
    let loadBooks = (kw) => {
        let b = document.querySelector('.books');
        b.innerHTML = loading();
        loadBooks(kw).then(data => {
            let html = '';
            for(let t of data){
                html += `
                <div class="book">
                    <div>
                        <a href="details.html"><img src="${t.image}" alt="Book" />
                        <h3>${t.title}</h3>
                        <p>${t.price.toLocaleString('en')} VNĐ</p>
                        <a href="#" class="close" rel="${b.id}>&times;</a>
                    </div>
                </div>
                `;
            }
            b.innerHTML = html;
        }).then(() => {
            let close = document.getElementsByClassName('close');
            for(let c of closes){
                c.addEventListener('click', function() {
                    if(confirm('Bạn có chắc chắn xá không?') == true){
                       let id = this.getAttribute("rel");
                       deleteBook(id).then(status => {
                        if(status === 200){
                            b.removeChild(this.parentElement.parentElement);
                            alert("Xóa sạch thành công!");
                          }else{
                            alert("Xóa sạch thất bại!");
                          }
                       })
                    }
                });
            }
        })
    }
    //Nạp sách
    loadBooksHTML();

    //loadBooks().then(data => {
     //   let html = '';
     //   for(let t of data){
     //      html += `
      //      <div class="book">
      //          <div>
       //             <a href="details.html"><img src="${t.image}" alt="Book" />
       //             <h3>${t.title}</h3>
       //             <p>${t.price.toLocaleString('en')} VNĐ</p>
       //             <a href="#" class="close">&times;</a>
       //         </div>
       //     </div>
       //     `;
      //  }
      //  b.innerHTML = html;
    //})
    //Xử lý sự kiện tìm kiếm
    let t = document.querySelector('input[type=search]');
    t.addEventListener('change', function(){
        loadBooks(this.value);
    })
}
