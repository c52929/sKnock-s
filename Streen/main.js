'use strict';
{
  let decotext;
  let isAdvanced=-1;

  document.getElementById("advancedB").addEventListener('click',()=>{
    document.getElementById("advancedB").classList.toggle("off");
    document.getElementById("general").classList.toggle("none");
    document.getElementById("advanced").classList.toggle("none");
    isAdvanced*=-1;
  })

  const getColor=document.getElementById("color");
  getColor.addEventListener('input',()=>{
    if(getColor.value.length<1){
      getColor.style.fontSize="100%";
      getColor.style.fontWeight="normal";
      getColor.style.webkitTextStrokeWidth="0";
    }else{
      getColor.style.fontSize="150%";
      getColor.style.fontWeight="bold";
      getColor.style.webkitTextStrokeWidth="1px";
      getColor.style.webkitTextStrokeColor="#e0e0e0";
    }
    getColor.style.color="black";
    getColor.style.color=getColor.value;
  })

  const getFont=document.getElementById("font");
  getFont.addEventListener('input',()=>{
    getFont.style.fontFamily="Arial,Helvetica,sans-serif";
    getFont.style.fontFamily=getFont.value;
  })

  document.getElementById("button").addEventListener('click',()=>{
    if(isAdvanced==1){
      document.getElementById("display").innerHTML=document.getElementById("advanced").value;
    }else{
      decotext="";
      if(document.getElementById("bold").checked){
        decotext=`font-weight:bold;`;
      }
      if(document.getElementById("italic").checked){
        decotext=`${decotext}font-style:italic;`;
      }
      if(document.getElementById("underline").checked){
        decotext=`${decotext}text-decoration:underline;`;
      }
      document.getElementById("display").innerHTML=`<span style=font-size:${fz.value};color:${color.value};font-family:${font.value},sans-serif;${decotext}>${text.value}</span>`;
    }
    document.getElementById("edit").classList.add("none");
    document.getElementById("drawer").classList.remove("none");
    document.getElementById("display").classList.remove("none");
  })

  document.getElementById("drawer").addEventListener('click',()=>{
    document.getElementById("edit").classList.remove("none");
    document.getElementById("drawer").classList.add("none");
    document.getElementById("display").classList.add("none");
  })

  document.getElementById("text").value="なほるどね。";
  document.getElementById("text").focus();
}