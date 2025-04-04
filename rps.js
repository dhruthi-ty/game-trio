let users=0;
let comps=0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userscore = document.querySelector("#user-score");
const compscore = document.querySelector("#comp-score");
const uname = document.querySelector("#uname");
const takeinput = () =>
{
    let name = prompt("enter the participant name");
    uname.innerText = `participant: ${name}`;
}
takeinput();
choices.forEach((choice) => 
{
    choice.addEventListener("click",()=> 
    {
        const userc=(choice.getAttribute("id"));
        //console.log("choice clicked was:",userc);
        playgame(userc);
    });
});

const gencompschoice = () =>
{
    const options = ["rock","paper","scissors"];
    const ran=Math.floor(Math.random()*3);
    return options[ran];
};
const draw = () =>
{
    console.log("game was draw");
    msg.innerText = "draw, play again";
    msg.style.backgroundColor ="#c1121f";
}

const showwinner = (userwin,compc,userc) =>
{
    if(userwin)
    {
        console.log("congratulations! you won");
        msg.innerText = `congratulations! you won- your ${userc} beats ${compc} `;
        msg.style.backgroundColor = "green";
        users++;
        userscore.innerText = users;
    }
    else{
        console.log("oops, you lost- tough luck");
        msg.innerText = `oops, you lost- tough luck ${compc} beats your ${userc} `;
        msg.style.backgroundColor = "red";
        comps++;
        compscore.innerText = comps;
    }
};
const playgame = (userc) =>
    {
      console.log("user choice:",userc);//user choice will be printed
      const compc=gencompschoice();
      console.log("comp choice:",compc);//comp choice will be printed
      
      if(userc==compc)
      {
        draw();
      }
      else 
      {
        let userwin = true;
         if(userc==="rock")
         {
            userwin = compc==="paper"? false:true;
         }
         else if (userc==="paper")
         {
            userwin = compc==="scissors"? false: true;
         }
         else 
         {
            userwin = compc==="rock"?false:true;
         }
         showwinner(userwin,compc,userc);
      }
    };
