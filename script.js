//Variabelen aanmaken voor later gebruik (Niet in de functie om verwijdering van informatie te vermijden)
let player1 = 0
let player2 = 0
let currentPlayer = 1  


//Start het spel
function begin(){

    field()
    mechanics()
}

//reset het hele game
function reset(interval){

 //Variabelen resetten 
 player1 = 0
 player2 = 0
 currentPlayer = 1 
 clearInterval(interval) 
 document.getElementById("time").innerHTML = 20

 //alle kaarten verwijderen
    const kaarten = document.querySelectorAll(".grid-item")
    kaarten.forEach((element) => {
        
        element.remove()
        

    });
    begin()
}


//Maak het veld
function field(){

    //roep de div container op waar alle kaarten in gaan
    const field = document.getElementById("field")
    
    
    //Maak 12 kaarten en geef ze ID's
    for (let i = 0; i < 12; i++){
        
        const fieldCard = document.createElement("div")
        fieldCard.className = "grid-item"
        fieldCard.id = i

        field.appendChild(fieldCard)
        
      }
 
}



//Maak de kaarten klikbaar
function mechanics(){

    //timer met waarde van 20 (seconden)
    let timer = 20
    //nummer array voor de background images
    const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
    //variabel om alle goed gekozen kaarten bij elkaar te tellen
    let winned = 0;
    //zet alle div in een array
    const cards = document.querySelectorAll(".grid-item")
    //"teller" variabel om de eerste en de tweede kaart bij te houden
    let kliktel = 0
    //zet de id van de aangeklikte div div in een variabel voor later gebruik
    let id1 = null
    let id2 = null
    let card1 = null
    let card2 = null
    //Zet de url value in een variabel voor later gebruik
    let urlcontainerid1 = 0
    let urlcontainerid2 = 0
    let url = 0
    // Houd bij welke afbeeldingen aan welke kaarten zijn toegewezen
    const assignedImages = []
    //declareer de 'default' background url
    let defaultBg = "img/CL.png"
    //Houd bij of speler het goed heeft of niet
    let correctChecker = false
   

    //ga langs elke cards array met ForEach om functionaliteit te geven
    cards.forEach((card) => {
        //geef de kaarten een event listener
        card.addEventListener('click', () =>{       

            //Check of de background image de default is zodat de goedgekeurde kaarten niet geklikt kunnen worden
             const currentBg = getComputedStyle(card).backgroundImage      
             if (currentBg.includes(defaultBg)){




                // Check of de geassigned is of niet kaart geklikt is
                if (!assignedImages[card.id]) {

                    //Shuffle de nummers om een random nummer in de back ground img url te stoppen 
                    const shuffled = numbers.sort(() => Math.random() - 0.5) 
                    const randomNumber = shuffled.pop()
                        url = "url(img/img-" + randomNumber + ".jpg)"   
                    
                    // geef de kaart een background image
                    card.style.backgroundImage=url

                    // Assign de image URL naar de card in de array
                    assignedImages[card.id] = url
                } else {
                    card.style.backgroundImage = assignedImages[card.id]
                }
                    
                


                        
                //check of de eerste en de tweede kaart een match is
                if (kliktel === 0){

                    id1 = card.id
                    card1 = document.getElementById(id1)

                    urlcontainerid1 = url                   
                    kliktel++
                    

                } else {
                    id2 = card.id
                    urlcontainerid2 = url     
                    
                    card2 = document.getElementById(id2)
                    

                    //check of beide nummers hetzelfde zijn en verander de achtergrond
                    if (assignedImages[card1.id] === assignedImages[card2.id]){
                        
                        //disable de kaarten (spampreventie)
                        cards.forEach((card) => {
                            card.style.pointerEvents = 'none'
                        })


                        //set timeout voor 1 second en maak kaarten groen
                        setTimeout (()=>{
                            card1.style.backgroundColor = 'green'
                            card1.style.backgroundImage = 'none'

                            card2.style.backgroundColor = 'green'
                            card2.style.backgroundImage = 'none'
                            

                            //enable de kaarten (spampreventie)
                            cards.forEach((card) => {
                                card.style.pointerEvents = 'auto'
                            })

                        },1000 )


                        
                        //speler heeft het goed
                        correctChecker = true
                        switchplayer(correctChecker)

                        //hoeveelheid gewonnen kaarten gaat omhoog
                        setTimeout (()=>{
                            winned++
                        },1500 )

                    } else {
                        //disable de kaarten (spampreventie)
                        cards.forEach((card) => {
                            card.style.pointerEvents = 'none'
                        })

                        //set timeout voor 1 second en maak kaarten weer default
                        setTimeout (()=>{

                                
                            card1.style.backgroundImage = ''
                            card2.style.backgroundImage = ''
                            
                            //enable de kaarten (spampreventie)
                            cards.forEach((card) => {
                                card.style.pointerEvents = 'auto'
                            })

                            //speler heeft het fout
                            correctChecker = false
                            switchplayer(correctChecker)
                                
                        },1000 )

                        }



                    //Geef de checkwin een timeout zodat het in sync is met de winned++ en reset de game
                    setTimeout (()=>{
                        if(winned == 6){
                            if (player1 > player2){
                                alert('Player 1 Won!')
                            } else if (player2 > player1){
                                alert('Player 2 Won!')                           
                            } else {
                                alert("It's a tie!")
                            }
                            document.getElementById("p1").innerHTML = "Points: 0"
                            document.getElementById("p2").innerHTML = "Points: 0" 
                            reset(interval)
                            
                        }
                    },1500 )
                    
                    //reset een paar variabelen
                    kliktel = 0  
                    timer = 21
                    correctChecker = false
                        
                    }//check of de eerste en de tweede kaart een match is  

                }//Check of de background image de default is zodat de goedgekeurde kaarten niet geklikt kunnen worden

        })//geef de kaarten een event listener
        
    })//ga langs elke cards array met ForEach om functionaliteit te geven

    
    //maak een timer
    const interval = setInterval(function() {
        timer--
        document.getElementById("time").innerHTML = timer
        if(timer <= 0){
            switchplayer(correctChecker)
            //check of de eerste kaart gekozen is om hem te resetten
            if (id1 != null && card1.style.backgroundColor != 'green') {
                card1.style.backgroundImage = ''
                //teller resetten zodat de volgende speler weer begint bij klik 1
                kliktel = 0  
                
            }
            timer = 21
            correctChecker = false
        }
    }, 1000);
}//Maak de kaarten klikbaar
//functie voor het switchen van de speler
function switchplayer(correct){
    if(currentPlayer == 1){
       currentPlayer++
       if (correct == true){// als het goed is punten geven
       player1++
       document.getElementById("p1").innerHTML = "Points: " + player1
       }
    } else {
        currentPlayer--
        if (correct == true){// als het goed is punten geven
        player2++
        document.getElementById("p2").innerHTML = "Points: " + player2 
        }
    }
    document.getElementById("currentplayer").innerHTML = "Player " + currentPlayer    
}

