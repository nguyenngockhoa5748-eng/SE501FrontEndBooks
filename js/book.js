function openRegisterModal(obj){
    let id =obj.getAttribute('rel')
    let e = document.getElementById(id);
    //e.style.visibility = 'visible';
    //e.style.opacity = 1;
    e.classList.remove('modal-hide');
    e.classList.add('modal-show');
}

function closeModal(obj){
    let id =obj.getAttribute('rel')
    let e = document.getElementById(id);
    //e.style.visibility = 'hidden';
    //e.style.opacity = 0;
    e.classList.remove('modal-show');
    e.classList.add('modal-hide');
}