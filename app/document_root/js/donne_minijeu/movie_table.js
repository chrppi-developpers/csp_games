// Idendifiers of HTML elements

export const State_button = Object.freeze({ 
    None: 0, 
    Check: 2, 
    Cross: 1,
    Cross_Disable: 3  
}); 
let movie_aux=[]
export const Personne=["Jessica_Farmer", "Laurie_Davison", "Mark_Thomson", "Mary_Peters", "Sally_Boyden"]
export const Film=["F_88_Minutes", "Donnie_Brasco", "Scarecrow","Scarface", "The_Recruit"]
export const Day=["Monday","Tuesday","Wednesday","Thursday","Friday"]
export const  Time =["7:35 pm","7:40 pm","8:20 pm","8:30 pm","8:45 pm"]
export const  Time_value ={"7:35 pm":[19,35],"7:40 pm":[19,40],"8:20 pm":[20,20],"8:30 pm":[20,30],"8:45 pm":[20,45]}
export const type={"Personne":Personne,"Film":Film,"Day":Day,"Time":Time}
export const  type_index=["Film","Day","Time"]

let dic={}
for(let i =0;i<5;++i)
{
    let aux={}
    for(let j =0;j<3;++j)
    {
        aux[type_index[j]]={}
        for(let k =0;k<5;++k)
        {
            aux[type_index[j]][type[type_index[j]][k]]=State_button.None
        }   
    }
    dic[type.Personne[i]]=aux
}

export const movie =dic