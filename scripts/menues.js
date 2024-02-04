
function active_btn() {
    const activePage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav nav a').forEach(link => {
      if(link.href.includes(`${activePage}`)){
        link.classList.add('active');
        
      }
    })

}
