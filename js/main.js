document.addEventListener('DOMContentLoaded', init);

function init() {

    //this func will run after the html has loaded
    //when the domcontentloaded event happens to the wepage, run this function
    document.getElementById('btnSend').addEventListener('click', getNums);
    document.getElementById('btnBack').addEventListener('click', nav);
}

function nav(ev) {
    //function runs when wither button is clicked
    let btn = ev.target;
    //console.log(btn.id);
    if (btn.id == 'btnBack') {
        //hide the numbers show the form
        document.getElementById('home').classList.add('active');
        document.getElementById('list').classList.remove('active');
    } else if (btn.id == 'btnSend') {
        //hide the form and show nums and get nums
        document.getElementById('home').classList.remove('active');
        document.getElementById('list').classList.add('active');
        //getNums();
    } else {
        
    }
}

function getNums(ev){
    let url = "http://localhost/mad9014-lotto/nums.php";
    let fd = new FormData();
    let digits = document.getElementById('digits'); // input tag
    let max = document.getElementById('max'); //input tag
    let d = digits.value; //value from the input
    let m = max.value; //value from the input
    
    
    if(parseInt(d) && parseInt(m)){

    fd.append('digits', d);
    fd.append('max', m);
    
    let info = {
        method: "POST",
        body: fd
    };
    nav(ev);
    fetch(url, info)
    .then(response => response.json())
    .then(data => {
        if (data.code == 0){
            //code 0=no errors
            let ul = document.querySelector('ul.num_list');
            ul.innerHTML = "";
            data.numbers.forEach(num => {
                let li = document.createElement('li');
                li.className = "num";
                li.textContent = num;
                ul.appendChild(li);
            });
        }else{
            //bad code
        }
    })
    }
}
