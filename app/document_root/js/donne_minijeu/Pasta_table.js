// Idendifiers of HTML elements

export const State_liste = Object.freeze({ 
    None: 0, 
    Check: 1, 
    Disable: 2  
}); 
let movie_aux=[]
export const Women=["1", "2", "3", "4", "5"]
export const Shirt=["blue", "green", "red", "white", "yellow"]
export const Name = ["Andrea", "Holly", "Julie", "Leslie", "Victoria"];
export const  Surname = ["Brown", "Davis", "Lopes", "Miller", "Wilson"]
export const Pasta = ["farfalle", "lasagne", "penne", "spaghetti", "ravioli" ];
export const Wine = ["Australian", "Argentine", "Chilean", "French", "Italian"];
export const Age = ["y_30", "y_35", "y_40", "y_45", "y_50"];
export const type_pasta=[Shirt,Name,Surname,Pasta,Wine,Age]
export const Nom_afficher_pasta = {
    //Shirt
    "blue":"Blue", "green":"Green", "red":"Red", "white":"White", "yellow":"Yellow"
    //Name
    ,"Andrea":"Andrea", "Holly":"Holly", "Julie":"Julie", "Leslie":"Leslie", "Victoria": "Victoria"
    //Surname
    ,"Brown":"Brown", "Davis":"Davis", "Lopes":"Lopes", "Miller": "Miller", "Wilson":"Wilson"
    //Pasta
    ,"farfalle":"Farfalle", "lasagne":"Lasagne", "penne":"Penne", "spaghetti":"Spaghetti", "ravioli":"Ravioli"
    //Wine
    ,"Australian":"Australian", "Argentine":"Argentine", "Chilean":"Chilean", "French":"French", "Italian":"Italian"
    //Age
    ,"y_30":"30 years", "y_35":"35 years","y_40":"40 years" , "y_45":"45 years", "y_50":"50 years"

};


let dic={}
for(let i =0;i<5;++i)
{
    let aux=[]
    for(let j =0;j<type_pasta.length;++j)
    {
        aux[j]={}
        for(let k =0;k<5;++k)
        {
            aux[j][type_pasta[j][k]]=State_liste.None
        }   
    }
    dic[i]=aux
}

export const pasta =dic