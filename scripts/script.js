let count = parseInt(localStorage.getItem('count')) || 1;
let btnCount = parseInt(localStorage.getItem('btnCount')) || 1;
const div = document.getElementById('div');
//loop for retriving previously saved compositions from localStorage
document.addEventListener('DOMContentLoaded', ()=>{
    for(let n = 1; n<count; n++){
        if(localStorage.getItem('Title'+n)){
            //create html elements for displaying the composition
            const compDiv = document.createElement('div');
            const delBtn = document.createElement('button');
            const br1 = document.createElement('br');
            const br2 = document.createElement('br');
            const hr1 = document.createElement('hr');
            const hr2 = document.createElement('hr');
            const pTitle = document.createElement('p');
            const pText = document.createElement('pre');
            compDiv.className = 'container container-fluid shadow-sm rounded border border-5';
            pTitle.className = 'container container-fluid';
            pTitle.innerHTML = 'Composition Name: ' + localStorage.getItem('Title'+n);
            pText.className = 'container container-fluid';
            pText.innerHTML = 'Composition:<br>' + localStorage.getItem('Text'+n);
            delBtn.className = 'p bg-danger rounded border-0';
            delBtn.textContent = 'Delete';
            delBtn.addEventListener('click', ()=>{
                if(confirm(`Do you want to Delete the composition '${localStorage.getItem('Title'+n)}'?`)){
                    localStorage.removeItem('Title'+n);
                    localStorage.removeItem('Text'+n);
                    compDiv.remove();
                }
            });
            compDiv.addEventListener('click',()=>{
                title.value = pTitle.textContent.slice(17);
                text.value = pText.textContent.slice(12);
            });
            //appending the elements
            compDiv.appendChild(pTitle);
            compDiv.appendChild(hr1);
            compDiv.appendChild(pText);
            compDiv.appendChild(hr2);
            compDiv.appendChild(delBtn);
            compDiv.appendChild(br1);
            div.appendChild(compDiv);
            div.appendChild(br2);
        }
    }
});
//Variables
const title = document.getElementById('title');
const text = document.getElementById('text');
const btns = document.getElementById('btns');
const MkCustomBtn = document.getElementById('MkCustomBtn');
//Custom Button Maker Function
const MkBtn = ()=>{
    const CustomInputDiv = document.getElementById('CustomInputDiv');
    if(CustomInputDiv.style.display === 'block'){
        CustomInputDiv.style.display = 'none';
        return;
    }
    CustomInputDiv.style.display = 'block';
    const CustomInput = document.getElementById('CustomInput');
    const CustomInputSave = document.getElementById('CustomInputSave');
    const CustomInputCancel = document.getElementById('CustomInputCancel');
    const CustomBtn = document.createElement('button');
    CustomBtn.className = 'btn btn-secondary border';
    CustomInputSave.addEventListener('click', ()=>{
        if(!(CustomInput.value === '')){
            CustomBtn.innerHTML = CustomInput.value;
            CustomBtn.addEventListener('click', ()=>{
              text.value += CustomBtn.textContent;
            });
            //Add delete functionality to custom buttons
            let timer;
            CustomBtn.addEventListener('mousedown', ()=>{
                timer = setTimeout(()=>{
                if(confirm(`Do you want to Delete '${CustomBtn.textContent}' Button?`)){
                CustomBtn.remove();
                localStorage.removeItem('Custom'+(btnCount-1));
            }
        },1000);
    });
    CustomBtn.addEventListener('mouseup',()=>{
      clearTimeout(timer);
    });
    CustomBtn.addEventListener('touchstart', ()=>{
      timer = setTimeout(()=>{
        if(confirm(`Do you want to Delete '${CustomBtn.textContent}' Button?`)){
           CustomBtn.remove();
           localStorage.removeItem('Custom'+(btnCount-1));
        }
      },1000);
    });
    CustomBtn.addEventListener('touchend',()=>{
      clearTimeout(timer);
    });
    if(!(CustomBtn.innerHTML == '')){
      btns.appendChild(CustomBtn);
    }
        //Saving btnCount to localStorage for displaying correct button on page reload
        localStorage.setItem('Custom'+btnCount,CustomInput.value);
        btnCount++;
        localStorage.setItem('btnCount',btnCount);
        btns.appendChild(CustomBtn);
        alert('Please restart/reload the web app if you have added multiple new buttons.');
      }
      CustomInputDiv.style.display = 'none';
      CustomInput.value = '';
    });
    CustomInputCancel.addEventListener('click', ()=>{
      CustomInputDiv.style.display = 'none';
      CustomInput.value = '';
    });
}
MkCustomBtn.addEventListener('click', ()=>{
  MkBtn();
});
//Appending previously created custom buttons
for(let n = 1; n<btnCount; n++){
  const CustomBtn = document.createElement('button');
  CustomBtn.innerHTML = localStorage.getItem('Custom'+n);
  CustomBtn.className = 'btn btn-secondary border';
  CustomBtn.addEventListener('click', ()=>{
    text.value += CustomBtn.textContent;
  });
  //Add delete functionality to custom buttons
  let timer;
  CustomBtn.addEventListener('mousedown', ()=>{
    timer = setTimeout(()=>{
      if(confirm(`Do you want to Delete '${CustomBtn.textContent}' Button?`)){
        CustomBtn.remove();
        localStorage.removeItem('Custom'+(btnCount-1));
      }
    },1000);
  });
  CustomBtn.addEventListener('mouseup',()=>{
    clearTimeout(timer);
  });
  CustomBtn.addEventListener('touchstart', ()=>{
    timer = setTimeout(()=>{
      if(confirm(`Do you want to Delete '${CustomBtn.textContent}' Button?`)){
        CustomBtn.remove();
        localStorage.removeItem('Custom'+(btnCount-1));
      }
    },1000);
  });
  CustomBtn.addEventListener('touchend',()=>{
    clearTimeout(timer);
  });
  if(!(CustomBtn.innerHTML == '')){
    btns.appendChild(CustomBtn);
  }
}
//Array for buttons
const btnLabel = [ 'धा', 'धि',  'धिं',  'धे', 'न',  'ना',  'न्',  'त',  'ता',  'ति',  'तिं',  'तित्',  'तत्', 'ग', 'गे', 'क', 'कि', 'के', 'ट', 'दिं', 'र', 'रा', 'घे', 'घें', 'थुं', 'ऽ', '|', 'SPACE', '⌫' ];
//Button constructor
btnLabel.forEach((label,index)=>{
  let btn = document.createElement('button');
  btn.innerHTML = label;
  btn.className = 'btn btn-secondary border';
  btns.appendChild(btn);
  //Add functionality to each button
  if(index === btnLabel.length-2){
    btn.style.width = '80%';
  }
  //backspace button
  if(index === btnLabel.length-1){
    btn.addEventListener('click',()=>{
      text.value = text.value.slice(0,-1);
    });
    btn.addEventListener('touchstart',()=>{
      backInterval = setInterval(()=>{
          text.value = text.value.slice(0,-1);
        },100);
    });
    btn.addEventListener('touchend',()=>{
      clearInterval(backInterval);
    });
    btn.addEventListener('mousedown',()=>{
      backInterval = setInterval(()=>{
          text.value = text.value.slice(0,-1);
        },100);
    });
    btn.addEventListener('mouseup',()=>{
      clearInterval(backInterval);
    });
  }
  //SPACE Button
  btn.addEventListener('click',()=>{
    if(btn.textContent == 'SPACE'){
      text.value += ' ';
    }
    //All other Buttons
    else if(!(btn.textContent == '⌫')){
      text.value += btn.textContent;
    }
  });
});
// New Composition Function
const newComposition = ()=>{
  let error = false;
  for(let i=1; i<count; i++){
    if(title.value == localStorage.getItem('Title'+i)){
      alert('Composition with this Title already exists. Please enter a new Title.');
      error = true;
    }
  }
  if(title.value == '' || text.value == ''){
    alert('Please fill all the input fields.');
    error = true;
    return;
  }
  else if(error == false){
    //Save Composition to localStorage
    localStorage.setItem('Title'+count,title.value);
    localStorage.setItem('Text'+count,text.value);
    const currentCount = count;
    //create html elements for displaying the composition
     const compDiv = document.createElement('div');
     const delBtn = document.createElement('button');
     const br1 = document.createElement('br');
     const br2 = document.createElement('br');
     const hr1 = document.createElement('hr');
     const hr2 = document.createElement('hr');
     const pTitle = document.createElement('p');
     const pText = document.createElement('pre');
     compDiv.className = 'container container-fluid shadow-sm rounded border border-5';
     pTitle.className = 'container container-fluid';
     pTitle.innerHTML = 'Composition Name: ' + localStorage.getItem('Title'+currentCount);
     pText.className = 'container container-fluid';
     pText.innerHTML = 'Composition:<br>' + localStorage.getItem('Text'+currentCount);
     delBtn.className = 'p bg-danger rounded border-0';
     delBtn.textContent = 'Delete';
     delBtn.addEventListener('click', ()=>{
       if(confirm(`Do you want to Delete the composition '${localStorage.getItem('Title'+currentCount)}'?`)){
          localStorage.removeItem('Title'+currentCount);
          localStorage.removeItem('Text'+currentCount);
          compDiv.remove();
       }
     });
     compDiv.addEventListener('click',()=>{
        title.value = pTitle.textContent.slice(17);
        text.value = pText.textContent.slice(12);
     });
     //appending the elements
     compDiv.appendChild(pTitle);
     compDiv.appendChild(hr1);
     compDiv.appendChild(pText);
     compDiv.appendChild(hr2);
     compDiv.appendChild(delBtn);
     compDiv.appendChild(br1);
     div.appendChild(compDiv);
     div.appendChild(br2);
    //increment count for next composition
    count++;
    
    //saving count to localStorage to retrive on page reload
    localStorage.setItem('count',count);
    
    //Clear all input fields
    title.value = '';
    text.value = '';
  }
}