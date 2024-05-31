


const heading=document.createElement('h1');

const linebreak=document.createElement('hr');

const tiles=document.createElement('div');

const answer=document.createElement('h2');

const giveup=document.createElement('button');

const qmark=document.createElement('button');

var gameover=false;
var rows=6;
var columns=5;

var rowsindex=0;
var columnsindex=0;

//actual data
let word1;

const url = 'https://wordle-game-api1.p.rapidapi.com/word';
const options = {
  method: 'GET',
  headers: {
  	'X-RapidAPI-Key': 'YOUR KEY',
  	'X-RapidAPI-Host': 'wordle-game-api1.p.rapidapi.com'
  }
};

fetch(url,options).then( data =>{
return data.json()
}). then( data =>{
  assignres(data)
})


function assignres(data)
{
word1= data.word;
word1=word1.toUpperCase();
console.log(word1);
}




window.onload=function(){

  initialization();

}


function initialization()
{
    const body=document.body;
    console.log(body);
      

          // 1. making tiles and appending it to the tiles container
  
          for(let i=0;i<rows;i++)
              {
                for(let j=0;j<columns;j++)
                    {
                            const tile=buildtile(i,j);
    
                             tiles.appendChild(tile);
                    }
              }

        
          // 2. setting needed properties for the elements 
          heading.innerText='Wordle';
          tiles.setAttribute('id','tiles');
          heading.style.margin='1em auto';
          linebreak.style.width='50%';
          linebreak.style.margin='1em auto';
          answer.innerText=""


          qmark.innerText='?';
          qmark.setAttribute('id','qmark');
          giveup.innerText='Giveup';
          giveup.setAttribute('id', 'giveup');
            
        body.appendChild(heading);
        body.appendChild(qmark);
        body.appendChild(giveup);
        body.appendChild(linebreak);
        body.appendChild(answer);
        body.appendChild(tiles);



        // 4. listening to a keyboard click, keyup->waits for user to pressup after pressing down; keydown-> press down

        document.addEventListener("keyup", (e)=>{

            // alert(e.code);
           

            if(gameover) return;

            if(e.code>="KeyA" && e.code<="KeyZ")
            {


                if(columnsindex<columns){

                    let currentTile=document.getElementById(rowsindex.toString()+columnsindex.toString());

                    
                // console.log( rowsindex, columnsindex, e.code);

                    if(currentTile.innerText == '')
                    {
                        currentTile.innerText=e.code[3];
                    }
                    columnsindex+=1

                }
            }
                else if ( e.code == 'Backspace')
                {

                    if( columnsindex>0 && columnsindex<=columns)
                    {

                        columnsindex-=1
                        let currentTile=document.getElementById(rowsindex.toString()+columnsindex.toString());

                        // console.log(currentTile)
                        currentTile.innerText='';

                    }
                }

                if( columnsindex==columns && e.code== 'Enter')
                {

                    // 5. check if the word is correct
                    check_correctness();


                    
                    rowsindex+=1;

                    columnsindex=0;
                }            

                if(!gameover && rows==rowsindex)
                {
                    gameover=true;
                    answer.innerText=word1 + ", Try Again Tomorrow";

                }
                
            }
        )
        
}

// 3. buildtile function

function buildtile(i,j){


    const tile=document.createElement('div');
    tile.classList.add("tile");
    tile.setAttribute('id',i.toString()+j.toString());
    tile.innerText='';
    

    return tile;
}



function check_correctness(){


    let correct = 0;
    
    // using data
    let word=word1;
    let letterindex;

    for (let c=0; c< columns; c++)
    {


        let currentTile= document.getElementById(rowsindex.toString()+c.toString());
        let letter=currentTile.innerText;


         // 6. if letter is matching the letter in the word.

        if( letter == word1[c])
        {
            letterindex=word.indexOf(letter);
            word=word.slice(0,letterindex)+word.slice(letterindex+1,word1.length) 
            currentTile.classList.add("correct");
            correct+=1;


        }
        // 7. if letter is present in the word.
     
        // 8. if the letter is absent in the word. 
        else 
        {

            currentTile.classList.add("absent");
        }

    

        if(correct==columns)
        {
            gameover=true;
            answer.innerText=word1 + ", You win";
        }
    }

    console.log(word);

    for (let c=0; c< columns; c++)
    {

        let currentTile= document.getElementById(rowsindex.toString()+c.toString());
             letter=currentTile.innerText;

       if ( word.includes(letter))
        {
          
            console.log(word)
            currentTile.classList.remove('absent');
            currentTile.classList.add("present");
            letterindex=word.indexOf(letter);
            word=word.slice(0,letterindex)+word.slice(letterindex+1,word1.length)   
        }
    }

}


giveup.addEventListener('click', ()=>{

    answer.innerText= word1 + ", Try Again Tomorrow";
    columnindex=columns;
    rowsindex=rows;
  })
  
  
  qmark.addEventListener('click', ()=>{
  
  
  
      const popup = document.createElement('div');
      popup.className = 'popup';
  
  
      const popupContent = document.createElement('div');
      popupContent.className = 'popup-content';
      popupContent.innerHTML=
      
      `
    <p> Rules: <p> 
    <br> 
    <ol> 
        <li>  In wordle, the computer chooses a word everyday. </li>
        <li>  The user has to guess the word in six attempts. </li>
        <li>  Each word will be a five letter one.  </li>
        <li>  The question mark icon(<em>that's me</em>) contains all the information related to the game.</li>
        <li>  The giveup button reveals the answer and the user can't continue anymore. </li>
    </ol>
  
      `;
  
  
      const closeButton = document.createElement('span');
      closeButton.className = 'popup-close';
      closeButton.innerHTML = '&times;'
      popupContent.appendChild(closeButton);
  
      closeButton.addEventListener('click', () => {
          document.body.removeChild(popup);
        });
  
      popup.appendChild(popupContent);
      document.body.appendChild(popup);
    
  })
  