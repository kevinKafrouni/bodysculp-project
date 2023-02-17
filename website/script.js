function myFunction() {
    var x = document.getElementById("links");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if (entry.isIntersecting){
        entry.target.classList.add('show')
      }
      else{
        entry.target.classList.remove('show')
      }

    });
  });
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el)=>observer.observe(el));